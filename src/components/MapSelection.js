import React, { useState } from "react";

const MapSelection = ({ maps, onLevelSelect, onMainMenu }) => {
  const [currentMapIndex, setCurrentMapIndex] = useState(0);

  const handleNextMap = () => {
    if (currentMapIndex < maps.length - 1) {
      setCurrentMapIndex(currentMapIndex + 1);
    }
  };

  const handlePrevMap = () => {
    if (currentMapIndex > 0) {
      setCurrentMapIndex(currentMapIndex - 1);
    }
  };

  const currentMap = maps[currentMapIndex];

  return (
    <div className="text-center p-5">
      <h1 className="text-3xl font-bold mb-6 text-white ">Select Your Level</h1>
      <div className="flex justify-center items-center">
        <button
          onClick={handlePrevMap}
          disabled={currentMapIndex === 0}
          className="px-4 py-2 bg-gray-500 text-white rounded mr-4 disabled:opacity-50"
        >
          Previous
        </button>
        <div className="w-80 bg-cover bg-center rounded-lg shadow-lg p-4" style={{ backgroundImage: `url(${currentMap.background})` }}>
          <h2 className="text-2xl font-semibold text-blue-800 ">{currentMap.name}</h2>
          <p className="text-red-900 ">Theme: {currentMap.theme}</p>
          <div className="mt-4 grid grid-cols-1 gap-4">
            {currentMap.enemies.map((level) => (
              <button
                key={level.id}
                onClick={() => onLevelSelect(level)}
                className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              >
                {level.name}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleNextMap}
          disabled={currentMapIndex === maps.length - 1}
          className="px-4 py-2 bg-gray-500 text-white rounded ml-4 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <button onClick={onMainMenu} className="mt-6 px-3 py-2 bg-red-500 text-white rounded shadow ml-16">
        Back to Main Menu
      </button>
    </div>
  );
};

export default MapSelection;
