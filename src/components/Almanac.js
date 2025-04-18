import React, { useState, useEffect } from "react";
import scienceTerms from './scienceTerm';
import FunFact from './FunFact';
import useFunFact from '../hooks/useFunFact';
import alma from '../assets/Almanac.gif';

// Transform terms for display
const transformedTerms = Object.entries(scienceTerms)
  .filter(([word, info]) => word !== 'default')
  .map(([word, info]) => ({
    word: word,
    censoredWord: "*".repeat(word.length),
    definition: typeof info === 'object' ? (info.DEFINITION || 'No definition available') : info,
    source: typeof info === 'object' ? info.SOURCE : null
  }));

const ITEMS_PER_PAGE = 3;

const Almanac = ({ onMainMenu }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const [currentTerms, setCurrentTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { showFunFact, showFunFactWithDelay } = useFunFact();

  // Filter terms based on search
  const filteredTerms = transformedTerms.filter(term =>
    term.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTerms.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    setCurrentTerms(filteredTerms.slice(startIndex, endIndex));
  }, [startIndex, endIndex, filteredTerms]);

  // Show fun fact only once when component mounts
  useEffect(() => {
    showFunFactWithDelay();
  }, []);

  const handleTermClick = (term, index) => {
    if (selectedTerm === term) {
      setSelectedTerm(null);
      setSelectedIndex(-1);
    } else {
      setSelectedTerm(term);
      setSelectedIndex(index);
    }
  };

  const handleNext = () => {
    if (endIndex < filteredTerms.length) {
      setCurrentPage(prev => prev + 1);
      setSelectedTerm(null);
      setSelectedIndex(-1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      setSelectedTerm(null);
      setSelectedIndex(-1);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
    setSelectedTerm(null);
    setSelectedIndex(-1);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (e.key === 'ArrowUp') {
        setSelectedIndex(prev => {
          const newIndex = prev <= 0 ? currentTerms.length - 1 : prev - 1;
          setSelectedTerm(currentTerms[newIndex]);
          return newIndex;
        });
      } else {
        setSelectedIndex(prev => {
          const newIndex = prev >= currentTerms.length - 1 ? 0 : prev + 1;
          setSelectedTerm(currentTerms[newIndex]);
          return newIndex;
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedIndex, currentPage, currentTerms]);

  return (
    <div className="almanac-container" style={{
      backgroundImage: `url(${alma})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      userSelect: 'none' 
      }}>
    {showFunFact && <FunFact />}
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center py-6 md:py-8 lg:py-12 px-4">
      <div className="max-w-4xl w-full bg-[#fdf6e3] p-4 sm:p-6 md:p-8 border-4 sm:border-6 md:border-8 border-double border-gray-700 rounded-lg shadow-xl overflow-auto text-center">
        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
          <button
            className="bg-blue-300 hover:bg-blue-800 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 md:px-6 rounded-full mb-2 sm:mb-4 md:mb-6 transition-all duration-300 shadow-md text-sm md:text-base"
            onClick={onMainMenu}
          >
            {'< '}
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-900 text-center mt-1 sm:mt-2 md:mt-3 mb-2 sm:mb-4 md:mb-8" style={{ letterSpacing: '-1px' }}>
            ALMANAC OF KNOWLEDGE
          </h1>
          <div className="w-[16px]" />
        </div>
  
        <div className="w-full">
          <ul className="space-y-3 sm:space-y-4 md:space-y-6">
            {currentTerms.map((item, index) => (
              <li
                key={index}
                className={`bg-gray-100 rounded-lg p-3 sm:p-4 md:p-6 shadow-md transition-all duration-300 cursor-pointer border-l-4
                  ${selectedIndex === index ? ' scale-105 border-l' : 'hover:bg-gray-200 border-l-gray-300'}`}
                onClick={() => handleTermClick(item, index)}
              >
                <div className="flex flex-col">
                  <p className="font-semibold text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 md:mb-3">
                    {selectedTerm === item ? item.word : item.censoredWord}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {item.definition}
                  </p>
                  {selectedTerm === item && item.source && (
                    <a
                      href={item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 mt-2 md:mt-3 text-xs sm:text-sm inline-flex items-center group"
                    >
                      Learn More <span className="ml-1 group-hover:ml-2 transition-all duration-300">→</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
  
        <div className="mt-5 sm:mt-8 md:mt-10 w-full flex justify-between items-center">
          <button
            className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 sm:py-1.5 md:py-2 px-3 sm:px-4 md:px-6 rounded-full transition-all duration-300 shadow-md flex items-center text-sm md:text-base
              ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            {'< '}
          </button>
  
          <span className="text-gray-700 py-1 sm:py-1.5 md:py-2 px-2 sm:px-3 md:px-4 rounded-full font-medium text-xs sm:text-sm md:text-base">
            Page {currentPage + 1} of {totalPages}
          </span>
  
          <button
            className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 sm:py-1.5 md:py-2 px-3 sm:px-4 md:px-6 rounded-full transition-all duration-300 shadow-md flex items-center text-sm md:text-base
              ${endIndex >= filteredTerms.length ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleNext}
            disabled={endIndex >= filteredTerms.length}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Almanac;