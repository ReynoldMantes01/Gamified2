import React, { useState, useEffect, useCallback } from 'react';
import { Cross } from 'hamburger-react';
import scienceTerm from './scienceTerm';
import character from '../assets/newchar.gif';
import attackImage from '../assets/attack.gif';
import attackEnemyImage from '../assets/attack.gif';
import heartImage from '../assets/heart.png';
import bgImage from '../assets/bg.gif';
import microbeImage from '../assets/microbe.gif';
import toxinImage from '../assets/toxin.gif';
import slimesImage from '../assets/slimes.gif';
import mapData from './maps.json';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { auth } from '../firebase/config';
import Slidebar from './Slidebar';
import GameSettings from './GameSettings';
import Profile from './Profile';
import Scoreboard from './Scoreboard'; // Import Scoreboard component

const MiniGame = ({ onMainMenu, onLogout, musicVolume, setMusicVolume, profileData, setProfileData }) => {
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [gridLetters, setGridLetters] = useState([]);
    const [playerHearts, setPlayerHearts] = useState(10);
    const [score, setScore] = useState(0);
    const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
    const [currentEnemyHealth, setCurrentEnemyHealth] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [playerAttacking, setPlayerAttacking] = useState(false);
    const [enemyAttacking, setEnemyAttacking] = useState(false);
    const [currentWord, setCurrentWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [showTutorial, setShowTutorial] = useState(true);
    const [emptyIndices, setEmptyIndices] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [slidebarOpen, setSlidebarOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [scoreboardOpen, setScoreboardOpen] = useState(false); // State for scoreboard visibility

    const enemies = [
        { name: "Microbe", image: 'microbe.gif', health: 3 },
        { name: "Toxic Crawler", image: 'toxic_crawler.gif', health: 4 },
        { name: "Chemical Slime", image: 'chemical_slime.gif', health: 5 }
    ];

    // Map enemy image filenames to imported images
    const enemyImages = {
        'microbe.gif': microbeImage,
        'toxic_crawler.gif': toxinImage,
        'chemical_slime.gif': slimesImage
    };

    const currentEnemy = enemies[currentEnemyIndex % enemies.length];
    const currentEnemyImage = enemyImages[currentEnemy.image];

    // Function to get a random word from scienceTerm
    const getRandomScienceWord = () => {
        const words = Object.keys(scienceTerm);
        return words[Math.floor(Math.random() * words.length)];
    };

    // Function to scramble a word and fill with random letters
    const scrambleWord = (word) => {
        const letters = word.split('');
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        
        // Fill remaining grid with random letters
        while (letters.length < 20) {
            const randomLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
            letters.push(randomLetter);
        }
        
        return letters;
    };

    // Slidebar toggle function
    const toggleSlidebar = () => setSlidebarOpen(!slidebarOpen);
    
    const handleClickOutside = useCallback(
        (event) => {
            if (slidebarOpen && !event.target.closest('.slidebar') && !event.target.closest('.slidebar-icon')) {
                setSlidebarOpen(false);
            }
        },
        [slidebarOpen]
    );

    // Initialize grid with a guaranteed science word
    useEffect(() => {
        const randomWord = getRandomScienceWord();
        const scrambledGrid = scrambleWord(randomWord);
        setGridLetters(scrambledGrid);
    }, [currentEnemyIndex]);

    useEffect(() => {
        // Set initial enemy health when enemy changes
        if (currentEnemy) {
            setCurrentEnemyHealth(currentEnemy.health);
        }
    }, [currentEnemyIndex]);

    // Timer effect
    useEffect(() => {
        if (!showTutorial && !gameOver) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 0) {
                        // Enemy attacks when time runs out
                        setEnemyAttacking(true);
                        setDefinition('Time\'s up! The enemy attacks!');
                        setTimeout(() => {
                            setEnemyAttacking(false);
                            setPlayerHearts(prev => {
                                const newHearts = prev - 1;
                                if (newHearts <= 0) {
                                    setGameOver(true);
                                    saveScore();
                                }
                                return Math.max(0, newHearts);
                            });
                        }, 500);
                        return 30; // Reset timer
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [showTutorial, gameOver]);

    // Handle letter selection
    const handleLetterClick = (letter, index) => {
        if (!emptyIndices.includes(index)) {
            setSelectedLetters(prev => [...prev, letter]);
            setEmptyIndices(prev => [...prev, index]);
        }
    };

    // Handle letter removal from word
    const handleRemoveLetter = (letterIndex) => {
        const originalIndex = emptyIndices[letterIndex];
        setSelectedLetters(prev => prev.filter((_, i) => i !== letterIndex));
        setEmptyIndices(prev => prev.filter((_, i) => i !== letterIndex));
    };

    // Handle word submission and attacks
    const handleSubmitWord = useCallback(() => {
        const word = selectedLetters.join('').toUpperCase();
        setCurrentWord(word);

        if (word.length === 0) return;

        if (scienceTerm.hasOwnProperty(word)) {
            // Correct answer - player attacks
            setDefinition('Correct!');
            setPlayerAttacking(true);
            setTimeLeft(30); // Reset timer on correct answer
            
            // Reduce enemy health
            setCurrentEnemyHealth(prev => {
                const newHealth = prev - 1;
                if (newHealth <= 0) {
                    // Enemy defeated, move to next enemy
                    setCurrentEnemyIndex(prev => prev + 1);
                    return currentEnemy.health; // Reset health for new enemy
                }
                return newHealth;
            });

            setTimeout(() => {
                setPlayerAttacking(false);
                setScore(s => s + word.length * 10);
            }, 500);
        } else {
            // Wrong answer - enemy attacks
            setDefinition('Wrong answer! The enemy attacks!');
            setEnemyAttacking(true);
            setTimeout(() => {
                setEnemyAttacking(false);
                setPlayerHearts(prev => {
                    const newHearts = prev - 1;
                    if (newHearts <= 0) {
                        setGameOver(true);
                        saveScore();
                    }
                    return Math.max(0, newHearts);
                });
            }, 500);
        }

        setSelectedLetters([]);
        setEmptyIndices([]);
        const randomWord = getRandomScienceWord();
        const scrambledGrid = scrambleWord(randomWord);
        setGridLetters(scrambledGrid);
    }, [selectedLetters, currentEnemyIndex, currentEnemy.health]);

    // Save score to database
    const saveScore = async () => {
        if (auth.currentUser) {
            const db = getDatabase();
            const scoreRef = ref(db, `users/${auth.currentUser.uid}/miniGameScores/${Date.now()}`);
            await set(scoreRef, {
                score: score,
                timestamp: Date.now()
            });
        }
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-cover bg-center flex flex-col items-center"
             style={{ 
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
             }}>
            
            {/* Tutorial Dialog */}
            {showTutorial && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-2xl text-center">
                        <h2 className="text-2xl font-bold mb-4">Welcome to Mini Game!</h2>
                        <p className="mb-6">
                            After playing the adventure mode, let's test your vocabulary in science terms!
                            In this mode, there are no hints - you must rely on your knowledge.
                            Each grid contains at least one valid science term. Can you find it?
                        </p>
                        <button 
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600"
                            onClick={() => setShowTutorial(false)}
                        >
                            Start Game
                        </button>
                    </div>
                </div>
            )}
            
            {/* Header */}
            <div className="w-full flex justify-between items-center p-4 bg-black bg-opacity-50">
                {/* heart nasa kaliwaa */}
                <div className="flex items-center">
                    <img src={heartImage} alt="Heart" className="w-8 h-8 mr-2" />
                        <span className="text-white text-2xl">{playerHearts}</span>
                    </div>
                    {/* CENTER SCORE */} 
                    <div className="text-white text-2xl absolute left-1/2 transform -translate-x-1/2">
                        Score: {score}
                    </div>
                    {/* NAV BAR KANAN*/}                     
                    <div className="flex items-center space-x-4">
                        <div className="slidebar-icon text-2xl cursor-pointer" onClick={toggleSlidebar}>
                            <Cross toggled={slidebarOpen} toggle={toggleSlidebar} />
                        </div>
                        <Slidebar 
                            isOpen={slidebarOpen} 
                            toggleSlidebar={toggleSlidebar} 
                            onMainMenu={onMainMenu} 
                            setSettingsOpen={setSettingsOpen}
                            setProfileOpen={setProfileOpen}
                            onLogout={onLogout}
                        />
                    </div>
                </div>
            {/* Modals */}
            {scoreboardOpen && ( // Render Scoreboard if open
                <Scoreboard onMainMenu={() => setScoreboardOpen(false)} />
            )}

            {settingsOpen && (
                <GameSettings
                    onClose={() => setSettingsOpen(false)}
                    musicVolume={musicVolume}
                    setMusicVolume={setMusicVolume}
                />
            )}
            {profileOpen && (
                <Profile
                    onClose={() => setProfileOpen(false)}
                    profileData={profileData}
                    setProfileData={setProfileData}
                />
            )}
            {/* Timer */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 px-6 py-2 rounded-full">
                <span className={`text-3xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-white'}`}>
                    {timeLeft}s
                </span>
            </div>

            {/* Battle Area */}
            <div className="w-full flex-1 flex justify-between items-center px-10 mt-4">
                {/* Player Character */}
                <div className="relative">
                    <img 
                        src={character} 
                        alt="Player" 
                        className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
                        style={{ transform: 'scaleX(1)' }} 
                    />
                    {playerAttacking && (
                        <img 
                            src={attackImage} 
                            alt="Player Attack" 
                            className="absolute top-1/2 -right-24 transform -translate-y-1/2 w-32 h-32"
                        />
                    )}
                </div>

                {/* Enemy Health Bar */}
                <div className="absolute top-40 left-1/2 transform bg-black bg-opacity-30 -translate-x-1/2 flex flex-col items-center">
                    <div className="text-white text-xl mb-2">{currentEnemy.name}</div>
                    <div className="w-64 h-4 bg-gray-700 rounded-full">
                        <div 
                            className="h-full bg-red-500 rounded-full transition-all duration-300"
                            style={{ width: `${(currentEnemyHealth / currentEnemy.health) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Enemy */}
                <div className="relative">
                    <img 
                        src={currentEnemyImage} 
                        alt={currentEnemy.name}
                        className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
                        style={{ transform: 'scaleX(-1)' }} 
                    />
                    {enemyAttacking && (
                        <img 
                            src={attackEnemyImage} 
                            alt="Enemy Attack" 
                            className="absolute top-1/2 -left-24 transform -translate-y-1/2 w-32 h-32"
                            style={{ transform: 'scaleX(-1)' }}
                        />
                    )}
                </div>
            </div>

            {/* Definition Display */}
            <div className="w-full p-2 text-center mt-auto">
                <div className="bg-white bg-opacity-75 rounded p-2 max-w-2xl mx-auto text-lg">
                    {definition || "Form a science term from the letters below!"}
                </div>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-5 gap-2 p-4 mb-16">
                {gridLetters.map((letter, index) => (
                    <button
                        key={index}
                        className={`w-16 h-16 text-2xl font-bold rounded-lg shadow-lg transform transition-all duration-200 ${
                            emptyIndices.includes(index)
                                ? 'bg-gray-200 text-gray-400 cursor-default'
                                : 'bg-white hover:scale-105 hover:bg-blue-100'
                        }`}
                        onClick={() => handleLetterClick(letter, index)}
                        disabled={emptyIndices.includes(index)}
                    >
                        {emptyIndices.includes(index) ? '' : letter}
                    </button>
                ))}
            </div>

            {/* Word Input */}
            <div className="absolute bottom-4 w-full flex justify-center items-center space-x-4">
                <div className="flex items-center space-x-1 px-3 py-2 min-w-[150px]">
                    {selectedLetters.map((letter, index) => (
                        <button
                            key={index}
                            className="w-10 h-10 text-xl font-bold bg-blue-500 text-white rounded-lg transform transition-all duration-200 hover:scale-110 hover:bg-blue-600"
                            onClick={() => handleRemoveLetter(index)}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
                <button
                    className="bg-blue-500 text-white px-2 py-1 flex justify-end rounded-lg text-lg hover:bg-blue-600 transform transition-transform hover:scale-105"
                    onClick={handleSubmitWord}
                >
                    Submit
                </button>
            </div>

            {/* Game Over Screen */}
            {gameOver && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center">
                    <h2 className="text-white text-4xl mb-4">Game Over!</h2>
                    <p className="text-white text-2xl mb-8">Final Score: {score}</p>
                    <button
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600"
                        onClick={onMainMenu}
                    >
                        Return to Main Menu
                    </button>
                </div>
            )}
        </div>
    );
};

export default MiniGame;
