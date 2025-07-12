  "use client";
  export default function Answer({ answer }) {
    return (
      <div className="border-b border-gray-200 pb-6 last:border-0">
        <div className="flex items-start space-x-4">
          {/* Voting Controls */}
          <div className="flex flex-col items-center">
            <button className="text-gray-400 hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <span className="my-1 font-bold text-gray-800 text-lg">
              {answer.votes}
            </span>
            <button className="text-gray-400 hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Accept Answer (only shown for question owner) */}
            {answer.isAccepted && (
              <div className="mt-2 text-green-500" title="Accepted answer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Answer Content */}
          <div className="flex-1">
            <div className="prose max-w-none text-gray-700 mb-4">
              {answer.body}
            </div>

            {/* Answer Metadata */}
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                <div>
                  <div className="font-medium text-gray-800">
                    {answer.user.name}
                  </div>
                  <div>
                    answered on{" "}
                    {new Date(answer.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-2 sm:mt-0">
                <button className="text-blue-600 hover:text-blue-800 mr-3">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }