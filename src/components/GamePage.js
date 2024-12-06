import React, { useState, useEffect, useCallback } from 'react';
import { Cross } from 'hamburger-react';
import GameSettings from './GameSettings';
import Profile from './Profile';
import Slidebar from './Slidebar';
import scienceTerm from './scienceTerm';
import heartImage from '../assets/heart.png';
import attackImage from '../assets/attack.png';
import attackEnemyImage from '../assets/attack.gif';
import character from '../assets/Character.png';
import functionBackground from '../assets/functionBackground.png';
import dialogueBox from '../assets/dialogueBox.png'

// Import the enemy data JSON
import mapLibrary from '../components/maps.json';

const GamePage = ({ onMainMenu, profileData, setProfileData, onLogout }) => {

    
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
    const [currentMap, setCurrentMap] = useState(mapLibrary.maps[0]); 
    const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);  
    const [currentEnemy, setCurrentEnemy] = useState(currentMap.enemies[currentEnemyIndex]);
    const [enemyHearts, setEnemyHearts] = useState(currentEnemy?.health || 0);  // Set enemy health if currentEnemy exists
    const isValidWord = selectedLetters.length > 0 && scienceTerm[selectedLetters.join('').toUpperCase()];
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const closeDialog = () => {setDialogVisible(false)};

        useEffect(() => {
        // Show dialog for the first enemy when the game starts
        if (currentEnemy) {
            setDialogMessage(currentEnemy.dialog); // Set the dialog message    
            setDialogVisible(true); // Show the dialog
        }
    }, [currentEnemy]);

    

    function generateRandomLetters() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array.from({ length: 16 }, () => letters.charAt(Math.floor(Math.random() * letters.length)));
    }

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
        emptyIndices.forEach((index) => {
            newGridLetters[index] = '';
        });
        setGridLetters(newGridLetters);

        handleEnemyAttack(); // Trigger enemy attack on scramble
    };

    const handleEnemyAttack = () => {
        setEnemyLaserActive(true);
        setPlayerHearts((prev) => Math.max(0, prev - 1));
        setTimeout(() => setEnemyLaserActive(false), 500);
    };

    const handleAttack = () => {
        const word = selectedLetters.join('');
        let damage = Math.min(3, Math.ceil(word.length / 4));

        if (scienceTerm[word.toUpperCase()]) {
            setDefinition(scienceTerm[word.toUpperCase()]);
            const updatedHearts = Math.max(0, enemyHearts - damage);
            setEnemyHearts(updatedHearts);

            if (updatedHearts === 0) handleNextEnemy();
        } else {
            setDefinition('Invalid word. Please try again.');
            setPlayerHearts(Math.max(0, playerHearts - damage));
            handleEnemyAttack();
        }

        setLaserActive(true);
        setTimeout(() => setLaserActive(false), 500);
        setSelectedLetters([]);
        setEmptyIndices([]);
        setGridLetters(generateRandomLetters());
    };

            const handleNextEnemy = () => {
                // Check if there are more enemies in the current map
                const nextEnemyIndex = currentEnemyIndex + 1;
                if (currentMap.enemies[nextEnemyIndex]) {
                    const nextEnemy = currentMap.enemies[nextEnemyIndex];
                    setCurrentEnemy(nextEnemy);
                    setEnemyHearts(nextEnemy.health);
                    setCurrentEnemyIndex(nextEnemyIndex);
                    setDialogMessage(nextEnemy.dialog); // Set the dialog message
                    setDialogVisible(true); // Show the dialog
                } else {
                    // No more enemies, go to the next map or end the game
                    handleNextMap();
                }
            };

            const handleNextMap = () => {
            const nextMapId = currentMap.next_map_id; // Assume this field is present in your map data
            const nextMap = mapLibrary.maps.find((map) => map.id === nextMapId);

            if (nextMap) {
                setCurrentMap(nextMap);
                setCurrentEnemy(nextMap.enemies[0]); // Start with the first enemy of the new map
                setEnemyHearts(nextMap.enemies[0]?.health || 0);
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

    return (
        <div className="game-container flex flex-col items-center justify-center h-screen relative">
                {dialogVisible && ( // DIALOG BOX
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#f4d9a3] border-2 border-black p-5 rounded-lg text-center">
                            {/* Add the image above the text */}
                            {currentEnemy && (
                                <img
                                    src={require(`../assets/${currentEnemy.image}`)} // Use the current enemy's image
                                    alt={currentEnemy.name}
                                    className="w-24 h-24 mb-4 mx-auto" // Adjust size and margin as needed
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
            <Slidebar
                isOpen={slidebarOpen}
                toggleSlidebar={toggleSlidebar}
                onMainMenu={onMainMenu}
                setSettingsOpen={setSettingsOpen}
                setProfileOpen={setProfileOpen}
                onLogout={onLogout}
            />
            <div className="top-bar absolute top-2 left-2 flex items-center z-0">
                <div className="slidebar-icon text-2xl mr-2 cursor-pointer" onClick={toggleSlidebar}>
                    <Cross toggled={slidebarOpen} toggle={toggleSlidebar} />
                </div>
                <div className="player-info flex items-center bg-[#f4d9a3] p-2 border-2 border-black">
                    <img src={profileData.image || "https://64.media.tumblr.com/ea445b7825d5c355924d801b4633887f/4b78abb807e9ea7b-3b/s400x600/c4f8f149cc53b279fb69dddad35c1c0db9a56e9b.png"} alt="Player Avatar" className="rounded-full w-8 h-8 object-cover mr-2" />
                    <div className="hearts flex">
                        {[...Array(playerHearts)].map((_, i) => (
                            <img key={i} src={heartImage} alt="Heart" className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="top-bar absolute top-2 right-2 flex items-center">
                <div className="player-info flex items-center bg-[#f4d9a3] p-2 border-2 border-black">
                    <img src="https://pbs.twimg.com/profile_images/1617590113252278277/SaQY2ovq_400x400.png" alt="Enemy Avatar" className="rounded-full w-8 h-8 object-cover mr-2" />
                    <div className="hearts flex">
                        {[...Array(enemyHearts)].map((_, i) => (
                            <img key={i} src={heartImage} alt="Heart" className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="game-content flex items-center justify-between w-4/5">
                <div className="character-container relative mt-44">
                    {/* Character */}
                    <div
                        className={`character w-72 h-72 bg-contain bg-no-repeat transition-transform duration-300 ${laserActive ? 'transform scale-110' : ''}`}
                        style={{ backgroundImage: `url(${character})` }}
                    ></div>

                    {/* Player Laser Animation */}
                    {laserActive && (
                        <img
                            src={attackImage}
                            alt="Laser"
                            className="laser absolute"
                            style={{
                                top: '50%',
                                left: '100%',
                                transform: 'translateY(-50%)',
                                animation: 'shoot 0.5s linear forwards',
                                height: '10rem', // Adjust the size of the laser
                            }}
                        />
                    )}
                </div>
                <div className="word-box flex justify-center my-5">
                    {selectedLetters.map((letter, index) => (
                        <div
                            key={index}
                            className="letter w-12 h-12 bg-[#f4d9a3] border-2 border-black flex items-center justify-center mx-1 text-2xl cursor-pointer hover:bg-[#e5c8a1] transform transition-transform duration-200 hover:scale-110"
                            onClick={() => handleSelectedLetterClick(letter, index)}
                        >
                            {letter}
                        </div>
                    ))}
                </div>
                
                <div className="enemy-container relative mt-56">
                        <div
                            className={`enemy w-72 h-72 bg-contain bg-no-repeat`}
                            style={{ backgroundImage: `url(${require(`../assets/${currentEnemy.image}`)})` }}
                        ></div>
                    {/* Enemy Laser Animation */}
                    {enemyLaserActive && (
                        <img
                            src={attackEnemyImage}
                            alt="Enemy Laser"
                            className="enemy-laser absolute"
                            style={{
                                top: '50%',
                                right: '100%',
                                transform: 'translateY(-50%)',
                                animation: 'enemyShoot 0.5s linear forwards',
                                height: '10rem',
                            }}
                        />
                    )}
                </div>
            </div>
            <div className="game-content flex items-center justify-between mt-14 h-full w-full border-4 border-black p-5"
            style={{ backgroundImage: `url(${functionBackground})` }}>
                <div className="description-box bg-[#f4d9a3] border-2 border-black p-2 w-80 h-full ml-10 mr-72 mb-5">
                    {definition}
                </div>
                <div className="letter-grid grid grid-cols-4 gap-1 bg-[#f4d9a3] border-2 border-black p-2 h-full w-72 mb-5">
                    {gridLetters.map((letter, index) => (
                        <div
                            key={index}
                            className="grid-letter w-16 h-14 bg-[#f4d9a3] border-2 border-black flex items-center justify-center text-2xl cursor-pointer hover:bg-[#e5c8a1]"
                            onClick={() => handleLetterClick(letter, index)}
                        >
                            {letter}
                        </div>
                    ))}
                </div>
                <div className="action-buttons flex flex-col gap-2">
                    <button
                        className={`button bg-[#f4d9a3] border-2 border-black p-2 text-center text-xl cursor-pointer hover:bg-[#e5c8a1] ${
                            !isValidWord ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={handleAttack}
                        disabled={!isValidWord} // Disable when there's no valid word
                    >
                        ATTACK
                    </button>
                    <div
                        className="button bg-[#f4d9a3] border-2 border-black p-2 text-center text-xl cursor-pointer hover:bg-[#e5c8a1]"
                        onClick={handleScramble}
                    >
                        SCRAMBLE
                    </div>
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
            {settingsOpen && <GameSettings onClose={() => setSettingsOpen(false)} />}
            {profileOpen && <Profile onClose={() => setProfileOpen(false)} onSave={() => setProfileOpen(false)} profileData={profileData} setProfileData={setProfileData} />}
        </div>
        
    );
};

export default GamePage;
