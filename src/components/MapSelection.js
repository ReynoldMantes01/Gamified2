import React, { useState } from "react";

const MapSelection = ({ maps, onLevelSelect, onMainMenu }) => {
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const [selectedMap, setSelectedMap] = useState(maps[0]);

  const handleMapSelect = (mapIndex) => {
    setCurrentMapIndex(mapIndex);
    setSelectedMap(maps[mapIndex]);
  };

  const handleEnemySelect = (enemy) => {
    // Pass both the enemy and the map data
    onLevelSelect({
      enemy,
      selectedMap
    });
  };

  return (
    <div className="text-center p-5">
      <h1 className="text-3xl font-bold mb-6 text-white">Select Your Level</h1>
      
      {/* Map Selection */}
      <div className="flex justify-center items-center mb-8">
        {maps.map((map, index) => (
          <button
            key={map.id}
            onClick={() => handleMapSelect(index)}
            className={`mx-2 px-4 py-2 rounded ${
              index === currentMapIndex
                ? 'bg-blue-600 text-white'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            {map.name}
          </button>
        ))}
      </div>

      {/* Selected Map Details */}
      <div className="flex justify-center items-center">
        <div 
          className="w-80 bg-cover bg-center rounded-lg shadow-lg p-4" 
          style={{ backgroundImage: `url(${selectedMap.background})` }}
        >
          <h2 className="text-2xl font-semibold text-blue-800">{selectedMap.name}</h2>
          <p className="text-red-900">Theme: {selectedMap.theme}</p>
          <div className="mt-4 grid grid-cols-1 gap-4">
            {selectedMap.enemies.map((enemy) => (
              <button
                key={enemy.id}
                onClick={() => handleEnemySelect(enemy)}
                className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              >
                {enemy.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={onMainMenu} 
        className="mt-6 px-3 py-2 bg-red-500 text-white rounded shadow"
      >
        Back to Main Menu
      </button>
    </div>
  );
};

export default MapSelection;