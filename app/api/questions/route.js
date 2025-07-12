import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Question from '../../../models/Question';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const sort = searchParams.get('sort') || 'newest';
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Build search query
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } },
        ],
      };
    }

    // Build sort query
    let sortQuery = {};
    switch (sort) {
      case 'newest':
        sortQuery = { createdAt: -1 };
        break;
      case 'oldest':
        sortQuery = { createdAt: 1 };
        break;
      case 'votes':
        sortQuery = { voteCount: -1 };
        break;
      case 'answers':
        sortQuery = { answerCount: -1 };
        break;
      case 'views':
        sortQuery = { views: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }

    // Get total count for pagination
    const total = await Question.countDocuments(searchQuery);

    // Fetch questions with author information
    const questions = await Question.find(searchQuery)
      .populate('author', 'name email')
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .lean();

    // Calculate vote counts and answer counts for each question
    const questionsWithCounts = questions.map(question => ({
      ...question,
      voteCount: (question.votes?.upvotes?.length || 0) - (question.votes?.downvotes?.length || 0),
      answerCount: question.answers?.length || 0,
      isAnswered: question.answers?.some(answer => answer.isAccepted) || false,
    }));

    return NextResponse.json({
      questions: questionsWithCounts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, content, tags, authorId } = body;

    // Validate required fields
    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    // Create new question
    const question = new Question({
      title,
      content,
      tags: tags || [],
      author: authorId,
      votes: {
        upvotes: [],
        downvotes: [],
      },
      answers: [],
      views: 0,
      isAnswered: false,
    });

    await question.save();

    // Populate author information
    await question.populate('author', 'name email');

    return NextResponse.json(
      { message: 'Question created successfully', question },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
} 