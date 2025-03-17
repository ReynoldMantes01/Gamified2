import React, { useState, useEffect } from "react";
import scienceTerms from './scienceTerm';

// Transform terms for display
const transformedTerms = Object.entries(scienceTerms)
  .filter(([word, info]) => word !== 'default') // Filter out any default export
  .map(([word, info]) => ({
    word: word,
    censoredWord: "*".repeat(word.length),
    // Handle uppercase properties
    definition: typeof info === 'object' ? (info.DEFINITION || 'No definition available') : info,
    source: typeof info === 'object' ? info.SOURCE : null
  }))
  .sort((a, b) => a.word.localeCompare(b.word)); // Sort alphabetically

const ITEMS_PER_PAGE = 3; // Show 5 items per page

const Almanac = ({ onMainMenu }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1); // -1 for no selection, 0-2 for terms

  // Filter terms based on search
  const filteredTerms = transformedTerms.filter(term =>
    term.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTerms = filteredTerms.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredTerms.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (endIndex < filteredTerms.length) {
      setCurrentPage(currentPage + 1);
      setSelectedIndex(-1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setSelectedIndex(-1);
    }
  };

  const handleTermClick = (term, index) => {
    setSelectedTerm(selectedTerm === term ? null : term);
    setSelectedIndex(index);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
    setSelectedIndex(-1);
  };

  const handleKeyPress = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
      case 'ArrowUp':
        setSelectedIndex(prev => {
          if (prev <= 0) return currentTerms.length - 1;
          return prev - 1;
        });
        break;
      case 'ArrowDown':
        setSelectedIndex(prev => {
          if (prev >= currentTerms.length - 1) return 0;
          return prev + 1;
        });
        break;
      case 'Enter':
        if (selectedIndex >= 0 && selectedIndex < currentTerms.length) {
          handleTermClick(currentTerms[selectedIndex], selectedIndex);
        }
        break;
      case 'Escape':
        onMainMenu();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedIndex, currentPage, currentTerms]);

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center py-12">
      <div className="max-w-4xl w-full bg-[#fdf6e3] p-8 border-8 border-double border-gray-700 rounded-lg shadow-xl overflow-auto text-center">
      <div className="flex items-center justify-between mb-6">
        <button
          className="bg-blue-300 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full mb-6 transition-all duration-300 shadow-md"
          onClick={onMainMenu}
        >
          {'< '}
        </button>
        <h1 className="text-3xl font-bold text-indigo-900 text-center mt-3 mb-8"style={{ 
                letterSpacing: '-1px'}}>ALMANAC OF KNOWLEDGE</h1>
        <div className="w-[16px]"></div>
        </div>
        
        {/* Search Bar */}
      {/*  <div className="mb-6">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>  */}

        <div className="w-full">
          <ul className="space-y-6">
            {currentTerms.map((item, index) => (
              <li
                key={index}
                className={`bg-gray-100 rounded-lg p-6 shadow-md transition-all duration-300 cursor-pointer border-l-4
                  ${selectedIndex === index ? ' scale-105 border-l' : 'hover:bg-gray-200 border-l-gray-300'}`}
                onClick={() => handleTermClick(item, index)}
              >
                <div className="flex flex-col">
                  <p className="font-semibold text-2xl mb-3 ">
                    {selectedTerm === item ? item.word : item.censoredWord}
                  </p>
                  <p className="text-gray-700 leading-relaxed">{item.definition}</p>
                  {selectedTerm === item && item.source && (
                    <a
                      href={item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 mt-3 text-sm inline-flex items-center group"
                    >
                    Learn More <span className="ml-1 group-hover:ml-2 transition-all duration-300">→</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-10 w-full flex justify-between items-center">
      <button
        className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-md flex items-center
          ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handlePrevious}
        disabled={currentPage === 0}
      >
         {'< '}
      </button>

      <span className="text-gray-700  py-2 px-4 rounded-full font-medium">
        Page {currentPage + 1} of {totalPages}
      </span>

      <button
        className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-md flex items-center
          ${endIndex >= filteredTerms.length ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleNext}
        disabled={endIndex >= filteredTerms.length}
      >
       {'>'}
      </button>
    </div>
  </div>
</div>
  );
};

export default Almanac;
