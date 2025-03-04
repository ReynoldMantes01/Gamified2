import React, { useState } from "react";
import scienceTerms from './scienceTerm';

// Transform terms for display
const transformedTerms = Object.entries(scienceTerms)
  .filter(([word, info]) => word !== 'default') // Filter out any default export
  .map(([word, info]) => ({
    word: word,
    censoredWord: "*".repeat(word.length),
    definition: typeof info === 'object' ? info.definition : info, // Handle both new and old format
    source: typeof info === 'object' ? info.source : null
  }))
  .sort((a, b) => a.word.localeCompare(b.word)); // Sort alphabetically

const ITEMS_PER_PAGE = 5; // Increased items per page

const Almanac = ({ onMainMenu }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter terms based on search
  const filteredTerms = transformedTerms.filter(term =>
    term.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTerms = filteredTerms.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < filteredTerms.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTermClick = (term) => {
    setSelectedTerm(selectedTerm === term ? null : term);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset to first page when searching
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center py-12">
      <div className="max-w-4xl w-full bg-[#fdf6e3] p-8 border-8 border-double border-gray-700 rounded-lg shadow-xl overflow-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Almanac of Knowledge</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
          onClick={onMainMenu}
        >
          Back to Main Menu
        </button>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full">
          <ul className="space-y-4">
            {currentTerms.map((item, index) => (
              <li
                key={index}
                className="bg-gray-100 rounded-lg p-4 shadow-md hover:bg-gray-200 transition cursor-pointer"
                onClick={() => handleTermClick(item)}
              >
                <div className="flex flex-col">
                  <p className="font-semibold text-xl mb-2">
                    {selectedTerm === item ? item.word : item.censoredWord}
                  </p>
                  <p className="text-gray-700">{item.definition}</p>
                  {selectedTerm === item && item.source && (
                    <a
                      href={item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 mt-2 text-sm"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-8 w-full flex justify-between items-center">
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
            Page {currentPage + 1} of {Math.ceil(filteredTerms.length / ITEMS_PER_PAGE)}
          </span>

          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              endIndex >= filteredTerms.length ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
            disabled={endIndex >= filteredTerms.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Almanac;
