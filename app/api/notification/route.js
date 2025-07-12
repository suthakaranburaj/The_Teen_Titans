import { NextResponse } from 'next/server';

const mockNotifications = [
  {
    id: 1,
    title: 'Welcome to StackIt!',
    message: 'Thanks for joining our community. Start by asking your first question!',
    type: 'info',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 2,
    title: 'Answer Accepted',
    message: 'Your answer to "How to use React useEffect?" was accepted!',
    type: 'success',
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: 3,
    title: 'New Comment',
    message: 'Someone commented on your question.',
    type: 'comment',
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({ notifications: mockNotifications });
} 