import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import { Notification } from '../../../models/Notification';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  const notifications = await Notification.find({ recipient: userId })
    .sort({ createdAt: -1 })
    .populate('sourceUser', 'name')
    .populate('question', 'title')
    .lean();

  return NextResponse.json({ notifications });
} 