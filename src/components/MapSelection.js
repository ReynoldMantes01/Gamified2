import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { auth } from "../firebase/config";
import { getDatabase, ref, onValue } from "firebase/database";
import mapData from "./maps.json";
import bioWorldBackground from "../assets/Bio_World.gif";
import physicsBackground from "../assets/physics_world.gif";
import chemistryBackground from "../assets/chemistry_world.gif";
import microbeImage from "../assets/microbe.gif";
import toxinImage from "../assets/toxin.gif";
import mutantDnaImage from "../assets/mutant_dna.gif";
import quarkImage from "../assets/quark.gif";
import gravitonImage from "../assets/graviton.gif";
import blackHoleImage from "../assets/black_hole.gif";
import atomImage from "../assets/atom.gif";
import moleculeImage from "../assets/molecule.gif";
import reactionMasterImage from "../assets/reaction_master.gif";
import Bg from "../assets/Chemistry.gif";
import BGALL from "../assets/Animated.gif";

const imageMap = {
  // Map backgrounds
  "Bio_World.gif": bioWorldBackground,
  "physics_world.gif": physicsBackground,
  "chemistry_world.gif": chemistryBackground,

  // Biology enemies
  "microbe.gif": microbeImage,
  "toxin.gif": toxinImage,
  "mutant_dna.gif": mutantDnaImage,

  // Physics enemies
  "quark.gif": quarkImage,
  "graviton.gif": gravitonImage,
  "black_hole.gif": blackHoleImage,

  // Chemistry enemies
  "atom.gif": atomImage,
  "molecule.gif": moleculeImage,
  "reaction_master.gif": reactionMasterImage,
};

// Helper function to get the correct image
const getImage = (imagePath) => {
  return imageMap[imagePath] || ""; // Return empty string if not found
};

const MapSelection = ({
  onLevelSelect,
  setTimerRunning,
  onMainMenu,
  maps,
  startingMapIndex,
}) => {
  const [currentMapIndex, setCurrentMapIndex] = useState(startingMapIndex || 0);
  const [selectedMap, setSelectedMap] = useState(
    mapData.maps[currentMapIndex || 0]
  );
  const [userProgress, setUserProgress] = useState(null);
  const [enemyProgressionOrder, setEnemyProgressionOrder] = useState([]);
  const [selectedEnemyIndex, setSelectedEnemyIndex] = useState(-1); // -1 for map selection, 0+ for enemy selection
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load enemy progression from maps.json
  useEffect(() => {
    // Extract all enemies from all maps in order
    const progression = [];
    mapData.maps.forEach((map) => {
      map.enemies.forEach((enemy) => {
        progression.push(enemy.id);
      });
    });
    setEnemyProgressionOrder(progression);
    console.log("Enemy progression loaded:", progression);
  }, []);

  // Add real-time listener for user progress
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      console.log("Setting up Firebase realtime listener for user:", user.uid);
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);

      const unsubscribe = onValue(
        userRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("Received real-time update from Firebase:", data);
            setUserProgress(data);
          } else {
            console.log("No user data exists in Firebase");
          }
        },
        (error) => {
          console.error("Firebase realtime listener error:", error);
        }
      );

      return () => {
        console.log("Unsubscribing from Firebase realtime listener");
        unsubscribe();
      };
    } else {
      console.log("No user logged in, can't set up Firebase listener");
    }
  }, []);

  // Reload user progress when the component mounts
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Reloaded user progress:", data);
          setUserProgress(data);
        } else {
          console.log("No user data exists in Firebase");
        }
      });
    }
  }, []);

  const isMapLocked = (mapIndex) => {
    const mapId = `map${mapIndex + 1}`;
    if (!userProgress?.unlockedWorlds) return mapIndex !== 0;
    return !userProgress.unlockedWorlds.includes(mapId);
  };

  // Check if an enemy is locked
  const isEnemyLocked = (enemyName) => {
    console.log("Checking if enemy is locked:", enemyName);
    console.log("User progress:", userProgress);

    // Always unlock the first enemy in the first map (Microbe)
    if (currentMapIndex === 0 && enemyName.toLowerCase() === "microbe") {
      console.log("First enemy in first map is always unlocked");
      return false;
    }

    if (!userProgress || !userProgress.unlockedEnemies) {
      console.log("No user progress or unlockedEnemies found, enemy is locked");
      return true;
    }

    // Normalize enemy name for comparison
    const normalizedEnemyName = enemyName.toLowerCase().replace(" ", "_");

    // Check if the enemy is in the unlockedEnemies array
    const isUnlocked =
      userProgress.unlockedEnemies.includes(normalizedEnemyName);
    console.log(
      `Enemy ${normalizedEnemyName} is ${isUnlocked ? "unlocked" : "locked"}`
    );
    console.log("Unlocked enemies:", userProgress.unlockedEnemies);

    return !isUnlocked;
  };

  const handleMapSelect = (mapIndex) => {
    if (
      !isMapLocked(mapIndex) &&
      !isTransitioning &&
      mapIndex !== currentMapIndex
    ) {
      setIsTransitioning(true);
      setCurrentMapIndex(mapIndex);
      setSelectedMap(mapData.maps[mapIndex]);
      setSelectedEnemyIndex(-1);

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handlePrevMap = () => {
    if (
      currentMapIndex > 0 &&
      !isTransitioning &&
      !isMapLocked(currentMapIndex - 1)
    ) {
      handleMapSelect(currentMapIndex - 1);
    }
  };

  const handleNextMap = () => {
    if (
      currentMapIndex < mapData.maps.length - 1 &&
      !isTransitioning &&
      !isMapLocked(currentMapIndex + 1)
    ) {
      handleMapSelect(currentMapIndex + 1);
    }
  };

  const handleEnemySelect = (enemy) => {
    console.log("Enemy selected:", enemy.name);

    if (isEnemyLocked(enemy.name)) {
      console.log("Enemy is locked, cannot select");
      return;
    }

    console.log("Enemy is unlocked, proceeding with selection");
    const selectedMap = mapData.maps[currentMapIndex];

    onLevelSelect({
      selectedMap,
      enemy,
    });
  };

  const handleKeyPress = (event) => {
    event.preventDefault();

    if (selectedEnemyIndex === -1) {
      // Map selection mode
      switch (event.key) {
        case "ArrowLeft":
          handlePrevMap();
          break;
        case "ArrowRight":
          handleNextMap();
          break;
        case "ArrowDown":
          if (selectedMap.enemies.length > 0) {
            setSelectedEnemyIndex(0);
          }
          break;
        case "Enter":
          if (selectedMap.enemies.length > 0) {
            setSelectedEnemyIndex(0);
          }
          break;
        case "Escape":
          onMainMenu();
          break;
      }
    } else {
      // Enemy selection mode
      switch (event.key) {
        case "ArrowUp":
          if (selectedEnemyIndex > 0) {
            setSelectedEnemyIndex(selectedEnemyIndex - 1);
          } else {
            setSelectedEnemyIndex(-1); // Go back to map selection
          }
          break;
        case "ArrowDown":
          if (selectedEnemyIndex < selectedMap.enemies.length - 1) {
            setSelectedEnemyIndex(selectedEnemyIndex + 1);
          }
          break;
        case "Enter":
          const enemy = selectedMap.enemies[selectedEnemyIndex];
          if (!isEnemyLocked(enemy.name)) {
            handleEnemySelect(enemy);
          }
          break;
        case "Escape":
          setSelectedEnemyIndex(-1); // Go back to map selection
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentMapIndex, selectedEnemyIndex, selectedMap, isTransitioning]);

  return (
    <div className="text-center bg-[url(/src/assets/Animated.gif)] bg-auto md:bg-contain p-3 min-h-screen flex flex-col items-center justify-center" style={{ userSelect: 'none' }}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white drop-shadow-[4px_4px_0px_black]">
        Select Your Level
      </h1>

      {/* Map Slider */}
      <div className="relative  overflow-hidden max-w-6xl mb- 8">
        <div className="overflow-hidden rounded-2xl shadow-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentMapIndex * 100}%)` }}
          >
            {mapData.maps.map((map, index) => {
              const locked = isMapLocked(index);
              return (
                <div
                  key={map.id}
                  className="min-w-full relative h-64 sm:h-80 md:h-96"
                >
                  <img
                    src={getImage(map.background)}
                    alt={map.name}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      locked ? "" : ""
                    }`}
                  />
                  <div className="absolute inset-0  flex flex-col items-center justify-center ">
                    {/* Enemy Selection */}
                    <div className="flex justify-center items-center w-full px-4">
                      <div
                        className="w-full max-w-md p-4 sm:p-6 "
    
                      >
                        <h2 className="text-2xl sm:text-3xl text-white font-semibold mb-2">
                          {selectedMap.name}
                        </h2>
                        <p className="mb-4 text-white text-sm sm:text-base">
                          Theme: {selectedMap.theme}
                        </p>
                        <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-2 sm:gap-4">
                          {selectedMap.enemies.map((enemy, index) => {
                            const isLocked = isEnemyLocked(enemy.name);
                            const isSelected = index === selectedEnemyIndex;
                            return (
                              <div key={enemy.id} className="relative group">
                                <button
                                  onClick={() => {
                                    if (!isLocked) {
                                      handleEnemySelect(enemy);
                                    }
                                  }}
                                  title={
                                    isLocked
                                      ? "This level is locked! Complete previous levels to unlock."
                                      : `Fight ${enemy.name}`
                                  }
                                  className={`px-3 py-2 sm:px-4 sm:py-2 w-full ${
                                    isLocked
                                      ? "bg-gray-700 text-gray-300 cursor-not-allowed opacity-50 hover:bg-gray-600"
                                      : isSelected
                                      ? "bg-blue-600 text-white ring-2 ring-white scale-105"
                                      : "bg-blue-500 text-white hover:bg-blue-600"
                                  } rounded shadow flex items-center justify-between transition-all duration-200 text-sm sm:text-base`}
                                >
                                  <div className="flex items-center">
                                    {enemy.image && (
                                      <img
                                        src={getImage(enemy.image)}
                                        alt={enemy.name}
                                        className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 rounded-full object-cover"
                                      />
                                    )}
                                    <span className="font-medium">
                                      {enemy.name}
                                    </span>
                                  </div>
                                  {isLocked ? (
                                    <span className="ml-2 text-xl">🔒</span>
                                  ) : (
                                    <span className="ml-2 bg-green-500 p-1 rounded-full">
                                      ✓
                                    </span>
                                  )}
                                </button>
                                {isLocked && (
                                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-2 px-3 whitespace-nowrap z-10">
                                    Complete previous levels to unlock
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {locked && (
                      <div className="mt-4 bg-black bg-opacity-60 p-4 rounded-full">
                        <span className="text-4xl">🔒</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevMap}
          disabled={
            currentMapIndex === 0 ||
            isTransitioning ||
            isMapLocked(currentMapIndex - 1)
          }
          className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white 
            ${
              currentMapIndex === 0 || isMapLocked(currentMapIndex - 1)
                ? "opacity-30 cursor-not-allowed"
                : "opacity-80 hover:opacity-100 hover:bg-opacity-70"
            }`}
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={handleNextMap}
          disabled={
            currentMapIndex === mapData.maps.length - 1 ||
            isTransitioning ||
            isMapLocked(currentMapIndex + 1)
          }
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white
            ${
              currentMapIndex === mapData.maps.length - 1 ||
              isMapLocked(currentMapIndex + 1)
                ? "opacity-30 cursor-not-allowed"
                : "opacity-80 hover:opacity-100 hover:bg-opacity-70"
            }`}
        >
          <ChevronRight size={32} />
        </button>

        {/* Map Selection Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {mapData.maps.map((map, index) => (
            <button
              key={`indicator-${map.id}`}
              onClick={() => !isMapLocked(index) && handleMapSelect(index)}
              disabled={isMapLocked(index) || isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300
                ${
                  index === currentMapIndex
                    ? "w-6 bg-white"
                    : isMapLocked(index)
                    ? "bg-gray-600"
                    : "bg-gray-400 hover:bg-gray-200"
                }`}
              aria-label={`Select ${map.name}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onMainMenu}
        className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-colors duration-200 font-medium text-sm sm:text-base"
      >
        Back to Main Menu
      </button>
    </div>
  );
};

export default MapSelection;
