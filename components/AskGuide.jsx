'use client';
import { useState } from 'react';

const steps = [
  {
    title: 'Summarize the problem',
    content: 'Briefly explain your objective, what you want to achieve, and the exact issue you are encountering. Keep your explanation straightforward.'
  },
  {
    title: 'Describe what you’ve tried',
    content: 'Share the solutions, code, or resources you have already attempted. This helps others avoid repeating suggestions you have already explored.'
  },
  {
    title: 'Show some code',
    content: 'Provide any relevant code samples, error outputs, or data. Use code formatting to make it easy to read.'
  }
];

const helpfulLinks = [
  { text: 'How to ask a good question', href: 'https://stackoverflow.com/help/how-to-ask' },
  { text: 'Stack Overflow Help Center', href: 'https://stackoverflow.com/help' },
  { text: 'Asking on Meta', href: 'https://meta.stackoverflow.com/' },
];

export default function AskGuide() {
  const [openStep, setOpenStep] = useState(null);
  const [openNonProg, setOpenNonProg] = useState(false);
  const [openLinks, setOpenLinks] = useState(false);

  return (
    <aside className="w-full md:w-80 flex-shrink-0">
      <div className="bg-white border rounded-lg shadow-sm p-4 mb-4">
        <h2 className="text-lg text-gray-500 font-semibold mb-1">Step 1: Draft your question</h2>
        <p className="text-gray-600 text-sm mb-4">
          You can get help from our community by asking focused, well-defined questions about programming, algorithms, or code.<br/>
          <span className="text-gray-500">Try not to ask questions that are mainly based on personal opinions.</span>
        </p>
        <ol className="space-y-2">
          {steps.map((step, idx) => (
            <li key={idx}>
              <button
                className="flex items-center w-full text-left text-blue-700 font-semibold hover:underline focus:outline-none"
                onClick={() => setOpenStep(openStep === idx ? null : idx)}
              >
                <span className="mr-2">{idx + 1}.</span> {step.title}
                <svg
                  className={`ml-2 w-4 h-4 transition-transform ${openStep === idx ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openStep === idx && (
                <div className="mt-2 ml-6 text-gray-700 text-sm bg-blue-50 border-l-4 border-blue-300 p-2 rounded">
                  {step.content}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-white border rounded-lg shadow-sm p-4 mb-4">
        <button
          className="w-full flex justify-between items-center text-left font-semibold text-gray-800 focus:outline-none"
          onClick={() => setOpenNonProg(!openNonProg)}
        >
          Need help with something other than programming?
          <svg className={`w-4 h-4 ml-2 transition-transform ${openNonProg ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openNonProg && (
          <div className="mt-2 text-gray-700 text-sm bg-gray-50 border-l-4 border-gray-300 p-2 rounded">
            For questions not related to programming, try posting on <a href="https://superuser.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Super User</a>, <a href="https://serverfault.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Server Fault</a>, or <a href="https://askubuntu.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Ask Ubuntu</a>.
          </div>
        )}
      </div>

      {/* <div className="bg-white border rounded-lg shadow-sm p-4">
        <button
          className="w-full flex justify-between items-center text-left font-semibold text-gray-800 focus:outline-none"
          onClick={() => setOpenLinks(!openLinks)}
        >
          More helpful links
          <svg className={`w-4 h-4 ml-2 transition-transform ${openLinks ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {openLinks && (
          <ul className="mt-2 ml-2 space-y-2 text-blue-700 text-sm">
            {helpfulLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </aside>
  );
} 