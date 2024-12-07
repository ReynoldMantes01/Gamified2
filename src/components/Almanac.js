import React, { useState } from "react";

// Assuming scienceTerms is an object where each key is a term and value is the definition
import scienceTerms from './scienceTerm';

// Transform terms for display
const transformedTerms = Object.entries(scienceTerms).map(([word, definition]) => ({
  censoredWord: "*****", // Replace the word with "*****"
  definition: definition
}));

const ITEMS_PER_PAGE = 5; // Number of terms to show per page

const Almanac = ({ onMainMenu }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentTerms = transformedTerms.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < transformedTerms.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 text-center relative min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Almanac</h1>
      <p className="mb-6">Welcome to the Almanac! Explore various details here.</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
        onClick={onMainMenu}
      >
        Back to Main Menu
      </button>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Almanac of Knowledge</h1>
        <ul className="space-y-4">
          {currentTerms.map((item, index) => (
            <li
              key={index}
              className="bg-gray-100 rounded-lg p-4 shadow-md hover:bg-gray-200 transition"
            >
              <p>
                <span className="font-semibold text-red-500">{item.censoredWord}</span>
                <span className="text-gray-700">: {item.definition}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Static Bottom Navigation */}
      <div className="fixed bottom-0 left-1/3 right-1/3 bg-transparent shadow-md p-4 flex justify-between items-center text-center">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {currentPage + 1} of {Math.ceil(transformedTerms.length / ITEMS_PER_PAGE)}
        </span>

        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            endIndex >= transformedTerms.length ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNext}
          disabled={endIndex >= transformedTerms.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Almanac;
