"use client";
import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import QuestionDetail from "@/components/QuestionDetail";
import Answer from "@/components/Answer";
import Pagination from "@/components/Pagination";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { get_question } from "@/services/Questions";

export default function QuestionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("votes");
  const [answersPerPage] = useState(5);

  useEffect(() => {
    if (id) {
      fetchQuestion();
    }
  }, [id]);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const response = await get_question(id);
      console.log("Question response:", response);
      if (response) {
        const data = response;
        console.log("Fetched question data:", data);
        setQuestion(data.data.data);
        // Calculate total pages based on answer count
        setTotalPages(Math.ceil(data.answers.length / answersPerPage));
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle client-side sorting and pagination
  const paginatedAnswers = useMemo(() => {
    if (!question || !question.answers) return [];

    // Create a copy to avoid mutating original array
    let sortedAnswers = [...question.answers];

    // Apply sorting
    switch (sortBy) {
      case "votes":
        sortedAnswers.sort((a, b) => b.voteCount - a.voteCount);
        break;
      case "newest":
        sortedAnswers.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "oldest":
        sortedAnswers.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      default:
        break;
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * answersPerPage;
    return sortedAnswers.slice(startIndex, startIndex + answersPerPage);
  }, [question, sortBy, currentPage, answersPerPage]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  if (!question && !loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Question Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The question you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => router.push("/questions")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Browse Questions
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back to Questions */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Questions
            </button>
          </div>

          {/* Question Detail */}
          {question ? (
            <QuestionDetail question={question} />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          )}

          {/* Answers Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">
                {question?.answers?.length || 0} Answers
              </h2>

              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="votes">Most Voted</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {/* Answers List */}
            {loading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-200 pb-6 last:border-0 animate-pulse"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="h-6 w-6 bg-gray-200 rounded"></div>
                        <div className="h-4 w-4 bg-gray-200 rounded mt-2"></div>
                        <div className="h-6 w-6 bg-gray-200 rounded mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : question?.answers?.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No Answers Yet
                </h3>
                <p className="text-gray-500">
                  Be the first to answer this question!
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {paginatedAnswers.map((answer) => (
                  <Answer key={answer._id} answer={answer} />
                ))}
              </div>
            )}

            {/* Answers Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </div>

          {/* Your Answer Section */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Your Answer
            </h2>
            <textarea
              className="w-full h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your answer here..."
            ></textarea>
            <div className="mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded">
                Post Your Answer
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
