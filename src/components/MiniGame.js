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
    const [isPaused, setIsPaused] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [scoreboardOpen, setScoreboardOpen] = useState(false); // State for scoreboard visibility
    const [selectedLetterIndex, setSelectedLetterIndex] = useState(-1);
    const [longestWord, setLongestWord] = useState('');
    const [showLongestWordScoreboard, setShowLongestWordScoreboard] = useState(false);

    const enemies = [
        { name: "Microbe", image: 'microbe.gif', health: 3 },
        { name: "Toxic Crawler", image: 'toxic_crawler.gif', health: 4 },
    ];

    // Map enemy image filenames to imported images
    const enemyImages = {
        'microbe.gif': microbeImage,
        'toxic_crawler.gif': toxinImage,
    };

    const currentEnemy = enemies[currentEnemyIndex % enemies.length];
    const currentEnemyImage = enemyImages[currentEnemy.image];

    const [usedWordsQueue, setUsedWordsQueue] = useState([]);
    const cooldownLimit = 3; // Adjust to allow reuse after 5 different words
    
    const getRandomScienceWord = () => {
        const words = Object.keys(scienceTerm);
        
        // Exclude words in cooldown
        let availableWords = words.filter(word => !usedWordsQueue.includes(word));
    
        // If all words are in cooldown, allow some words back in
        if (availableWords.length === 0) {
            setUsedWordsQueue(prev => prev.slice(Math.floor(cooldownLimit / 2))); 
            availableWords = words.filter(word => !usedWordsQueue.includes(word));
        }
    
        let longWords = availableWords.filter(word => word.length >= 5);
        let chosenWord = longWords.length > 0 
            ? longWords[Math.floor(Math.random() * longWords.length)] 
            : availableWords[Math.floor(Math.random() * availableWords.length)];
    
        // Add to cooldown and limit stored words
        setUsedWordsQueue(prev => [...prev, chosenWord].slice(-cooldownLimit));
    
        return chosenWord;
    };
    
// Function to generate a grid with a guaranteed word
const generateWordGrid = () => {
    let chosenWord;
    let validWordFound = false;

    for (let attempt = 0; attempt < 10; attempt++) { // Try up to 10 times
        chosenWord = getRandomScienceWord().toUpperCase();

        // Ensure the word is NOT in cooldown
        if (!usedWordsQueue.includes(chosenWord)) {
            validWordFound = true;
            break;
        }
    }

    if (!validWordFound) {
        return gridLetters; // Keep current grid if no valid words are found
    }

    let newGrid = Array(20).fill(''); // Empty grid
    let startIndex = Math.floor(Math.random() * (20 - chosenWord.length));

    for (let i = 0; i < chosenWord.length; i++) {
        newGrid[startIndex + i] = chosenWord[i];
    }

    const vowels = 'AEIOU_';
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ_';

    for (let i = 0; i < 20; i++) {
        if (newGrid[i] === '') {
            newGrid[i] = Math.random() < 0.4
                ? vowels.charAt(Math.floor(Math.random() * vowels.length))
                : consonants.charAt(Math.floor(Math.random() * consonants.length));
        }
    }

    return newGrid;
};

// Function to scramble a word and fill remaining spaces with random letters
const scrambleWord = (word) => {
    let letters = word.split('');

    // Fisher-Yates Shuffle for better randomness
    do {
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
    } while (letters.join('') === word); // Ensure it's different from the original word

    // Ensure good vowel-consonant balance when filling empty spaces
    const vowels = 'AEIOU';
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';

    let vowelCount = letters.filter(letter => vowels.includes(letter)).length;
    let consonantCount = letters.length - vowelCount;

    while (letters.length < 20) {
        let isVowel = Math.random() < 0.45; // 45% vowels, 55% consonants
        if (isVowel && vowelCount < 9) { // Limit vowels to 9 max
            letters.push(vowels.charAt(Math.floor(Math.random() * vowels.length)));
            vowelCount++;
        } else if (!isVowel && consonantCount < 11) { // Limit consonants to 11 max
            letters.push(consonants.charAt(Math.floor(Math.random() * consonants.length)));
            consonantCount++;
        }
    }

    return letters;
};

// Slidebar toggle function with pause functionality and countdown
const toggleSlidebar = () => {
    if (!slidebarOpen) {
        // Opening slidebar - pause immediately
        setSlidebarOpen(true);
        setIsPaused(true);
    } else {
        // Closing slidebar - close first, then start countdown
        setSlidebarOpen(false);
        setCountdown(3);
        setTimeout(() => {
            setCountdown(2);
            setTimeout(() => {
                setCountdown(1);
                setTimeout(() => {
                    setCountdown(0);
                    setIsPaused(false);
                }, 1500);
            }, 1500);
        }, 1500);
    }
};

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

// Initialize longest word from Firebase
useEffect(() => {
    if (auth.currentUser) {
        const db = getDatabase();
        const userRef = ref(db, `users/${auth.currentUser.uid}/longestWord`);
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.word) {
                setLongestWord(data.word);
            }
        });
    }
}, []);

// Timer effect
useEffect(() => {
    if (!showTutorial && !gameOver) {
        if (isPaused) return;

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

        return () => {
            clearInterval(timer);
        };
    }
}, [showTutorial, gameOver, isPaused]);

// Add a new effect to handle initial game setup
useEffect(() => {
    if (!showTutorial) {
        setTimeLeft(30); // Only reset timer when starting a new game
    }
}, [showTutorial]);

// Handle letter selection
const handleLetterClick = (letter, index) => {
    if (!isPaused && !emptyIndices.includes(index)) {
        setSelectedLetters(prev => [...prev, letter]);
        setEmptyIndices(prev => [...prev, index]);
    }
};

// Handle letter removal from word
const handleRemoveLetter = (letterIndex) => {
    if (!isPaused) {
        const originalIndex = emptyIndices[letterIndex];
        setSelectedLetters(prev => prev.filter((_, i) => i !== letterIndex));
        setEmptyIndices(prev => prev.filter((_, i) => i !== letterIndex));
    }
};

const handleSubmitWord = useCallback(() => {
    let scoreIncrement = 0; // Initialize score increment

    if (isPaused || gameOver) return;
    const word = selectedLetters.join('').toUpperCase();

    if (word.length === 0) return;

    // Prevent word spam - check if it's in cooldown
    if (usedWordsQueue.includes(word) && word.length >= 2) {
        setDefinition(`"${word}" is on cooldown! Use ${cooldownLimit} different words first.`);

        return; 
    }

    if (scienceTerm.hasOwnProperty(word)) { 
        // Valid word submitted
        setCurrentEnemyHealth(prevHealth => {
            const newHealth = prevHealth - 1;
            if (newHealth <= 0) {
                // Handle enemy defeat logic here if needed
            }
            return newHealth;
        });
        // Update the longest word only if the new word is longer
        if (word.length > longestWord.length) {
            setLongestWord(word);
            saveLongestWord(word);  // Save the longest word to Firebase
            setDefinition(`New longest word: "${word}"!`);
        } else {
            setDefinition(`"${word}" is a valid word.`);
        }
        
        // Calculate score based on the length of the valid word
        scoreIncrement = word.length * 10; // 10 points for each letter
        setScore(prevScore => prevScore + scoreIncrement); // Update score
    } else {
        // Invalid word submitted
        setEnemyAttacking(true);
        setDefinition(`Invalid word -1 Heart! The enemy attacks!`);

        setPlayerHearts(prev => {
            const newHearts = prev - 1;
            if (newHearts <= 0) {
                setGameOver(true);
                saveScore();
            }
            return Math.max(0, newHearts);
        });
    }

    // Add the word to the cooldown queue
    setUsedWordsQueue(prev => [...prev, word].slice(-cooldownLimit));
    
    // Reset selected letters after submission
    setTimeLeft(30); // Reset the timer
    setSelectedLetters([]);
    setEmptyIndices([]);

    // Regenerate the grid
    const newGrid = generateWordGrid();
    setGridLetters(newGrid);
}, [selectedLetters, longestWord, usedWordsQueue]);

const saveLongestWord = (word) => {
    if (auth.currentUser) {
        const db = getDatabase();
        const userRef = ref(db, `users/${auth.currentUser.uid}/longestWord`);
        // First check if there's an existing longest word
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const existingWord = data ? data.word : '';
            // Only save if the new word is longer than the existing one
            if (!existingWord || word.length > existingWord.length) {
                set(userRef, {
                    word: word,
                    timestamp: Date.now()
                });
            }
        }, { onlyOnce: true }); // Only read once, not continuously
    }
};

const handleScramble = () => {
    if (isPaused || gameOver) return; // Prevent scrambling during pause or game over

    if (playerHearts <= 1) {
        setDefinition("Scramble disabled! Too risky, you're low on health!");
        return; // Stop the function if the player has only 1 HP
    }

    setSelectedLetters([]); // Clear selected letters
    setEmptyIndices([]); // Reset empty letter spots

    // Apply penalty: Reduce player's health
    setPlayerHearts(prev => {
        const newHealth = prev - 1;
        if (newHealth <= 0) {
            setGameOver(true);
            saveScore();
        }
        return Math.max(0, newHealth);
    });

    // Generate a new scrambled grid but KEEP cooldown words
    let scrambledGrid;
    let validScramble = false;

    for (let attempt = 0; attempt < 10; attempt++) {
        scrambledGrid = generateWordGrid();
        let scrambledWord = scrambledGrid.join('').toUpperCase();

        if (!usedWordsQueue.includes(scrambledWord)) {
            validScramble = true;
            break;
        }
    }

    if (!validScramble) {
        setDefinition("Scramble failed: All words are in cooldown!");
        return;
    }

    setGridLetters(scrambledGrid);
    setDefinition("Letters scrambled! -1 Health as a penalty.");
};

// Save score to database
const saveScore = async () => {
    if (auth.currentUser) {
        try {
            const db = getDatabase();
            // Save the score under miniGameScores with proper validation format
            const scoreRef = ref(db, `users/${auth.currentUser.uid}/miniGameScores/${Date.now()}`);
            await set(scoreRef, {
                score: Math.max(0, score), // Ensure score is non-negative as per rules
                timestamp: Date.now() // Timestamp must be a number > 0
            });
        } catch (error) {
            console.error("Error saving score:", error);
        }
    }
};

// Handle keyboard input
const handleKeyPress = useCallback((event) => {
    // Handle Escape key for slidebar
    if (event.key === 'Escape') {
        setSlidebarOpen(prev => !prev);
        return;
    }

    if (isPaused || gameOver || showTutorial) return;

    const key = event.key.toUpperCase();
    
    // Handle letter selection
    if (/^[A-Z]$/.test(key)) {
        // Find the first available instance of the pressed letter
        const letterIndex = gridLetters.findIndex((letter, index) => 
            letter === key && !emptyIndices.includes(index)
        );
        
        if (letterIndex !== -1) {
            handleLetterClick(key, letterIndex);
        }
    }
    // Handle spacebar for underscore selection
    else if (event.key === ' ' || event.key === 'Spacebar') {
        const underscoreIndex = gridLetters.findIndex((letter, index) => 
            letter === '_' && !emptyIndices.includes(index)
        );
        
        if (underscoreIndex !== -1) {
            handleLetterClick('_', underscoreIndex);
        }
        event.preventDefault(); // Prevent page scrolling
    }
    // Handle backspace for letter removal
    else if (event.key === 'Backspace' && selectedLetters.length > 0) {
        if (selectedLetterIndex >= 0) {
            handleRemoveLetter(selectedLetterIndex);
            setSelectedLetterIndex(Math.min(selectedLetterIndex, selectedLetters.length - 2));
        } else {
            handleRemoveLetter(selectedLetters.length - 1);
        }
    }
    // Handle enter for word submission
    else if (event.key === 'Enter') {
        handleSubmitWord();
    }
    // Handle arrow keys for navigation
    else if (event.key === 'ArrowLeft') {
        setSelectedLetterIndex(prev => 
            prev <= 0 ? selectedLetters.length - 1 : prev - 1
        );
    }
    else if (event.key === 'ArrowRight') {
        setSelectedLetterIndex(prev => 
            prev >= selectedLetters.length - 1 ? 0 : prev + 1
        );
    }
     else if (event.key === 'Control') {
    handleScramble();
    }
}, [isPaused, gameOver, showTutorial, gridLetters, emptyIndices, selectedLetters, selectedLetterIndex]);

// Add keyboard event listener
useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
        window.removeEventListener('keydown', handleKeyPress);
    };
}, [handleKeyPress]);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-cover bg-center flex flex-col items-center"
    style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        userSelect: 'none'
    }}>
    
    {/* Tutorial Dialog */}
    {showTutorial && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 sm:p-8 rounded-lg max-w-md w-full text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Welcome to Mini Game!</h2>
                <p className="mb-6 text-sm sm:text-base">
                    After playing the adventure mode, let's test your vocabulary in science terms!
                    In this mode, there are no hints - you must rely on your knowledge.
                    Each grid contains at least one valid science term. Can you find it?
                </p>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-base sm:text-xl hover:bg-blue-600"
                    onClick={() => setShowTutorial(false)}
                >
                    Start Game
                </button>
            </div>
        </div>
    )}
    
    {/* Header */} 
    <div className="w-full flex justify-between items-center p-2 sm:p-4 bg-black bg-opacity-50">
        {/* Heart */}
        <div className="flex items-center">
            <img src={heartImage} alt="Heart" className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
            <span className="text-white text-base sm:text-2xl">{playerHearts}</span>
        </div>
        
        {/* Center Score */} 
        <div className="text-white text-base sm:text-2xl absolute left-1/2 transform -translate-x-1/2">
            Score: {score}
        </div>
        
        {/* Navigation */}                     
        <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="slidebar-icon text-base sm:text-2xl cursor-pointer" onClick={toggleSlidebar}>
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

    {/* Modals (Scoreboard, Settings, Profile) */}
    {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <GameSettings 
                onClose={() => setSettingsOpen(false)}
                onSave={(volume) => {
                    setMusicVolume(volume);
                    setSettingsOpen(false);
                }}
                musicVolume={musicVolume}
            />
        </div>
    )}
    {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Profile 
                onClose={() => setProfileOpen(false)}
                profileData={profileData}
                setProfileData={setProfileData}
            />
        </div>
    )}
    
    {/* Timer */}
    <div className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 px-4 sm:px-6 py-1 sm:py-2 rounded-full">
        <span className={`text-xl sm:text-3xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-white'}`}>
            {timeLeft}s
        </span>
    </div>

    {/* Battle Area */}
    <div className="w-full flex-1 flex justify-between items-center px-4 sm:px-10 mt-2 sm:mt-4 relative">
        {/* Player Character */}
        <div className="relative">
            <img 
                src={character} 
                alt="Player" 
                className="w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
                style={{ transform: 'scaleX(1)' }} 
            />
            {playerAttacking && (
                <img 
                    src={attackImage} 
                    alt="Player Attack" 
                    className="absolute top-1/2 -right-12 sm:-right-24 transform -translate-y-1/2 w-16 h-16 sm:w-32 sm:h-32"
                />
            )}
        </div>

        {/* Enemy Health Bar */}
        <div className="absolute top-24 sm:top-40 left-1/2 transform bg-black bg-opacity-30 -translate-x-1/2 flex flex-col items-center">
            <div className="text-white text-base sm:text-xl mb-1 sm:mb-2">{currentEnemy.name}</div>
            <div className="w-40 sm:w-64 h-2 sm:h-4 bg-gray-700 rounded-full">
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
                className="w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
                style={{ transform: 'scaleX(-1)' }} 
            />
            {enemyAttacking && (
                <img 
                    src={attackEnemyImage} 
                    alt="Enemy Attack" 
                    className="absolute top-1/2 -left-12 sm:-left-24 transform -translate-y-1/2 w-16 h-16 sm:w-32 sm:h-32"
                    style={{ transform: 'scaleX(-1)' }}
                />
            )}
        </div>
    </div>

    {/* Definition Display */}
    <div className="w-full p-2 text-center mt-auto">
        <div className="bg-white bg-opacity-75 rounded p-2 max-w-2xl mx-auto text-sm sm:text-lg">
            {definition || "Form a science term from the letters below!"}
        </div>
    </div>

    {/* Game Grid */}
    <div className="grid grid-cols-5 gap-1 sm:gap-2 p-2 sm:p-4 mb-8 sm:mb-16">
        {gridLetters.map((letter, index) => (
            <button
                key={index}
                className={`w-12 h-12 sm:w-16 sm:h-16 text-base sm:text-2xl font-bold rounded-lg shadow-lg transform transition-all duration-200 ${
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
    <div className="absolute bottom-4 w-full flex justify-center items-center space-x-2 sm:space-x-4 px-4">
        <div className="flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-2 min-w-[120px] sm:min-w-[150px]">
            {selectedLetters.map((letter, index) => (
                <div
                    key={index}
                    onClick={() => handleRemoveLetter(index)}
                    className={`selected-letter cursor-pointer w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center 
                        text-base sm:text-xl font-bold rounded-lg bg-white border-2 
                        ${index === selectedLetterIndex ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                >
                    {letter}
                </div>
            ))}
        </div>
        
        {/* Scramble Button */}
        <button
            className="bg-purple-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-base sm:text-lg font-bold hover:bg-purple-600 transform transition-transform hover:scale-105"
            onClick={handleScramble}
        >
            Scramble
        </button>
        
        <button
            className="bg-blue-500 text-white px-2 py-1 sm:px-2 sm:py-1 flex justify-end rounded-lg text-base sm:text-lg hover:bg-blue-600 transform transition-transform hover:scale-105"
            onClick={handleSubmitWord}
        >
            Submit
        </button>
    </div>

    {/* Countdown Screen */}
    {countdown > 0 && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="text-white text-6xl sm:text-9xl font-bold animate-bounce">
                {countdown}
            </div>
        </div>
    )}

    {/* Game Over Screen */}
    {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center p-4">
            <h2 className="text-white text-2xl sm:text-4xl mb-4 text-center">Game Over!</h2>
            <p className="text-white text-xl sm:text-2xl mb-8 text-center">Final Score: {score}</p>
            <button
                className="bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-base sm:text-xl hover:bg-blue-600"
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
