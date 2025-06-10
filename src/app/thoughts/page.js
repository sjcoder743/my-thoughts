// src/app/thoughts/page.js
"use client"; // Keep this if you have client-side logic

const ThoughtsPage = () => {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <h1 className="text-4xl text-gray-700">Thoughts Page - It Works!</h1>
      {/* Floating Action Button - Keep this */}
      <a href="/thoughts/new" className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white p-5 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75">
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span className="sr-only">Add new thought</span>
      </a>
    </div>
  );
};

export default ThoughtsPage;