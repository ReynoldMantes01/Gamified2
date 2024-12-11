import React, { useState, useEffect, useCallback } from 'react';
import { Cross } from 'hamburger-react';
import GameSettings from './GameSettings';
import Profile from './Profile';
import Slidebar from './Slidebar';
import scienceTerm from './scienceTerm';
import heartImage from '../assets/heart.png';
import attackImage from '../assets/attack.png';
import attackEnemyImage from '../assets/attack.gif';
import character from '../assets/newchar.gif';
import functionBackground from '../assets/functionBackground.png';
import mapLibrary from '../components/maps.json';
import mapData from './maps.json';

const GamePage = ({ onMainMenu, profileData, setProfileData, onLogout,musicVolume, setMusicVolume, startingMap, }) => {
    const [enemyLaserActive, setEnemyLaserActive] = useState(false);
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [gridLetters, setGridLetters] = useState(generateRandomLetters());
    const [definition, setDefinition] = useState('Definition shows here when you enter right');
    const [playerHearts, setPlayerHearts] = useState(3);
    const [emptyIndices, setEmptyIndices] = useState([]);
    const [slidebarOpen, setSlidebarOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [laserActive, setLaserActive] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const closeDialog = () => setDialogVisible(false);
    const [hint, setHint] = useState(''); // Store the current hint

    const [currentMap, setCurrentMap] = useState(mapData.maps[0]); // Default to first map
    const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
    const [currentEnemy, setCurrentEnemy] = useState(currentMap.enemies[currentEnemyIndex]);
    const [enemyHearts, setEnemyHearts] = useState(currentEnemy?.health || 0);

    const isValidWord = selectedLetters.length > 0 && scienceTerm[selectedLetters.join('').toUpperCase()];

    const [victoryVisible, setVictoryVisible] = useState(false);
    const [defeatVisible, setDefeatVisible] = useState(false);
    const handleSettingsSave = (newMusicVolume) => {
    setMusicVolume(newMusicVolume); // Update the music volume
    setSettingsOpen(false); // Close the settings modal
    };

    const handleSettingsReset = () => {
    setMusicVolume(50); // Reset music volume to default
    };

    useEffect(() => {
        if (currentEnemy) {
            setDialogMessage(currentEnemy.dialog);
            setDialogVisible(true);
        }
    }, [currentEnemy]);

    useEffect(() => {
        if (currentMap) {
            setCurrentEnemy(currentMap.enemies[0]);
            setEnemyHearts(currentMap.enemies[0]?.health || 0);
        }
    }, [currentMap]);

    //Word Box
    function generateRandomLetters() {
        const vowels = 'AEIOU';
        const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
        return Array.from({ length: 20 }, () => Math.random() < 0.6
            ? vowels.charAt(Math.floor(Math.random() * vowels.length))
            : consonants.charAt(Math.floor(Math.random() * consonants.length))
    );
    }

    //Word Inside Box
    const handleLetterClick = (letter, index) => {
        if (letter) {
            setSelectedLetters([...selectedLetters, letter]);
            const newGridLetters = [...gridLetters];
            newGridLetters[index] = '';
            setGridLetters(newGridLetters);
            setEmptyIndices([...emptyIndices, index]);
        }
    };

    const handleSelectedLetterClick = (letter, index) => {
        const newSelectedLetters = [...selectedLetters];
        newSelectedLetters.splice(index, 1);
        setSelectedLetters(newSelectedLetters);

        const emptyIndex = emptyIndices.shift();
        if (emptyIndex !== undefined) {
            const newGridLetters = [...gridLetters];
            newGridLetters[emptyIndex] = letter;
            setGridLetters(newGridLetters);
            setEmptyIndices(emptyIndices);
        }
    };

    const handleScramble = () => {
        const newGridLetters = generateRandomLetters();
        
        // Restore the selected letters back to the grid
        selectedLetters.forEach((letter, index) => {
            const emptyIndex = emptyIndices[index]; // Get the index where the letter was selected
            if (emptyIndex !== undefined) {
                newGridLetters[emptyIndex] = letter; // Place the selected letter back in the grid
            }
        });
    
        // Clear empty indices
        emptyIndices.forEach((index) => {
            newGridLetters[index] = ''; // Keep empty indices as empty
        });
    
        setGridLetters(newGridLetters);
        handleEnemyAttack(); // Call enemy attack after scrambling
    };

        const handleHint = () => {
        const gridLettersString = gridLetters.join('');
        const possibleWords = Object.keys(scienceTerm).filter((word) =>
            word.split('').every((char) => gridLettersString.includes(char))
        );
        if (possibleWords.length > 0) {
            const hintWord = possibleWords[0];
            setHint(`Hint: Try forming the word "${hintWord.substring(0, 2)}..."`);
        } else {
            setHint('No hints available.');
        }
    };

    const handleEnemyAttack = () => {
        if (enemyLaserActive) return;
        setEnemyLaserActive(true);

        setTimeout(() => {
            // Deduct one heart and check if player is defeated
            setPlayerHearts((prev) => {
                const newHeartCount = Math.max(0, prev - 1);
                if (newHeartCount === 0) {
                    setDefeatVisible(true); // Trigger defeat dialog if player has 0 hearts
                }
                return newHeartCount;
            });
            setEnemyLaserActive(false);
        }, 500);
    };

    // Handle player's attack logic
    const handleAttack = () => {
        const word = selectedLetters.join('');
        let damage = Math.min(3, Math.ceil(word.length / 1000000000000000));

        if (scienceTerm[word.toUpperCase()]) {
            setDefinition(scienceTerm[word.toUpperCase()]);
            const updatedHearts = Math.max(0, enemyHearts - damage);
            setEnemyHearts(updatedHearts);

            if (updatedHearts === 0) {
                setVictoryVisible(true); // Show victory dialog if enemy's hearts reach 0
            }
        } else {
            setDefinition('Invalid word. Please try again.');
            const updatedPlayerHearts = Math.max(0, playerHearts - damage);
            setPlayerHearts(updatedPlayerHearts);

            handleEnemyAttack(); // Handle enemy attack after invalid word

            // Ensure defeat dialog shows when player hearts are 0
            if (updatedPlayerHearts === 0) {
                setDefeatVisible(true); // Show defeat dialog
            }
        }



            setLaserActive(true);
            setTimeout(() => setLaserActive(false), 500);
            setSelectedLetters([]);
            setEmptyIndices([]);
            setGridLetters(generateRandomLetters());
        };

        const handleNextEnemy = () => {
            const nextEnemyIndex = currentEnemyIndex + 1;
            if (currentMap.enemies[nextEnemyIndex]) {
                const nextEnemy = currentMap.enemies[nextEnemyIndex];
                setCurrentEnemy(nextEnemy);
                setEnemyHearts(nextEnemy.health);
                setCurrentEnemyIndex(nextEnemyIndex);
                setDialogMessage(nextEnemy.dialog);
                setDialogVisible(true);
            } else {
                handleNextMap();
            }
        };

        const handleNextMap = () => {
            const nextMapId = currentMap.next_map_id;
            if (!nextMapId) {
                console.log("Game Over or Victory! No more maps.");
                return;
            }

            const nextMap = mapLibrary.maps.find(map => map.id === nextMapId);
            if (nextMap) {
                setCurrentMap(nextMap);
                setCurrentEnemy(nextMap.enemies[0]);
                setEnemyHearts(nextMap.enemies[0]?.health || 0);
                setCurrentEnemyIndex(0);
                setGridLetters(generateRandomLetters());
                setSelectedLetters([]);
                setEmptyIndices([]);
                setDefinition('Definition shows here when you enter right');
                setDialogMessage(nextMap.enemies[0]?.dialog || '');
                setDialogVisible(true);
            }
        };

        const toggleSlidebar = () => setSlidebarOpen(!slidebarOpen);
    
        const handleClickOutside = useCallback(
            (event) => {
                if (slidebarOpen && !event.target.closest('.slidebar') && !event.target.closest('.slidebar-icon')) {
                    setSlidebarOpen(false);
                }
            },
            [slidebarOpen]
        );

        useEffect(() => {
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, [handleClickOutside]);

        const handleTryAgain = () => {
            setPlayerHearts(3);
            setEnemyHearts(currentMap.enemies[0]?.health || 0);
            setSelectedLetters([]); // Reset selected letters
            setGridLetters(generateRandomLetters()); // Generate new random letters
            setEmptyIndices([]); // Reset empty indices
            setDefeatVisible(false);
            setHint(''); // Optionally reset hint as well
        };
        
        // Function to handle proceeding to the next level
        const handleNextLevel = () => {
            handleNextEnemy();
            setVictoryVisible(false);
        };


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        return (
                <div
                className="game-container flex flex-col items-center justify-center min-h-screen w-full relative"
                style={{
                    backgroundImage: `url(${require(`../assets/${currentMap.background}`)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                >
                {/* Victory Dialog */}
                {victoryVisible && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-[#f4d9a3] border-2 border-black p-5 rounded-lg text-center max-w-sm w-full sm:max-w-md">
                            <h2 className="text-2xl font-bold">Victory!</h2>
                            <p>You defeated {currentEnemy.name}!</p>
                            <button
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleNextLevel}
                            >
                            Next Level
                        </button>
                        <button
                            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={() => {
                                setVictoryVisible(false);
                                onMainMenu(); // Go back to main menu
                            }}
                        >
                            Back to Main Menu
                        </button>
                    </div>
                </div>
             )}
            {/* Defeat Dialog */}
            {defeatVisible && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-[#f4d9a3] border-2 border-black p-5 rounded-lg text-center max-w-sm w-full sm:max-w-md">
                    <h2 className="text-2xl font-bold">Defeat!</h2>
                    <p>You have been defeated!</p>
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleTryAgain}
                    >
                        Try Again
                    </button>
                    <button
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => {
                            setDefeatVisible(false);
                            onMainMenu(); // Go back to main menu
                        }}
                    >
                        Back to Main Menu
                    </button>
                </div>
            </div>
        )}
            
                        {/* Dialog Box */}
            
                {dialogVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-[#f4d9a3] border-2 border-black p-5 rounded-lg text-center max-w-sm w-full sm:max-w-md">
                            {currentEnemy && (
                                <img
                                    src={require(`../assets/${currentEnemy.image}`)}
                                    alt={currentEnemy.name}
                                    className="w-24 h-24 mb-4 mx-auto"
                                />
                            )}
                            <p>{dialogMessage}</p>
                            <button
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={closeDialog}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Sidebar */}
                <Slidebar
                    isOpen={slidebarOpen}
                    toggleSlidebar={toggleSlidebar}
                    onMainMenu={onMainMenu}
                    setSettingsOpen={setSettingsOpen}
                    setProfileOpen={setProfileOpen}
                    onLogout={onLogout}
                />

            {/* Top Bars */}
            <div className="top-bar absolute top-2 left-2 flex items-center z-10">
                <div className="slidebar-icon text-2xl mr-2 cursor-pointer" onClick={toggleSlidebar}>
                    <Cross toggled={slidebarOpen} toggle={toggleSlidebar} />
                </div>
                <div className="player-info flex items-center bg-[#f4d9a3] p-2 border-2 border-black">
                    <img
                        src={profileData.image || "https://64.media.tumblr.com/ea445b7825d5c355924d801b4633887f/4b78abb807e9ea7b-3b/s400x600/c4f8f149cc53b279fb69dddad35c1c0db9a56e9b.png"}
                        alt="Player Avatar"
                        className="rounded-full w-8 h-8 object-cover mr-2"
                    />
                    <div className="hearts flex">
                        {[...Array(playerHearts)].map((_, i) => (
                            <img key={i} src={heartImage} alt="Heart" className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="top-bar absolute top-2 right-2 flex items-center">
                <div className="player-info flex items-center bg-[#f4d9a3] p-2 border-2 border-black">
                    <img
                        src="https://pbs.twimg.com/profile_images/1617590113252278277/SaQY2ovq_400x400.png"
                        alt="Enemy Avatar"
                        className="rounded-full w-8 h-8 object-cover mr-2"
                    />
                    <div className="hearts flex">
                        {[...Array(enemyHearts)].map((_, i) => (
                            <img key={i} src={heartImage} alt="Heart" className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                </div>
            </div>
            
        {/* Main Content */}
        <div className="game-content flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mt-16 lg:mt-40">
            {/* Player Character */}
            <div className="character-container relative mb-8 lg:mb-0">
                <div
                    className={`character w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-contain bg-no-repeat transition-transform duration-300 ${
                        laserActive ? "transform scale-110" : ""
                    }`}
                    style={{ backgroundImage: `url(${character})` }}
                ></div>
                {laserActive && (
                    <img
                        src={attackImage}
                        alt="Laser"
                        className="laser absolute"
                        style={{
                            top: "50%",
                            left: "100%",
                            transform: "translateY(-50%)",
                            animation: "shoot 0.5s linear forwards",
                            height: "10rem", // Adjust the size for responsiveness
                        }}
                    />
                )}

            </div>

                {/* Word Box */}
                <div className="word-box flex flex-wrap justify-center gap-2">
                    {selectedLetters.map((letter, index) => (
                        <div
                            key={index}
                            className="letter w-14 h-14 sm:w-16 sm:h-16 bg-[#f4d9a3] border-2 border-black flex items-center justify-center text-xl cursor-pointer hover:bg-[#e5c8a1] transform transition-transform duration-200 hover:scale-110"
                            onClick={() => handleSelectedLetterClick(letter, index)}
                        >
                            {letter}
                        </div>
                    ))}
                </div>
                
                {/* Enemy Character */}
                <div className="enemy-container relative mt-35">
                    <div
                        className={`enemy w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-contain bg-no-repeat`}
                        style={{ backgroundImage: `url(${require(`../assets/${currentEnemy.image}`)})` }}
                    ></div>
                    {enemyLaserActive && (
                        <img
                            src={attackEnemyImage}
                            alt="Enemy Laser"
                            className="enemy-laser absolute"
                            style={{
                                top: "50%",
                                right: "100%",
                                transform: "translateY(-50%)",
                                animation: "enemyShoot 0.5s linear forwards",
                                height: "10rem",
                            }}
                        />
                    )}
                </div>
            </div>

              {/* Bottom Content */}
            <div className="game-content flex items-center justify-between mt-14 h-full w-full border-4 border-black p-5"
            style={{ backgroundImage: `url(${functionBackground})` }}>

                {/* Description Box */}
                <div className="description-box bg-[#f4d9a3] border-2 border-black p-2 w-80 h-full ml-10 mr-72 mb-5">
                    {definition}
                </div>
                <div className="letter-grid grid grid-cols-4 gap-2 bg-[#f4d9a3] border-2 border-black p-2 h-full w-full sm:w-72">
                    {gridLetters.map((letter, index) => (
                        <div
                            key={index}
                            className="grid-letter w-12 h-12 sm:w-16 sm:h-16 bg-[#f4d9a3] border-2 border-black flex items-center justify-center text-lg sm:text-xl cursor-pointer hover:bg-[#e5c8a1]]"
                            onClick={() => handleLetterClick(letter, index)}
                        >
                            {letter}
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="action-buttons flex flex-col gap-2">

                    {/* ATTACK */}
                    <button
                    className={`bg-[#f4d9a3] border-2 border-black p-2 text-center text-lg cursor-pointer hover:bg-[#e5c8a1] ${
                        !isValidWord ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleAttack}
                    disabled={!isValidWord}
                >
                    ATTACK
                    </button>

                    {/* HINT */}
                <div className="hint-box bg-[#ffebc4] border-2 border-black w-80 p-2 text-center">
                    {hint || 'Press "Hint" for help!'}
                </div>
                    <button
                        className="hint-button bg-[#f4d9a3] border-2 border-black p-2 text-lg cursor-pointer hover:bg-[#e5c8a1]"
                        onClick={handleHint}
                    >
                        HINT
                    </button>

                    {/* SCRAMBLE */}
                    <button
                        className="scramble-button bg-[#f4d9a3] border-2 border-black p-2 text-center text-xl cursor-pointer hover:bg-[#e5c8a1]"
                        onClick={handleScramble}
                    >
                        SCRAMBLE
                    </button>
                </div>
                <div> 
                    <div className="enemy-stats bg-[#f4d9a3] border-2 border-black mr-10 p-10 ">
                           <div className="level-info bg-[#f4d9a3] p-4">
                            <h3>{currentMap.name}</h3>
                            <p><strong>Enemy:</strong> {currentEnemy.name}</p>
                            <p><strong>Weakness:</strong> {currentEnemy.stats.weakness}</p>
                            <p><strong>Strength:</strong> {currentEnemy.stats.strength}</p>
                            </div>
                            <div>
                                <strong>Attacks:</strong>
                                <ul>
                                    {currentEnemy.attacks.map((attack, index) => (
                                        <li key={index}>
                                            <strong>{attack.name}:</strong> {attack.damage} damage
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {settingsOpen && (<GameSettings onClose={() => setSettingsOpen(false)} onSave={handleSettingsSave} onReset={handleSettingsReset} musicVolume={musicVolume} /> )}
            {profileOpen && <Profile onClose={() => setProfileOpen(false)} onSave={() => setProfileOpen(false)} profileData={profileData} setProfileData={setProfileData} />}
        </div>
        
    );
};

export default GamePage;
