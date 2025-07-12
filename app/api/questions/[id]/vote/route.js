import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Question from '../../../../models/Question';

export async function POST(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const body = await request.json();
    const { voteType, userId } = body;

    if (!voteType || !userId) {
      return NextResponse.json(
        { error: 'Vote type and user ID are required' },
        { status: 400 }
      );
    }

    if (!['upvote', 'downvote'].includes(voteType)) {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      );
    }

    const question = await Question.findById(id);
    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const upvotes = question.votes.upvotes || [];
    const downvotes = question.votes.downvotes || [];

    // Check if user has already voted
    const hasUpvoted = upvotes.includes(userId);
    const hasDownvoted = downvotes.includes(userId);

    if (voteType === 'upvote') {
      if (hasUpvoted) {
        // Remove upvote
        question.votes.upvotes = upvotes.filter(id => id.toString() !== userId);
      } else {
        // Add upvote and remove downvote if exists
        if (!hasUpvoted) {
          question.votes.upvotes = [...upvotes, userId];
        }
        if (hasDownvoted) {
          question.votes.downvotes = downvotes.filter(id => id.toString() !== userId);
        }
      }
    } else if (voteType === 'downvote') {
      if (hasDownvoted) {
        // Remove downvote
        question.votes.downvotes = downvotes.filter(id => id.toString() !== userId);
      } else {
        // Add downvote and remove upvote if exists
        if (!hasDownvoted) {
          question.votes.downvotes = [...downvotes, userId];
        }
        if (hasUpvoted) {
          question.votes.upvotes = upvotes.filter(id => id.toString() !== userId);
        }
      }
    }

    await question.save();

    // Calculate new vote count
    const voteCount = question.votes.upvotes.length - question.votes.downvotes.length;

    return NextResponse.json({
      message: 'Vote updated successfully',
      voteCount,
      upvotes: question.votes.upvotes.length,
      downvotes: question.votes.downvotes.length,
    });
  } catch (error) {
    console.error('Error updating vote:', error);
    return NextResponse.json(
      { error: 'Failed to update vote' },
      { status: 500 }
    );
  }
} 