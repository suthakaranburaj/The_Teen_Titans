'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Question({ question }) {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (voteType) => {
    if (isVoting) return;
    setIsVoting(true);

    try {
      const response = await fetch(`/api/questions/${question._id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteType }),
      });

      if (response.ok) {
        // Refresh the page or update the question data
        window.location.reload();
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleDateString();
  };

  const truncateContent = (content, maxLength = 200) => {
    if (!content) return ''; // Handle undefined/null
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Vote section */}
        <div className="flex flex-col items-center space-y-2 min-w-[60px]">
          <button
            onClick={() => handleVote("upvote")}
            disabled={isVoting}
            className={`p-1 rounded hover:bg-gray-100 transition-colors ${
              isVoting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              className="w-6 h-6 text-gray-500 hover:text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>

          <span className="text-lg font-semibold text-gray-700">
            {question.voteCount || 0}
          </span>

          <button
            onClick={() => handleVote("downvote")}
            disabled={isVoting}
            className={`p-1 rounded hover:bg-gray-100 transition-colors ${
              isVoting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              className="w-6 h-6 text-gray-500 hover:text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Question content */}
        <div className="flex-1">
          <Link href={`/questions/${question._id}`}>
            <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800 mb-2">
              {question.title}
            </h3>
          </Link>

          <p
            className="text-gray-600 mb-3"
            dangerouslySetInnerHTML={{
              __html: truncateContent(question.description),
            }}
          ></p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {question.tags &&
              question.tags.map((tag, index) => (
                <span
                  key={tag._id}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                >
                  {tag.name} {/* Render the tag name */}
                </span>
              ))}
          </div>

          {/* Question metadata */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>{question.answerCount || 0} answers</span>
              {/* <span>{question.views || 0} views</span> */}
              {question.isAnswered && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  Answered
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span>Asked {formatDate(question.createdAt)}</span>
              {question.author && (
                <div className="flex items-center space-x-1">
                  <span>by</span>
                  <span className="text-blue-600 hover:text-blue-800">
                    {question.user.name || "Anonymous"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 