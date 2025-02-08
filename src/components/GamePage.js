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

const GamePage = ({ onMainMenu, profileData, setProfileData, onLogout, musicVolume, setMusicVolume, level }) => {
    const [enemyLaserActive, setEnemyLaserActive] = useState(false);
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [gridLetters, setGridLetters] = useState(generateRandomLetters());
    const [definition, setDefinition] = useState('Definition shows here when you enter right');
    const [emptyIndices, setEmptyIndices] = useState([]);
    const [slidebarOpen, setSlidebarOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [playerHearts, setPlayerHearts] = useState(3);
    const [laserActive, setLaserActive] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const closeDialog = () => setDialogVisible(false);
    const [hint, setHint] = useState('');
    const [hintsRemaining, setHintsRemaining] = useState(2);
    const [highlightedIndices, setHighlightedIndices] = useState([]);

    const [currentEnemy, setCurrentEnemy] = useState(level?.enemy);
    const [enemyHearts, setEnemyHearts] = useState(level?.enemy?.health || 0);

    const isValidWord = selectedLetters.length > 0 && scienceTerm[selectedLetters.join('').toUpperCase()];
    const [isValidWordState, setIsValidWord] = useState(false);

    const [victoryVisible, setVictoryVisible] = useState(false);
    const [defeatVisible, setDefeatVisible] = useState(false);

    // Status Effects States
    const [enemyStatusEffects, setEnemyStatusEffects] = useState({
        poison: 0,    // Turns remaining
        bleed: 0,     // Damage multiplier
        exhaust: 0,   // Turns remaining
        burn: 0,      // Seconds remaining
        blind: 0      // Turns remaining
    });
    const [letterEffects, setLetterEffects] = useState(Array(20).fill(null));

    useEffect(() => {
        console.log('Current word count:', selectedLetters.length);
    }, [selectedLetters]);

    // Status effect colors with glow
    const effectStyles = {
        poison: "text-green-500 bg-green-100 shadow-[0_0_10px_#22c55e]",
        bleed: "text-red-500 bg-red-100 shadow-[0_0_10px_#ef4444]",
        exhaust: "text-yellow-500 bg-yellow-100 shadow-[0_0_10px_#eab308]",
        burn: "text-orange-500 bg-orange-100 shadow-[0_0_10px_#f97316]",
        blind: "text-gray-100 bg-gray-900 shadow-[0_0_10px_#111827]"
    };

    useEffect(() => {
        if (level?.enemy) {
            setCurrentEnemy(level.enemy);
            setEnemyHearts(level.enemy.health);
            setDialogMessage(level.enemy.dialog);
            setDialogVisible(true);
            // Reset hints for new level
            setHintsRemaining(2);
            setHighlightedIndices([]);
            setHint('');
            // Reset other game states
            setSelectedLetters([]);
            setEmptyIndices([]);
            setGridLetters(generateRandomLetters());
            setIsValidWord(false);
        }
    }, [level]);

    useEffect(() => {
        if (currentEnemy) {
            setDialogMessage(currentEnemy.dialog);
            setDialogVisible(true);
        }
    }, [currentEnemy]);

    useEffect(() => {
        const interval = setInterval(() => {
            setEnemyStatusEffects(prev => {
                const newEffects = { ...prev };
                
                // Process poison (0.5 damage per turn)
                if (newEffects.poison > 0) {
                    setEnemyHearts(h => Math.max(0, h - 0.5));
                    newEffects.poison--;
                }
                
                // Process burn (0.1 damage every second)
                if (newEffects.burn > 0) {
                    setEnemyHearts(h => Math.max(0, h - 0.1));
                    newEffects.burn--;
                }
                
                // Decrease other effect durations
                if (newEffects.exhaust > 0) newEffects.exhaust--;
                if (newEffects.blind > 0) newEffects.blind--;
                
                return newEffects;
            });
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    const addRandomEffect = () => {
        console.log('Checking for effect addition, word length:', selectedLetters.length);
        if (selectedLetters.length >= 2) {
            const effects = ['poison', 'bleed', 'exhaust', 'burn', 'blind'];
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            
            // Get available spots (those with letters but no effects)
            const availableSpots = gridLetters.map((letter, i) => ({letter, index: i}))
                .filter(({letter, index}) => letter !== '' && !letterEffects[index]);
            
            console.log('Available spots for effects:', availableSpots.length);
            
            if (availableSpots.length > 0) {
                const randomSpot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
                const newEffects = [...letterEffects];
                newEffects[randomSpot.index] = randomEffect;
                
                console.log('Adding effect:', randomEffect, 'at position:', randomSpot.index);
                
                setLetterEffects(newEffects);
                
                // Show feedback about the new effect
                setDefinition(prev => 
                    `${prev}\n\nNew ${randomEffect.toUpperCase()} effect added to a letter! Find it in the grid.`
                );
            }
        }
    };

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

        const emptyIndex = emptyIndices[index];
        if (emptyIndex !== undefined) {
            const newGridLetters = [...gridLetters];
            newGridLetters[emptyIndex] = letter;
            setGridLetters(newGridLetters);

            const newEmptyIndices = [...emptyIndices];
            newEmptyIndices.splice(index, 1);
            setEmptyIndices(newEmptyIndices);
        }
        
        setIsValidWord(false);
    };

    const handleScramble = () => {
        // Generate new grid letters with guaranteed valid word
        const newGridLetters = generateRandomLetters();
        
        // Reset all states
        setSelectedLetters([]);
        setEmptyIndices([]);
        setGridLetters(newGridLetters);
        setIsValidWord(false);
        setHighlightedIndices([]); // Clear highlights on scramble
        handleEnemyAttack();
    };

    const handleHint = () => {
        if (hintsRemaining <= 0) {
            setHint('No hints remaining for this level!');
            return;
        }

        const gridLettersString = gridLetters.join('');
        const possibleWords = Object.keys(scienceTerm).filter((word) =>
            word.split('').every((char) => 
                gridLettersString.split('').filter(c => c === char).length >= 
                word.split('').filter(c => c === char).length
            )
        );

        if (possibleWords.length > 0) {
            // Sort words by length (prefer shorter words for hints)
            const sortedWords = possibleWords.sort((a, b) => a.length - b.length);
            const hintWord = sortedWords[0];
            
            // Find indices of the hint word letters in the grid
            const newHighlightedIndices = [];
            const hintLetters = hintWord.split('');
            const gridLettersCopy = [...gridLetters];
            
            hintLetters.forEach(letter => {
                const index = gridLettersCopy.findIndex(l => l === letter);
                if (index !== -1) {
                    newHighlightedIndices.push(index);
                    gridLettersCopy[index] = ''; // Mark as used
                }
            });

            setHighlightedIndices(newHighlightedIndices);
            setHintsRemaining(prev => prev - 1);
            setHint(`Hints remaining: ${hintsRemaining - 1}`);

            // Clear highlight after 3 seconds
            setTimeout(() => {
                setHighlightedIndices([]);
            }, 3000);
        } else {
            setHint('No possible words found. Try scrambling!');
        }
    };

    const handleEnemyAttack = () => {
        if (enemyLaserActive) return;
        
        // Check if blind effect prevents attack (75% chance)
        if (enemyStatusEffects.blind > 0 && Math.random() < 0.75) {
            setDefinition('Enemy attack missed due to blind effect!');
            return;
        }
        
        setEnemyLaserActive(true);
        setTimeout(() => {
            let damage = 1;
            // Apply exhaust effect (-50% damage)
            if (enemyStatusEffects.exhaust > 0) {
                damage *= 0.5;
            }
            
            setPlayerHearts((prev) => {
                const newHeartCount = Math.max(0, prev - damage);
                if (newHeartCount === 0) {
                    setDefeatVisible(true);
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
            const term = scienceTerm[word.toUpperCase()];
            setDefinition(
                `${term.category}: ${term.definition} 
                [Source: ${term.source}] [Learn More](${term.link})`
            );
            
            // Apply bleed multiplier
            if (enemyStatusEffects.bleed > 0) {
                damage *= (1 + (0.2 * enemyStatusEffects.bleed));
            }
            
            const updatedHearts = Math.max(0, enemyHearts - damage);
            setEnemyHearts(updatedHearts);

            // Check for letter effects in the word
            const usedEffects = selectedLetters.map((_, i) => letterEffects[emptyIndices[i]]);
            
            // Apply effects from used letters
            usedEffects.forEach(effect => {
                if (effect) {
                    switch(effect) {
                        case 'poison':
                            setEnemyStatusEffects(prev => ({ ...prev, poison: prev.poison + 3 }));
                            break;
                        case 'bleed':
                            damage *= 1.5;
                            setEnemyStatusEffects(prev => ({ ...prev, bleed: prev.bleed + 1 }));
                            break;
                        case 'exhaust':
                            setEnemyStatusEffects(prev => ({ ...prev, exhaust: prev.exhaust + 2 }));
                            break;
                        case 'burn':
                            setEnemyStatusEffects(prev => ({ ...prev, burn: prev.burn + 5 }));
                            break;
                        case 'blind':
                            setEnemyStatusEffects(prev => ({ ...prev, blind: prev.blind + 2 }));
                            break;
                    }
                }
            });

            // Add effect to a remaining letter if word is 4 or more letters
            if (word.length >= 4) {
                const effects = ['poison', 'bleed', 'exhaust', 'burn', 'blind'];
                const randomEffect = effects[Math.floor(Math.random() * effects.length)];
                
                // Get unused letters that don't have effects
                const unusedIndices = gridLetters
                    .map((letter, i) => ({ letter, index: i }))
                    .filter(({letter, index}) => 
                        letter !== '' && 
                        !emptyIndices.includes(index) && 
                        !letterEffects[index]
                    );
                
                if (unusedIndices.length > 0) {
                    const randomSpot = unusedIndices[Math.floor(Math.random() * unusedIndices.length)];
                    const newEffects = [...letterEffects];
                    newEffects[randomSpot.index] = randomEffect;
                    setLetterEffects(newEffects);
                    
                    // Show feedback about the new effect
                    setDefinition(prev => 
                        `${prev}\n\nNew ${randomEffect.toUpperCase()} effect added to a letter! Find it in the grid.`
                    );
                }
            }

            if (updatedHearts === 0) {
                setVictoryVisible(true);
                setHintsRemaining(2);
                setHighlightedIndices([]);
                setHint('');
            }
        } else {
            setDefinition('Invalid word. Please try again.');
            const updatedPlayerHearts = Math.max(0, playerHearts - damage);
            setPlayerHearts(updatedPlayerHearts);
            handleEnemyAttack();
            if (updatedPlayerHearts === 0) {
                setDefeatVisible(true);
            }
        }

        // Clear used letters but keep their effects in letterEffects array
        const newGridLetters = [...gridLetters];
        emptyIndices.forEach(index => {
            newGridLetters[index] = '';
        });

        // Generate new letters only for empty spots, keeping effects
        const filledGrid = generateRandomLetters(newGridLetters, letterEffects);
        
        setLaserActive(true);
        setTimeout(() => setLaserActive(false), 500);
        setSelectedLetters([]);
        setEmptyIndices([]);
        setGridLetters(filledGrid);
    };

    const handleNextLevel = () => {
        // Keep existing letters and effects, just fill in empty spots
        const newGridLetters = generateRandomLetters(gridLetters, letterEffects);
        
        // Reset game state but keep letter effects
        setPlayerHearts(3);
        setSelectedLetters([]);
        setEmptyIndices([]);
        setGridLetters(newGridLetters);
        setVictoryVisible(false);

        // Reset enemy status effects for new enemy
        setEnemyStatusEffects({
            poison: 0,
            bleed: 0,
            exhaust: 0,
            burn: 0,
            blind: 0
        });

        // Get next enemy from the level's map data
        if (level?.selectedMap?.enemies) {
            const currentEnemyIndex = level.selectedMap.enemies.findIndex(
                enemy => enemy.name === currentEnemy.name
            );
            
            if (currentEnemyIndex !== -1 && currentEnemyIndex < level.selectedMap.enemies.length - 1) {
                // There is a next enemy in this map
                const nextEnemy = level.selectedMap.enemies[currentEnemyIndex + 1];
                setCurrentEnemy(nextEnemy);
                setEnemyHearts(nextEnemy.health || 3);
                setDialogMessage(nextEnemy.dialog || `${nextEnemy.name} appears!`);
                setDialogVisible(true);
            } else {
                // No more enemies in this map, go back to main menu
                onMainMenu();
            }
        } else {
            // No enemies data, go back to main menu
            onMainMenu();
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
        setEnemyHearts(level.enemy.health);
        setSelectedLetters([]); // Reset selected letters
        setGridLetters(generateRandomLetters()); // Generate new random letters
        setEmptyIndices([]); // Reset empty indices
        setDefeatVisible(false);
        setHint(''); // Optionally reset hint as well
    };

    const handleSettingsSave = (newMusicVolume) => {
        setMusicVolume(newMusicVolume); 
        setSettingsOpen(false); 
    };

    const handleSettingsReset = () => {
        setMusicVolume(50); 
    };

    //Word Box
    function generateRandomLetters(existingLetters = [], existingEffects = []) {
        // Get a random science term
        const scienceTerms = Object.keys(scienceTerm);
        const randomTerm = scienceTerms[Math.floor(Math.random() * scienceTerms.length)];
        
        // Convert the term to an array of letters
        const termLetters = randomTerm.split('');
        
        // Calculate remaining slots after keeping existing letters
        const remainingSlots = 20 - existingLetters.filter(l => l !== '').length;
        
        // Generate random letters for remaining slots
        const vowels = 'AEIOU';
        const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
        const additionalLetters = Array.from({ length: remainingSlots }, () => 
            Math.random() < 0.4
                ? vowels.charAt(Math.floor(Math.random() * vowels.length))
                : consonants.charAt(Math.floor(Math.random() * consonants.length))
        );
        
        // Create new grid keeping existing letters and effects
        const newGrid = [...existingLetters];
        let additionalIndex = 0;
        
        for (let i = 0; i < 20; i++) {
            if (newGrid[i] === '' || newGrid[i] === undefined) {
                newGrid[i] = additionalLetters[additionalIndex++];
            }
        }
        
        return newGrid;
    }

    return (
        <div
            className="game-container relative h-screen w-full flex flex-col items-center justify-between p-4 md:p-6 lg:p-8"
            style={{
                backgroundImage: level?.selectedMap?.background ? 
                    `url(${require(`../assets/${level.selectedMap.background}`)})` : 
                    'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <style>
                {`
                @keyframes shoot {
                    0% {
                        transform: translateX(0) translateY(-50%);
                    }
                    100% {
                        transform: translateX(calc(50vw - 100%)) translateY(-50%);
                    }
                }
                @keyframes enemyShoot {
                    0% {
                        transform: translateX(0) translateY(-50%);
                    }
                    100% {
                        transform: translateX(calc(50vw - 100%)) translateY(-50%);
                    }
                }
                `}
            </style>

            {/* Top Bar */}
            <div className="w-full flex justify-between items-center mb-4">
                {/* Left Side */}
                <div className="flex items-center space-x-4">
                    <div className="slidebar-icon text-2xl cursor-pointer" onClick={toggleSlidebar}>
                        <Cross toggled={slidebarOpen} toggle={toggleSlidebar} />
                    </div>
                    <div className="player-info flex items-center bg-[#f4d9a3] p-2 border-2 border-black rounded-lg">
                        <img
                            src={profileData.image || "https://64.media.tumblr.com/ea445b7825d5c355924d801b4633887f/4b78abb807e9ea7b-3b/s400x600/c4f8f149cc53b279fb69dddad35c1c0db9a56e9b.png"}
                            alt="Player Avatar"
                            className="w-8 h-8 rounded-full object-cover mr-2"
                        />
                        <div className="hearts flex">
                            {[...Array(playerHearts)].map((_, i) => (
                                <img key={i} src={heartImage} alt="Heart" className="w-4 h-4 ml-1" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="player-info flex items-center bg-[#f4d9a3] p-2 border-2 border-black rounded-lg">
                    <img
                        src="https://pbs.twimg.com/profile_images/1617590113252278277/SaQY2ovq_400x400.png"
                        alt="Enemy Avatar"
                        className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <div className="hearts flex">
                        {[...Array(enemyHearts)].map((_, i) => (
                            <img key={i} src={heartImage} alt="Heart" className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Game Content */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-4 mb-4">
                {/* Player Character */}
                <div className="character-container relative w-full md:w-1/3">
                    <div
                        className={`character w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-contain bg-no-repeat transition-transform duration-300 mx-auto ${
                            laserActive ? "transform scale-110" : ""
                        }`}
                        style={{ backgroundImage: `url(${character})` }}
                    >
                        {laserActive && (
                            <img
                                src={attackImage}
                                alt="laser"
                                className="absolute top-1/2 left-full transform -translate-y-1/2"
                                style={{
                                    animation: "shoot 0.5s linear forwards",
                                    height: "6rem",
                                    width: "auto"
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* Word Box */}
                <div className="word-box flex flex-wrap justify-center gap-2 w-full md:w-1/3">
                    {selectedLetters.map((letter, index) => (
                        <div
                            key={index}
                            className="w-12 h-12 bg-[#f4d9a3] border-2 border-black flex items-center justify-center text-2xl font-bold rounded-lg cursor-pointer hover:bg-[#e5c8a1]"
                            onClick={() => handleSelectedLetterClick(letter, index)}
                        >
                            {letter}
                        </div>
                    ))}
                </div>

                {/* Enemy Character */}
                <div className="enemy-container relative w-full md:w-1/3">
                    <div
                        className={`enemy w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-contain bg-no-repeat mx-auto`}
                        style={{ 
                            backgroundImage: currentEnemy?.image ? 
                                `url(${require(`../assets/${currentEnemy.image}`)})` : 
                                'none',
                            transform: 'scaleX(-1)'
                        }}
                    >
                        {enemyLaserActive && (
                            <img
                                src={attackEnemyImage}
                                alt="enemy-laser"
                                className="absolute top-1/2 right-full transform -translate-y-1/2 rotate-180"
                                style={{
                                    animation: "enemyShoot 0.5s linear forwards",
                                    height: "6rem",
                                    width: "auto"
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Content */}
            <div className="game-content w-[95%] max-w-[1400px] grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-4 border-black rounded-lg bg-opacity-90 mb-4"
                style={{ 
                    backgroundImage: `url(${functionBackground})`,
                    height: '35vh'
                }}>
                
                {/* Description Box */}
                <div className="description-box bg-[#f4d9a3] border-2 border-black p-4 rounded-lg mb-3 h-64 overflow-y-auto">
                    <div 
                        className="prose prose-base"
                        dangerouslySetInnerHTML={{ 
                            __html: definition.replace(
                                /\[([^\]]+)\]\(([^)]+)\)/g, 
                                '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline font-medium">$1</a>'
                            ).replace(/\n/g, '<br/>')
                        }}
                    />
                    {!definition && (
                        <p className="text-base text-gray-600">
                            {mapData[currentEnemy?.map]?.description || "Form a word to see its definition!"}
                        </p>
                    )}
                </div>

                {/* Letter Grid */}
                <div className="letter-grid grid grid-cols-4 gap-1.5 bg-[#f4d9a3] border-2 border-black p-3 rounded-lg place-items-center">
                    {gridLetters.map((letter, index) => (
                        <div
                            key={index}
                            className={`grid-letter w-10 h-10 md:w-12 md:h-12 border-2 border-black flex items-center justify-center text-lg md:text-xl font-bold cursor-pointer transition-all duration-300 rounded-lg
                                ${highlightedIndices.includes(index) ? 'bg-yellow-300 scale-110' : 'hover:bg-[#e5c8a1]'}
                                ${letterEffects[index] ? effectStyles[letterEffects[index]] : 'bg-[#f4d9a3]'}`}
                            onClick={() => handleLetterClick(letter, index)}
                        >
                            {letter}
                        </div>
                    ))}
                </div>

                {/* Right Side Controls */}
                <div className="flex flex-col space-y-1.5">
                    {/* Enemy Stats */}
                    <div className="enemy-stats bg-[#f4d9a3] border-2 border-black p-2 rounded-lg">
                        <div className="level-info">
                            <h3 className="text-base font-bold truncate">
                                {currentEnemy?.name || mapLibrary[level?.selectedMap?.id]?.name || "Unknown Enemy"}
                            </h3>
                            <p className="text-xs truncate"><strong>Weakness:</strong> {currentEnemy?.stats?.weakness}</p>
                            <p className="text-xs truncate"><strong>Strength:</strong> {currentEnemy?.stats?.strength}</p>
                        </div>
                        <div className="mt-1">
                            <strong className="text-xs">Attacks:</strong>
                            <ul className="text-xs">
                                {currentEnemy?.attacks?.slice(0, 2).map((attack, index) => (
                                    <li key={index} className="truncate">
                                        <strong>{attack.name}:</strong> {attack.damage} damage
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons flex flex-col space-y-1.5">
                        <button
                            className={`bg-[#f4d9a3] border-2 border-black py-1.5 text-center text-sm rounded-lg transition-colors ${
                                !isValidWord ? "opacity-50 cursor-not-allowed" : "hover:bg-[#e5c8a1]"
                            }`}
                            onClick={handleAttack}
                            disabled={!isValidWord}
                        >
                            ATTACK
                        </button>

                        <div className="hint-box bg-[#ffebc4] border-2 border-black py-1.5 text-center rounded-lg">
                            <p className="text-xs truncate">{hint || `Hints remaining: ${hintsRemaining}`}</p>
                        </div>

                        <button
                            className={`hint-button bg-[#f4d9a3] border-2 border-black py-1.5 text-sm rounded-lg transition-colors ${
                                hintsRemaining > 0 ? 'hover:bg-[#e5c8a1]' : 'opacity-50 cursor-not-allowed'
                            }`}
                            onClick={handleHint}
                            disabled={hintsRemaining <= 0}
                        >
                            HINT
                        </button>

                        <button
                            className="scramble-button bg-[#f4d9a3] border-2 border-black py-1.5 text-sm rounded-lg hover:bg-[#e5c8a1] transition-colors"
                            onClick={handleScramble}
                        >
                            SCRAMBLE
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {settingsOpen && (
                <GameSettings
                    onClose={() => setSettingsOpen(false)}
                    onSave={handleSettingsSave}
                    onReset={handleSettingsReset}
                    musicVolume={musicVolume}
                />
            )}
            {profileOpen && (
                <Profile
                    onClose={() => setProfileOpen(false)}
                    onSave={() => setProfileOpen(false)}
                    profileData={profileData}
                    setProfileData={setProfileData}
                />
            )}

            {/* Victory Dialog */}
            {victoryVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#f4d9a3] border-4 border-black p-6 rounded-lg text-center max-w-sm w-full">
                        <h2 className="text-3xl font-bold mb-4">Victory!</h2>
                        <p className="text-xl mb-6">You defeated {currentEnemy?.name}!</p>
                        <div className="space-y-3">
                            <button
                                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-600 transition-colors"
                                onClick={handleNextLevel}
                            >
                                Next Level
                            </button>
                            <button
                                className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-blue-600 transition-colors"
                                onClick={() => {
                                    setVictoryVisible(false);
                                    onMainMenu();
                                }}
                            >
                                Back to Main Menu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Defeat Dialog */}
            {defeatVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#f4d9a3] border-4 border-black p-6 rounded-lg text-center max-w-sm w-full">
                        <h2 className="text-3xl font-bold mb-4">Defeat!</h2>
                        <p className="text-xl mb-6">You have been defeated!</p>
                        <div className="space-y-3">
                            <button
                                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-600 transition-colors"
                                onClick={handleTryAgain}
                            >
                                Try Again
                            </button>
                            <button
                                className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-blue-600 transition-colors"
                                onClick={() => {
                                    setDefeatVisible(false);
                                    onMainMenu();
                                }}
                            >
                                Back to Main Menu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Dialog Box */}
            {dialogVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#f4d9a3] border-4 border-black p-6 rounded-lg text-center max-w-sm w-full">
                        {currentEnemy?.image && (
                            <img
                                src={require(`../assets/${currentEnemy.image}`)}
                                alt={currentEnemy.name}
                                className="w-32 h-32 object-contain mx-auto mb-4"
                            />
                        )}
                        <p className="text-lg mb-4">{dialogMessage}</p>
                        <button
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-bold hover:bg-blue-600 transition-colors"
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
        </div>
    );
};

export default GamePage;
