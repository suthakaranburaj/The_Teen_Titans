'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import AskGuide from '../../components/AskGuide';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'


const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-[200px] bg-gray-100 rounded-md animate-pulse"></div>
});

export default function AskQuestionPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

const modules = useMemo(() => ({
  toolbar: [
    ['bold', 'italic', 'underline'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ],
}), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  const handleEditorChange = (value) => {
    setFormData({
      ...formData,
      description: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userId = JSON.parse(localStorage.getItem('user'))?._id;
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          userId: userId,
        }),
      });

      if (response.ok) {
        router.push('/questions');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create question');
      }
    } catch (error) {
      setError('An error occurred while creating the question');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Form Section */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Ask a Question</h1>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="What's your question? Be specific."
                      className="w-full px-4 py-2 border bg-white text-black placeholder:text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Imagine you're asking another person
                    </p>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Details
                    </label>

                    {/* Enhanced editor container */}
                    <div className="border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                      <ReactQuill
                        value={formData.description}
                        onChange={handleEditorChange}
                        modules={modules}
                        formats={formats}
                        placeholder="Provide all the information someone would need to answer your question..."
                        theme="snow"
                        className="bg-white text-black rounded-md"
                      />
                    </div>

                    {/* Add the guide text below the editor */}
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-500">
                        1. Explain your problem clearly
                      </p>
                      <p className="text-sm text-gray-500">
                        2. Describe what you've tried
                      </p>
                      <p className="text-sm text-gray-500">
                        3. Show some code
                      </p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="javascript, react, nextjs (comma separated)"
                      className="w-full bg-white text-black placeholder:text-gray-500 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Add up to 5 tags to describe what your question is about
                    </p>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Posting...' : 'Post Question'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Guide Section */}
            <div className="md:w-80 w-full">
              <AskGuide />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 