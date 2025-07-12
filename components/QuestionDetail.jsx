import Link from "next/link";

export default function QuestionDetail({ question }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
            {question.votes}
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
        </div>

        {/* Question Content */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {question.title}
          </h1>

          <p
            className="prose max-w-none text-gray-700 mb-6"
            dangerouslySetInnerHTML={{
              __html: question.description,
            }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {question.tags.map((tag, index) => (
              // <Link key={index} href={`/questions/tagged/${tag}`}>
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded cursor-pointer hover:bg-blue-200"
              >
                {tag.description}
              </span>
              // </Link>
            ))}
          </div>

          {/* Question Metadata */}
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
            <div className="flex items-center space-x-2">
              {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" /> */}
              <div>
                <div className="font-medium text-gray-800">
                  {question.user.name}
                </div>
                <div>
                  asked on{" "}
                  {new Date(question.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-4 sm:mt-0">
              {/* <div>
                <span className="font-medium">{question.views}</span> views
              </div> */}
              <div>
                <span className="font-medium">{question.answers?.length}</span>{" "}
                answers
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
