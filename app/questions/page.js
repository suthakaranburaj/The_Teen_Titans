'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Question from '../../components/Question';
import Pagination from '../../components/Pagination';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'


export default function QuestionsPage() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [questionsPerPage] = useState(10);

  useEffect(() => {
    // Fetch all questions once on mount
    const fetchAllQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/questions?page=1&limit=1000');
        if (response.ok) {
          const data = await response.json();
          setAllQuestions(data.data.questions);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllQuestions();
  }, []);

  useEffect(() => {
    // Filter and sort questions client-side
    let filtered = allQuestions;
    if (searchQuery) {
      filtered = filtered.filter(q =>
        q.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Sort logic (basic example)
    if (sortBy === 'newest') {
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'votes') {
      filtered = filtered.sort((a, b) => (b.votes || 0) - (a.votes || 0));
    } else if (sortBy === 'answers') {
      filtered = filtered.sort((a, b) => (b.answers?.length || 0) - (a.answers?.length || 0));
    } else if (sortBy === 'views') {
      filtered = filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    }
    const startIdx = (currentPage - 1) * questionsPerPage;
    const endIdx = startIdx + questionsPerPage;
    setQuestions(filtered.slice(startIdx, endIdx));
    setTotalPages(Math.max(1, Math.ceil(filtered.length / questionsPerPage)));
  }, [allQuestions, searchQuery, sortBy, currentPage, questionsPerPage]);
  // fetchQuestions removed; logic now in useEffect

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    // Filtering is handled by useEffect
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
          <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Questions</h1>
            <p className="text-gray-600 mt-2">
              Browse and answer questions from the community
            </p>
          </div>
          {/* <Link
            href="/ask"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Ask Question
          </Link> */}
        </div>

        {/* Search and Sort */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white text-black border placeholder:text-gray-600 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {/* <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
                >
                  Search
                </button> */}
              </form>
            </div>

            {/* Sort */}
            <div className="md:w-48">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="w-full px-4 py-2 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="votes">Most Voted</option>
                <option value="answers">Most Answered</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <div className="text-gray-500 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No questions found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : 'Be the first to ask a question!'}
              </p>
              {!searchQuery && (
                <Link
                  href="/ask"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Ask Question
                </Link>
              )}
            </div>
          ) : (
            questions.map((question) => (
              <Question key={question._id} question={question} />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/questions"
          />
        )}
      </div>
    </div>
      <Footer />
    </div>
  );
}