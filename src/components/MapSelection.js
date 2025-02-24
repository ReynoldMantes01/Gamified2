import React, { useState, useEffect } from "react";
import { auth } from '../firebase/config';
import { getDatabase, ref, onValue } from 'firebase/database';
import mapData from './maps.json';

const MapSelection = ({ onLevelSelect, onMainMenu }) => {
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const [selectedMap, setSelectedMap] = useState(mapData.maps[0]);
  const [userProgress, setUserProgress] = useState(null);

  // Enemy progression order
  const enemyProgressionOrder = [
    "microbe",
    "toxic_crawler",
    "virus",
    "bacteria",
    "parasite",
    "infection"
  ];

  // Add real-time listener for user progress
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      
      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setUserProgress(snapshot.val());
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const isMapLocked = (mapIndex) => {
    const mapId = `map${mapIndex + 1}`;
    if (!userProgress?.unlockedWorlds) return mapIndex !== 0;
    return !userProgress.unlockedWorlds.includes(mapId);
  };

  const isEnemyLocked = (enemyName, mapId) => {
    // Always allow microbe in the first map
    if (mapId === "map1" && enemyName.toLowerCase() === "microbe") {
      return false;
    }
    
    if (!userProgress?.unlockedEnemies) {
      return true;
    }
    return !userProgress.unlockedEnemies.includes(enemyName.toLowerCase().replace(' ', '_'));
  };

  const handleMapSelect = (mapIndex) => {
    if (!isMapLocked(mapIndex)) {
      setCurrentMapIndex(mapIndex);
      setSelectedMap(mapData.maps[mapIndex]);
    }
  };

  const handleEnemySelect = (enemy) => {
    // Always allow microbe in the first map
    if (selectedMap.id === "map1" && enemy.name.toLowerCase() === "microbe") {
      onLevelSelect({
        enemy,
        selectedMap
      });
      return;
    }

    // Check if enemy is locked before allowing selection
    if (!isEnemyLocked(enemy.name, selectedMap.id)) {
      onLevelSelect({
        enemy,
        selectedMap
      });
    }
  };

  return (
    <div className="text-center p-5 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-[4px_4px_0px_black]">Select Your Level</h1>
      
      {/* Map Selection */}
      <div className="flex justify-center items-center mb-8">
        {mapData.maps.map((map, index) => {
          const locked = isMapLocked(index);
          return (
            <button
              key={map.id}
              onClick={() => !locked && handleMapSelect(index)}
              className={`mx-2 px-4 py-2 rounded ${
                index === currentMapIndex
                  ? 'bg-blue-600 text-white'
                  : locked
                    ? 'bg-gray-700 cursor-not-allowed opacity-50'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
              disabled={locked}
            >
              {map.name}
              {locked && <span className="ml-2">🔒</span>}
            </button>
          );
        })}
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
            {selectedMap.enemies.map((enemy) => {
              const isLocked = isEnemyLocked(enemy.name, selectedMap.id);
              return (
                <button
                  key={enemy.id}
                  onClick={() => !isLocked && handleEnemySelect(enemy)}
                  className={`px-4 py-2 ${
                    isLocked 
                      ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white rounded shadow`}
                  disabled={isLocked}
                >
                  {enemy.name}
                  {isLocked && (
                    <span className="ml-2">🔒</span>
                  )}
                </button>
              );
            })}
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