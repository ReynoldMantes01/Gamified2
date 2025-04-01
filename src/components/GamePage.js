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
import characterAttack from '../assets/attack/newchar_attack.gif';
import characterIdle from '../assets/attack/mc_idle.gif';
import functionBackground from '../assets/try.gif';
import mapLibrary from '../components/maps.json';
import mapData from './maps.json';
import { auth } from '../firebase/config';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import hitSound from '../assets/SFX/hit.wav'; // Import hit sound effect
import winSound from '../assets/SFX/win.wav'; // Import win sound effect
import loseSound from '../assets/SFX/lose.wav'; // Import lose sound effect
import hintSound from '../assets/SFX/hint.wav'; // Import hint sound effect
import scrambleSound from '../assets/SFX/scramble.wav'; // Import scramble sound effect
import fightSound from '../assets/SFX/fightsound.wav'; // Import fight sound effect
import FunFact from './FunFact';
import useFunFact from '../hooks/useFunFact';

const GamePage = ({ onMainMenu, profileData, setProfileData, onLogout, musicVolume, setMusicVolume, soundEffectsVolume, backgroundVolume, level, reload, bossFight, setBossFight, fightSoundPlaying, setFightSoundPlaying }) => {
    const [enemyLaserActive, setEnemyLaserActive] = useState(false);
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [gridLetters, setGridLetters] = useState([]);
    const [userProgress, setUserProgress] = useState(null);
    const [definition, setDefinition] = useState({ text: 'Definition shows here when you enter right', source: '' });
    const [emptyIndices, setEmptyIndices] = useState([]);
    const [slidebarOpen, setSlidebarOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [playerHearts, setPlayerHearts] = useState(4);
    const [laserActive, setLaserActive] = useState(false);
    const [isCharacterAttacking, setIsCharacterAttacking] = useState(false);
    const [isCharacterIdle, setIsCharacterIdle] = useState(false);
    const [scrambleCooldown, setScrambleCooldown] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogSequence, setDialogSequence] = useState([]);
    const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
    const [showTutorial, setShowTutorial] = useState(true);
    const [tutorialStep, setTutorialStep] = useState(0);
    const closeDialog = () => setDialogVisible(false);
    const [hint, setHint] = useState('');
    const [hintsRemaining, setHintsRemaining] = useState(2);
    const [highlightedIndices, setHighlightedIndices] = useState([]);
    const [currentAvatar, setCurrentAvatar] = useState(profileData?.selectedAvatar);
    const [selectedLetterIndex, setSelectedLetterIndex] = useState(-1);
    const [currentWorldBackground, setCurrentWorldBackground] = useState('Bio_World.gif');
    const [gameCleared, setGameCleared] = useState(false);

    const { showFunFact, showFunFactWithDelay } = useFunFact();

    useEffect(() => {
        const fetchPlayerHealth = async () => {
            if (auth.currentUser) {
                const db = getDatabase();
                const userRef = ref(db, `users/${auth.currentUser.uid}/health`);
                try {
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        setPlayerHearts(4); // Load health from Firebase
                    } else {
                        setPlayerHearts(4); // Default value if no health is found
                    }
                } catch (error) {
                    console.error("Error loading player health:", error);
                    setPlayerHearts(4); // Fallback to default value on error
                }
            }
        };
        fetchPlayerHealth();
    }, []);

    // Initialize enemy progression from maps.json
    const [enemyProgression, setEnemyProgression] = useState([]);

    // Load enemy progression from maps.json
    useEffect(() => {
        // Extract all enemies from all maps in order
        const progression = [];
        mapData.maps.forEach(map => {
            map.enemies.forEach(enemy => {
                progression.push(enemy);
            });
        });
        setEnemyProgression(progression);
        console.log("Enemy progression loaded:", progression.map(e => e.id));
    }, []);

    // World unlocking conditions (3 enemies per world)
    const enemiesPerWorld = 3;

    // Add real-time listener for profile updates
    useEffect(() => {
        if (auth.currentUser) {
            const db = getDatabase();
            const profileRef = ref(db, `users/${auth.currentUser.uid}/profile`);

            const unsubscribe = onValue(profileRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    if (data.selectedAvatar) {
                        setCurrentAvatar(data.selectedAvatar);
                    }
                }
            });

            return () => unsubscribe();
        }
    }, []);

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

    useEffect(() => {
        if (isValidWord) {
            const word = selectedLetters.join('').toUpperCase();
            const termInfo = scienceTerm[word];
            setDefinition({
                text: termInfo.definition,
                source: termInfo.source
            });
        }
    }, [selectedLetters, isValidWord]);

    // Status effect colors with glow
    const effectStyles = {
        poison: "text-green-500 bg-green-100 shadow-[0_0_10px_#22c55e]",
        bleed: "text-red-500 bg-red-100 shadow-[0_0_10px_#ef4444]",
        exhaust: "text-yellow-500 bg-yellow-100 shadow-[0_0_10px_#eab308]",
        burn: "text-orange-500 bg-orange-100 shadow-[0_0_10px_#f97316]",
        blind: "text-gray-100 bg-gray-900 shadow-[0_0_10px_#111827]"
    };

    // Function to play sound effect
    const playHitSound = () => {
        const sound = new Audio(hitSound);
        sound.volume = soundEffectsVolume / 100; // Use sound effects volume
        sound.play();
    };

    // Function to play win sound effect
    const playWinSound = () => {
        const sound = new Audio(winSound);
        sound.volume = soundEffectsVolume / 100; // Use sound effects volume
        sound.play();
    };

    // Function to play lose sound effect
    const playLoseSound = () => {
        const sound = new Audio(loseSound);
        sound.volume = soundEffectsVolume / 100; // Use sound effects volume
        sound.play();
    };

    // Function to play hint sound effect
    const playHintSound = () => {
        const sound = new Audio(hintSound);
        sound.volume = soundEffectsVolume / 100; // Use sound effects volume
        sound.play();
    };

    // Function to play scramble sound effect
    const playScrambleSound = () => {
        const sound = new Audio(scrambleSound);
        sound.volume = soundEffectsVolume / 100; // Use sound effects volume
        sound.play();
    };

    // Function to play fight sound effect
    const playFightSound = () => {
        const sound = new Audio(fightSound);
        sound.volume = backgroundVolume / 100; // Use background volume for fight sound
        sound.play();
    };

    useEffect(() => {
        if (level?.enemy) {
            setCurrentEnemy(level.enemy);
            setEnemyHearts(level.enemy.health);

            // Check if current enemy is a boss and update bossFight state
            const isBoss = level.enemy.id.includes('_boss');
            setBossFight(isBoss);
            
            // Set fight sound playing for normal enemies
            if (!isBoss) {
                setFightSoundPlaying(true);
            }

            // Set dialog sequence based on level
            if (level.levelNumber === 1) {
                setShowTutorial(true);
                setTutorialStep(0);
                setDialogVisible(true);
            } else {
                const enemyDialogs = [
                    `Ah, a new challenger approaches! I am ${level.enemy.name}, master of ${level.enemy.stats.strength}!`,
                    level.enemy.dialog,
                    "Prepare yourself for a battle of scientific wit!"
                ];
                setDialogSequence(enemyDialogs);
                setCurrentDialogIndex(0);
                setDialogVisible(true);
            }

            // Reset hints for new level
            setHintsRemaining(3);
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

    useEffect(() => {
        if (!isCharacterAttacking) {
            const idleAnimationInterval = setInterval(() => {
                setIsCharacterIdle(true);
                setTimeout(() => {
                    setIsCharacterIdle(false);
                }, 2000); // Show idle animation for 2 seconds
            }, 10000); // Play idle animation every 10 seconds
            
            return () => clearInterval(idleAnimationInterval);
        }
    }, [isCharacterAttacking]);

    const handleGameOver = async (isVictory) => {
        console.log("Game over with victory:", isVictory);

        if (isVictory) {
            // Play victory sound
            playWinSound();
            
            console.log("Victory! Updating user progress for enemy:", currentEnemy?.id);

            if (auth.currentUser) {
                // Update user progress when enemy is defeated
                await updateUserProgress(currentEnemy);

                // Increase player health
                setPlayerHearts(prev => {
                    const newHealth = Math.min(prev + 1, 4); // Increase health by 1, max of 4
                    // Update health in Firebase
                    const db = getDatabase();
                    const userRef = ref(db, `users/${auth.currentUser.uid}/health`);
                    set(userRef, newHealth);
                    return newHealth;
                });
            } else {
                console.log("No user logged in, skipping progress update");
            }

            // Reset hints when player wins a battle
            setHintsRemaining(3);
            setHighlightedIndices([]);
            setHint('');

            //Check if this was the last enemy (game fully beaten)
            if (enemyProgression.length === 0 || currentEnemyIndex >= enemyProgression.length - 1) {
                console.log("Game fully cleared! Stopping Timer.");
            
                if (auth.currentUser) {
                    const db = getDatabase();
                    const userRef = ref(db, `gameBeatScores/${auth.currentUser.uid}`);
            
                    await set(userRef, {
                        username: profileData?.username || 'Anonymous',
                        timestamp: Date.now()
                    });
                }
            
                setGameCleared(true); // Show "Game Cleared" screen
            } else {
                // Keep the timer running and proceed to next enemy
                console.log("Enemy defeated! Moving to the next one...");
                setCurrentEnemyIndex(prev => prev + 1);
            }

            setVictoryVisible(true);
        } else {
            // Play defeat sound
            playLoseSound();
            setDefeatVisible(true);
            setHintsRemaining(2);
            setHighlightedIndices([]);
            setHint('');
        }
    };


    useEffect(() => {
        if (enemyHearts <= 0 && currentEnemy) {
            console.log("Enemy hearts reached zero, triggering defeat:", currentEnemy.id);
            handleGameOver(true);
        }
    }, [enemyHearts, currentEnemy]);

    useEffect(() => {
        if (currentEnemy) {
            setEnemyHearts(currentEnemy.health);
        }
    }, [currentEnemy]);

    const addRandomEffect = () => {
        console.log('Checking for effect addition, word length:', selectedLetters.length);
        if (selectedLetters.length >= 2) {
            const effects = ['poison', 'bleed', 'exhaust', 'burn', 'blind'];
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];

            // Get available spots (those with letters but no effects)
            const availableSpots = gridLetters.map((letter, i) => ({ letter, index: i }))
                .filter(({ letter, index }) => letter !== '' && !letterEffects[index]);

            console.log('Available spots for effects:', availableSpots.length);

            if (availableSpots.length > 0) {
                const randomSpot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
                const newEffects = [...letterEffects];
                newEffects[randomSpot.index] = randomEffect;

                console.log('Adding effect:', randomEffect, 'at position:', randomSpot.index);

                setLetterEffects(newEffects);

                // Show feedback about the new effect
                setDefinition(prev =>
                    `${prev.text}\n\nNew ${randomEffect.toUpperCase()} effect added to a letter! Find it in the grid.`
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

    const handleScramble = (fromControlKey = false) => {
        // Check if scramble is on cooldown, but only show message if not from Control key
        if (scrambleCooldown && !fromControlKey) {
            setDefinition({
                text: "Recombine is on cooldown! Wait a moment.",
                source: ''
            });
            return;
        }

        // Set scramble on cooldown
        if (!fromControlKey) {
            setScrambleCooldown(true);
            setTimeout(() => {
                setScrambleCooldown(false);
            }, 1000); // 1 second cooldown
        }

        // Trigger enemy attack animation
        handleEnemyAttack();

        // Generate new grid letters with guaranteed valid word
        const newGridLetters = generateRandomLetters();

        // Reset all states
        setSelectedLetters([]);
        setEmptyIndices([]);
        setGridLetters(newGridLetters);
        setIsValidWord(false);
        setHighlightedIndices([]); // Clear highlights on scramble
        playScrambleSound();
    };

    const handleControlKeyScramble = () => {
        // Add cooldown check
        if (window.controlCooldownActive) {
            return; // Silently do nothing if on cooldown
        }
        
        // Set cooldown flag
        window.controlCooldownActive = true;
        
        // Reset cooldown after 1 second
        setTimeout(() => {
            window.controlCooldownActive = false;
        }, 1000);
        
        // Generate new grid letters with guaranteed valid word
        const newGridLetters = generateRandomLetters();

        // Trigger enemy attack animation
        handleEnemyAttack();

        // Reset all states
        setSelectedLetters([]);
        setEmptyIndices([]);
        setGridLetters(newGridLetters);
        setIsValidWord(false);
        setHighlightedIndices([]); // Clear highlights on scramble
        playScrambleSound();
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
            playHintSound();

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
            setDefinition(prev =>
                `${prev.text}\n\nEnemy attack missed due to blind effect!`
            );
            return;
        }

        setEnemyLaserActive(true);
        playHitSound(); // Play hit sound effect
        setTimeout(() => {
            let damage = 1;
            // Apply exhaust effect (-50% damage)
            if (enemyStatusEffects.exhaust > 0) {
                damage *= 0.5;
            }

            setPlayerHearts((prev) => {
                const newHeartCount = Math.max(0, prev - damage);
                if (newHeartCount === 0) {
                    playLoseSound(); // Play lose sound when player dies
                    setDefeatVisible(true);
                }
                return newHeartCount;
            });
            setEnemyLaserActive(false);
        }, 500);
    };

    // Handle player's attack logic
    const handleAttack = () => {
        setIsCharacterAttacking(true);
        playHitSound(); // Play hit sound effect
        setTimeout(() => {
            setIsCharacterAttacking(false);
        }, 500);

        const word = selectedLetters.join('').toUpperCase();

        // Check if the word is a valid science term
        if (scienceTerm[word]) {
            // Calculate damage as 0.2 per letter
            const damage = word.length * 0.2;

            // Apply status effects if any
            let totalDamage = damage;
            let statusEffectApplied = false;

            // Check for status effects in the selected letters
            selectedLetters.forEach((_, index) => {
                const effectIndex = emptyIndices[index];
                const effect = letterEffects[effectIndex];

                if (effect) {
                    statusEffectApplied = true;

                    // Apply the effect
                    setEnemyStatusEffects(prev => {
                        const newEffects = { ...prev };

                        switch (effect) {
                            case 'poison':
                                newEffects.poison += 3; // 3 turns of poison
                                break;
                            case 'bleed':
                                newEffects.bleed += 1; // +20% damage per stack
                                totalDamage *= (1 + 0.2 * newEffects.bleed);
                                break;
                            case 'exhaust':
                                newEffects.exhaust += 2; // 2 turns of exhaust
                                break;
                            case 'burn':
                                newEffects.burn += 5; // 5 seconds of burn
                                break;
                            case 'blind':
                                newEffects.blind += 2; // 2 turns of blind
                                break;
                        }

                        return newEffects;
                    });

                    // Clear the used effect
                    const newEffects = [...letterEffects];
                    newEffects[effectIndex] = null;
                    setLetterEffects(newEffects);
                }
            });

            // Apply damage to enemy
            const updatedHearts = Math.max(0, enemyHearts - Math.ceil(totalDamage));
            setEnemyHearts(updatedHearts);

            // Show attack feedback with status effects
            let feedbackText = `You dealt ${Math.ceil(totalDamage)} damage with "${word}"!`;
            if (statusEffectApplied) {
                feedbackText += " Status effect applied!";
            }

            setDefinition({
                text: `${word} Definition: ${scienceTerm[word].DEFINITION}`,
                source: scienceTerm[word].SOURCE
            });

            // Check if enemy is defeated
            if (updatedHearts <= 0) {
                console.log("Enemy defeated! Hearts:", updatedHearts);
                // The useEffect will handle the enemy defeat
            } else {
                console.log("Enemy damaged but not defeated. Hearts remaining:", updatedHearts);
            }
        } else {
            // Invalid word
            setDefinition({
                text: `"${word}" is not a valid science term. Please try again or form a valid word.`,
                source: ''
            });

        }

        // Clear selected letters and update grid
        setSelectedLetters([]);

        // Refill the grid with new letters
        const newGridLetters = [...gridLetters];
        emptyIndices.forEach(index => {
            newGridLetters[index] = '';
        });

        const filledGrid = generateRandomLetters(newGridLetters, letterEffects);
        setGridLetters(filledGrid);
        setEmptyIndices([]);
    };


    const handleNextLevel = () => {
        console.log("handleNextLevel called");
        setVictoryVisible(false);

        // Find the current enemy index in the progression
        const currentEnemyIndex = enemyProgression.findIndex(e => e.id === currentEnemy?.id);
        console.log("Current enemy index:", currentEnemyIndex);

        if (currentEnemyIndex !== -1 && currentEnemyIndex < enemyProgression.length - 1) {
            // Move to the next enemy
            const nextEnemy = enemyProgression[currentEnemyIndex + 1];
            console.log("Moving to next enemy:", nextEnemy.id);

            // Check if we need to change maps
            const currentMapId = currentEnemy.mapId;
            const nextMapId = nextEnemy.mapId;

            if (currentMapId !== nextMapId) {
                console.log("Map transition needed from", currentMapId, "to", nextMapId);
                // Return to map selection screen for map transition
                console.log("Forcing reload of user progress before returning to main menu");
                reload();
                setTimeout(() => {
                    onMainMenu();
                }, 500); // Small delay to ensure reload completes
            } else {
                // Stay on same map, just change enemy
                console.log("Staying on same map, changing enemy");
                setCurrentEnemy(nextEnemy);
                resetGame();
            }
        } else {
            console.log("No more enemies, returning to main menu");
            // No more enemies, return to main menu
            reload();
            setTimeout(() => {
                onMainMenu();
            }, 500); // Small delay to ensure reload completes
        }
    };

    const handleNextDialog = () => {
        if (showTutorial) {
            if (tutorialStep < tutorialSteps.length - 1) {
                setTutorialStep(prev => prev + 1);
            } else {
                setShowTutorial(false);
                setDialogVisible(true);
                setCurrentDialogIndex(0);
            }
        } else if (currentDialogIndex < dialogSequence.length - 1) {
            setCurrentDialogIndex(prev => prev + 1);
        } else {
            setDialogVisible(false);
            setCurrentDialogIndex(0);
        }
    };

    useEffect(() => {
        // Clear any existing highlights first
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });

        // Apply new highlight if needed
        if (showTutorial && tutorialSteps[tutorialStep].highlight) {
            const selector = tutorialSteps[tutorialStep].highlight;
            const element = document.querySelector(`.${selector}`) || document.getElementById(selector);

            if (element) {
                element.classList.add('tutorial-highlight');
            }
        }
    }, [tutorialStep, showTutorial]);

    const tutorialSteps = [
        {
            message: "Welcome to Science Quest! I'm Professor Nova, and I'll be your guide in this adventure of scientific discovery!",
            highlight: null
        },
        {
            message: "Your mission is to defeat enemies by forming scientific words(BIOLOGY, CHEMISTRY, PHYSICS). The longer and more complex the word, the more damage you'll deal!",
            highlight: "word-box"
        },
        {
            message: "Click/Type on letters to form words. Each correct scientific term will launch an attack!",
            highlight: "letter-grid"
        },
        {
            message: "Some letters have special effects! Hover over them to see what they do.",
            highlight: null
        },
        {
            message: "Use HINTS when you're stuck, but use them wisely - you only have 3 per level!",
            highlight: "hint-box "
        },
        {
            message: "If you can't find any words, use SCRAMBLE to get new letters.",
            highlight: "scramble-button"
        },
        {
            message: "Ready to begin your scientific journey? Let's go!",
            highlight: null
        }
    ];

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

    const resetPlayerHealth = async () => {
        setDefeatVisible(false);
        if (auth.currentUser) {
            const db = getDatabase();
            const userRef = ref(db, `users/${auth.currentUser.uid}/health`);

            // Set health to 4 and keep current enemy
            await set(userRef, 4);
            setPlayerHearts(4);
            setEnemyHearts(currentEnemy.health);
        } else {
            // For users not logged in
            setPlayerHearts(4);
            setEnemyHearts(currentEnemy.health);
        }
    };

    // Modify the useEffect for level changes to reset health when returning to level 1
    useEffect(() => {
        if (level?.enemy) {
            setCurrentEnemy(level.enemy);
            setEnemyHearts(level.enemy.health);

            // Reset health to 4 if player is at level 1
            if (level.levelNumber === 1) {
                resetPlayerHealth(4);
                setShowTutorial(false);
                setTutorialStep(0);
                setDialogVisible(false);
            } else {
                const enemyDialogs = [
                    `Ah, a new challenger approaches! I am ${level.enemy.name}, master of ${level.enemy.stats.strength}!`,
                    level.enemy.dialog,
                    "Prepare yourself for a battle of scientific wit!"
                ];
                setDialogSequence(enemyDialogs);
                setCurrentDialogIndex(0);
                setDialogVisible(true);
            }

            // Reset hints for new level
            setHintsRemaining(3);
            setHighlightedIndices([]);
            setHint('');
            // Reset other game states
            setSelectedLetters([]);
            setEmptyIndices([]);
            setGridLetters(generateRandomLetters());
            setIsValidWord(false);
        }
    }, [level]);

    const handleSettingsSave = (newMusicVolume, newSoundEffectsVolume, newBackgroundVolume) => {
        setMusicVolume(newMusicVolume);
        // Sound effects and background volume will be handled by App.js
        setSettingsOpen(false);
    };

    const handleSettingsReset = () => {
        setMusicVolume(50);
        // Sound effects and background volume will be handled by App.js
    };

    // Add effect descriptions
    const effectDescriptions = {
        poison: "Poison: Deals damage over time for 3 turns",
        bleed: "Bleed: Increases damage taken by 20% per stack",
        exhaust: "Exhaust: Reduces damage dealt by 50% for 2 turns",
        burn: "Burn: Deals fire damage for 5 seconds",
        blind: "Blind: 75% chance to miss attacks for 2 turns"
    };

    useEffect(() => {
        const fetchUserProgress = async () => {
            if (!auth.currentUser) return;

            const db = getDatabase();
            const userRef = ref(db, `users/${auth.currentUser.uid}`);

            try {
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUserProgress(data);

                    // Initialize game state based on user progress
                    if (data.currentMap) {
                        setCurrentMapId(data.currentMap);
                    }

                    if (data.currentEnemyIndex !== undefined) {
                        setCurrentEnemyIndex(data.currentEnemyIndex);
                    }
                } else {
                    // Create initial user progress if it doesn't exist
                    // Get the first enemy ID from maps.json
                    const firstEnemyId = mapData.maps[0]?.enemies[0]?.id || "bio_t1";

                    const initialData = {
                        unlockedMaps: ["map1"],
                        defeatedEnemies: [],
                        unlockedEnemies: [firstEnemyId],
                        currentMap: "map1",
                        currentEnemyIndex: 0,
                        experience: 0,
                        createdAt: new Date().toISOString(),
                        lastUpdated: new Date().toISOString()
                    };

                    try {
                        await set(userRef, initialData);
                        setUserProgress(initialData);
                    } catch (error) {
                        console.error("Error creating user data:", error);
                        // Use local state if Firebase fails
                        setUserProgress(initialData);
                    }
                }
            } catch (error) {
                console.error("Firebase permission error:", error);
                // Set default progress if there's a permission error
                const firstEnemyId = mapData.maps[0]?.enemies[0]?.id || "bio_t1";

                const defaultProgress = {
                    unlockedMaps: ["map1"],
                    defeatedEnemies: [],
                    unlockedEnemies: [firstEnemyId],
                    currentMap: "map1",
                    currentEnemyIndex: 0,
                    experience: 0
                };
                setUserProgress(defaultProgress);
            }
        };

        fetchUserProgress();
    }, []);

    const updateUserProgress = async (defeatedEnemy) => {
        if (!auth.currentUser) {
            console.log("No user logged in, can't update progress");
            return;
        }

        console.log("Updating user progress for defeated enemy:", defeatedEnemy);

        // Normalize the defeated enemy name for storage
        const defeatedEnemyName = defeatedEnemy.name.toLowerCase().replace(' ', '_');

        const db = getDatabase();
        const userRef = ref(db, `users/${auth.currentUser.uid}`);

        try {
            // Get current user data
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                console.log("Current user data:", userData);

                // Initialize arrays if they don't exist
                if (!userData.unlockedEnemies) {
                    userData.unlockedEnemies = ["microbe"];
                }
                if (!userData.unlockedWorlds) {
                    userData.unlockedWorlds = ["map1"];
                }
                if (!userData.defeatedEnemies) {
                    userData.defeatedEnemies = [];
                }

                // Add defeated enemy to defeated list if not already there
                if (!userData.defeatedEnemies.includes(defeatedEnemyName)) {
                    userData.defeatedEnemies.push(defeatedEnemyName);
                }

                // Create a flattened array of all enemies from all maps
                const allEnemies = [];
                for (const map of mapData.maps) {
                    for (const enemy of map.enemies) {
                        allEnemies.push({
                            id: enemy.id,
                            name: enemy.name.toLowerCase().replace(' ', '_'),
                            mapId: map.id
                        });
                    }
                }

                console.log("All enemies in progression:", allEnemies);

                // Find the current enemy in the progression
                const currentEnemyIndex = enemyProgression.findIndex(e => e.id === currentEnemy?.id);

                console.log("Current enemy index in progression:", currentEnemyIndex);

                // If found and not the last enemy, unlock the next one
                if (currentEnemyIndex !== -1 && currentEnemyIndex < allEnemies.length - 1) {
                    const nextEnemy = allEnemies[currentEnemyIndex + 1];
                    console.log("Next enemy to unlock:", nextEnemy);

                    // Add next enemy to unlocked list if not already there
                    if (!userData.unlockedEnemies.includes(nextEnemy.name)) {
                        userData.unlockedEnemies.push(nextEnemy.name);
                        console.log(`Added ${nextEnemy.name} to unlocked enemies`);
                    }

                    // Check if we need to unlock the next world
                    if (defeatedEnemy.mapId !== nextEnemy.mapId) {
                        if (!userData.unlockedWorlds.includes(nextEnemy.mapId)) {
                            userData.unlockedWorlds.push(nextEnemy.mapId);
                            console.log(`Unlocked new world: ${nextEnemy.mapId}`);
                        }
                    }
                } else {
                    console.log("No next enemy found or current enemy is the last one");
                }

                // Add timestamp for debugging
                userData.lastUpdated = new Date().toISOString();

                // Update user data in Firebase
                console.log("Updating Firebase with new user data:", userData);
                await set(userRef, userData);

                // Verify the update
                const updatedSnapshot = await get(userRef);
                if (updatedSnapshot.exists()) {
                    console.log("Verified updated user data:", updatedSnapshot.val());
                }
            }
        } catch (error) {
            console.error("Error updating user progress:", error);
        }
    };

    const handleVictory = () => {
        console.log("Victory! Updating user progress for enemy:", currentEnemy);
        if (!auth.currentUser) {
            console.log("No user logged in, skipping progress update");
            return;
        }

        // Play victory sound
        playWinSound();

        // Make sure the enemy has the mapId property
        const enemyWithMapId = {
            ...currentEnemy,
            mapId: level?.selectedMap?.id || 'map1'
        };

        console.log("Updating user progress with enemy including mapId:", enemyWithMapId);

        // Update user progress when enemy is defeated
        updateUserProgress(enemyWithMapId);

        // Reset hints when player wins a battle
        setHintsRemaining(3);
        setHighlightedIndices([]);
        setHint('');

        setVictoryVisible(true);
    };

    const handleEnemyDefeat = () => {
        console.log("Enemy defeated:", currentEnemy?.id);

        // First, call handleGameOver to show victory screen
        handleGameOver(true);
        playLoseSound();

        // The rest of the progression logic will happen when the player clicks "Next Level"
        // in the victory dialog, which calls handleNextLevel
    };

    // State variables for current map and enemy index
    const [currentMapId, setCurrentMapId] = useState('map'); // Default to first map
    const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0); // Default to first enemy

    // Function to get current map data based on currentMapId
    const getCurrentMapData = () => {
        return mapData.maps.find(map => map.id === currentMapId);
    };

    const updateLevelProgress = async (completedLevel) => {
        const user = auth.currentUser;
        if (user && userProgress) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);
            const nextLevel = completedLevel + 1;

            // Only update if this is the highest level completed
            if (!userProgress.unlockedLevels.includes(nextLevel)) {
                const updatedUnlockedLevels = [...userProgress.unlockedLevels, nextLevel];
                await set(userRef, {
                    ...userProgress,
                    currentLevel: nextLevel,
                    unlockedLevels: updatedUnlockedLevels,
                    lastUpdated: new Date().toISOString()
                });
            }
        }
    };

    const handleLevelComplete = async () => {
        if (level) {
            await updateLevelProgress(level);
            // Show success message
            setDialogMessage("Level Complete! Next level unlocked!");
            setDialogVisible(true);
        }
    };

    const isLevelLocked = (levelNumber) => {
        if (!userProgress) return true;
        return !userProgress.unlockedLevels.includes(levelNumber);
    };

    const isEnemyLocked = (enemyId) => {
        if (!userProgress?.unlockedEnemies || !enemyProgression.length) return true;

        // Get the index of the enemy in the progression
        const enemyIndex = enemyProgression.findIndex(e => e.id === enemyId);
        if (enemyIndex === -1) return true;

        // Check if any of the unlocked enemies are further in the progression
        return !userProgress.unlockedEnemies.some(unlockedId => {
            const unlockedIndex = enemyProgression.findIndex(e => e.id === unlockedId);
            return unlockedIndex >= enemyIndex;
        });
    };

    const resetGame = () => {
        console.log("Resetting game state for new enemy");

        // Keep existing letters and effects, just fill in empty spots
        const newGridLetters = generateRandomLetters(gridLetters, letterEffects);

        // Reset game state but keep letter effects
        setSelectedLetters([]);
        setEmptyIndices([]);
        setGridLetters(newGridLetters);

        // Reset enemy status effects for new enemy
        setEnemyStatusEffects({
            poison: 0,
            bleed: 0,
            exhaust: 0,
            burn: 0,
            blind: 0
        });

        // Set enemy hearts based on current enemy
        if (currentEnemy) {
            setEnemyHearts(currentEnemy.health || 3);

            // Set dialog for the new enemy
            const enemyDialog = currentEnemy.dialog || `${currentEnemy.name} appears!`;
            setDialogSequence([enemyDialog]);
            setCurrentDialogIndex(0);
            setDialogMessage(enemyDialog);
            setDialogVisible(true);
        }
    };

    // Function to get the appropriate background based on the current enemy's map
    const getWorldBackground = (enemy) => {
        if (!enemy) return 'Bio_World.gif';

        const currentMap = mapData.maps.find(map =>
            map.enemies.some(e => e.id === enemy.id)
        );

        return currentMap?.background || 'Bio_World.gif';
    };

    // Update background when enemy changes
    useEffect(() => {
        if (currentEnemy) {
            const newBackground = getWorldBackground(currentEnemy);
            setCurrentWorldBackground(newBackground);
        }
    }, [currentEnemy]);

    // Update background when level changes
    useEffect(() => {
        if (level?.enemy) {
            const newBackground = getWorldBackground(level.enemy);
            setCurrentWorldBackground(newBackground);
        }
    }, [level]);

    // Word Box component
    const usedTerms = new Set(); // Stores recently used terms
    const cooldownLimit = 500;   // Number of terms before reuse (adjustable)

    function generateRandomLetters(existingLetters = [], existingEffects = []) {
        const scienceTerms = Object.keys(scienceTerm);

        // Prioritize longer words by sorting in descending order of length
        const sortedTerms = scienceTerms.sort((a, b) => b.length - a.length);

        // Filter out already used terms
        let availableTerms = sortedTerms.filter(term => !usedTerms.has(term));

        // If all terms are in cooldown, reset partially by freeing up some terms
        if (availableTerms.length === 0) {
            // Free up half of the used terms history
            const termsArray = Array.from(usedTerms);
            usedTerms.clear();
            termsArray.slice(0, Math.floor(cooldownLimit / 2)).forEach(term => usedTerms.add(term));
            availableTerms = sortedTerms; // Now all terms are available again
        }

        // Pick a word with at least 5 letters (if available)
        let randomTerm = availableTerms.find(term => term.length >= 5) ||
            availableTerms[Math.floor(Math.random() * availableTerms.length)];

        usedTerms.add(randomTerm); // Mark term as used

        // Convert the term to unique letters
        const termLetters = Array.from(new Set(randomTerm.split('')));
        const newGrid = [...existingLetters];

        // Find empty positions
        let emptyPositions = [];
        for (let i = 0; i < 20; i++) {
            if (!newGrid[i]) emptyPositions.push(i);
        }

        // Shuffle positions
        for (let i = emptyPositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [emptyPositions[i], emptyPositions[j]] = [emptyPositions[j], emptyPositions[i]];
        }

        // Place term letters
        for (let i = 0; i < termLetters.length && i < emptyPositions.length; i++) {
            newGrid[emptyPositions[i]] = termLetters[i];
        }

        // Fill remaining slots with random letters
        const vowels = 'AEIOU';
        const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';

        for (let i = termLetters.length; i < emptyPositions.length; i++) {
            newGrid[emptyPositions[i]] = Math.random() < 0.4
                ? vowels.charAt(Math.floor(Math.random() * vowels.length))
                : consonants.charAt(Math.floor(Math.random() * consonants.length));
        }

        return newGrid;
    }

    // Handle keyboard input
    const handleKeyPress = useCallback((event) => {
        // Handle Escape key for slidebar
        if (event.key === 'Escape') {
            setSlidebarOpen(prev => !prev);
            return;
        }

        if (slidebarOpen || settingsOpen || profileOpen || dialogVisible || showTutorial) return;

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
        // Handle backspace for letter removal
        else if (event.key === 'Backspace' && selectedLetters.length > 0) {
            if (selectedLetterIndex >= 0) {
                handleSelectedLetterClick(selectedLetters[selectedLetterIndex], selectedLetterIndex);
                setSelectedLetterIndex(Math.min(selectedLetterIndex, selectedLetters.length - 2));
            } else {
                const lastIndex = selectedLetters.length - 1;
                handleSelectedLetterClick(selectedLetters[lastIndex], lastIndex);
            }
        }
        // Handle enter for word submission
        else if (event.key === 'Enter' && isValidWord) {
            handleAttack();
        }
        // Handle Shift key for hint
        else if (event.key === 'Shift') {
            handleHint();
        }
        // Handle Control key for scramble
        else if (event.key === 'Control' && !event.repeat) {
            handleControlKeyScramble();
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
    }, [slidebarOpen, settingsOpen, profileOpen, dialogVisible, showTutorial, gridLetters, emptyIndices, selectedLetters, isValidWord, selectedLetterIndex]);

    // Add keyboard event listener
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    const handleMainMenu = () => {
        // Reset boss fight and fight sound states when returning to main menu
        setBossFight(false);
        setFightSoundPlaying(false);
        onMainMenu();
    };

    return (

        <div
            className="game-container relative min-h-screen w-full flex flex-col items-center justify-between p-1 sm:p-1 md:p-1 lg:p-1"
            style={{
                backgroundImage: `url(${require('../assets/' + currentWorldBackground)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#000',
                userSelect: 'none'
            }}
        >
            <style>
                {`
        @keyframes shoot {
            0% {
                transform: translateX(0) translateY(-50%);
                opacity: 0.7;
            }
            50% {
                transform: translateX(calc(25vw)) translateY(-50%);
                opacity: 1;
            }
            100% {
                transform: translateX(calc(50vw)) translateY(-50%);
                opacity: 0;
            }
        }
        @keyframes enemyShoot {
            0% {
                transform: translateX(-10vw) translateY(-50%) rotate(180deg);
                opacity: 0.7;
            }
            50% {
                transform: translateX(calc(20vw)) translateY(-50%) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: translateX(calc(50vw)) translateY(-50%) rotate(180deg);
                opacity: 0;
            }
        }
        `}
            </style>

            {/* Top Bar */}
            <div className="w-full flex flex-wrap justify-between items-center mb-2 sm:mb-4">
                {/* Left Side */}
                <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                    <div className="transition-all 
                                    duration-300 hover:scale-110 
                                    hover:rotate-90 focus:outline-none
                                    focus:ring-4 focus:ring slidebar-icon 
                                    text-xl sm:text-2xl cursor-pointer" 
                                    onClick={toggleSlidebar}>
                        <Cross toggled={slidebarOpen} toggle={toggleSlidebar} />
                    </div>
                    <div className="player-info flex items-center bg-white/70 p-1 sm:p-2 border border-indigo-200 rounded-lg shadow-inner">
                        <img
                            src={currentAvatar}
                            alt="Player Avatar"
                            className="w-8 h-8 
                                       sm:w-10 sm:h-10 
                                       rounded-full object-cover 
                                       mr-2 ring-2 ring-indigo-300"
                        />
                        <div className="hearts flex items-center">
                            {[...Array(playerHearts)].map((_, i) => (
                                <img key={i} src={heartImage} alt="Heart" className="w-4 h-4 sm:w-6 sm:h-6 ml-1" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="player-info flex items-center mt-2 sm:mt-0">

                    <div className="hearts flex items-center">
                        {[...Array(enemyHearts)].map((_, i) => (
                            <img key={i}
                                src={heartImage}
                                alt="Heart"
                                className="w-8 h-8 sm:w-12 sm:h-12 ml-2 sm:ml-6" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Game Content */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-2 sm:gap-4 mb-2 sm:mb-4">
                {/* Player Character */}
                <div className="  character-container 
                                    relative 
                                    w-full 
                                    md:w-1/3 
                                    flex 
                                    justify-center 
                                    items-center">
                    <div
                        className={`character 
                                    character-responsive
                                    bg-contain 
                                    bg-center 
                                    bg-no-repeat 
                                    transition-all 
                                    duration-300 
                                    ${isCharacterAttacking ? "transform scale-110 translate-x-24 md:translate-x-32 lg:translate-x-40" : ""}
                                    ${isCharacterIdle ? "transform scale-105" : ""}`}
                        style={{ backgroundImage: `url(${isCharacterAttacking 
                                                    ? characterAttack 
                                                    : isCharacterIdle 
                                                    ? characterIdle 
                                                    : character})` }}
                    >
                    </div>
                </div>

                {/* Word Box */}
                <div className="word-box 
                flex 
                flex-wrap 
                justify-center 
                gap-1 
                md:gap-1.5 
                w-full 
                md:w-1/3">
    {selectedLetters.map((letter, index) => {
        const effect = letterEffects[emptyIndices[index]];
        return (
            <div
                key={index}
                className={` 
                    relative 
                    w-7 h-7 
                    sm:w-8 sm:h-8 
                    md:w-10 md:h-10 
                    border-2 
                    flex 
                    items-center 
                    justify-center 
                    text-sm 
                    sm:text-base 
                    md:text-lg 
                    font-bold 
                    rounded-lg 
                    cursor-pointer 
                    transition-all 
                    duration-200
                    touch-target
                    ${index === selectedLetterIndex ? 'border-teal-500 bg-blue-100 scale-105' : 'border-gray-700'}
                    ${highlightedIndices.includes(index) ? 'bg-green-300 scale-105 shadow-md' : 'bg-blue-50 hover:bg-blue-100'}
                    ${effect ? effectStyles[effect] : ''}
                `}
                onClick={() => handleSelectedLetterClick(letter, index)}
            >
                {letter}
                {effect && (
                    <div className="absolute opacity-0 hover:opacity-100 bg-gray-800 text-white text-xs rounded py-1 px-2 w-32 -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none transition-opacity duration-200 z-10">
                        {effectDescriptions[effect]}
                    </div>
                )}
            </div>
        );
    })}
</div>

                {/* Enemy Character */}
                <div className="enemy-container relative w-full md:w-1/3 flex justify-center items-center">
                    <div
                        className={`enemy w-40 h-40 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-contain bg-center bg-no-repeat`}
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
                                className="absolute top-1/2 right-full transform -translate-y-1/2"
                                style={{
                                    animation: "enemyShoot 1s linear forwards",
                                    height: "8rem",
                                    width: "auto"
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Content */}
            <div className="game-content 
                             w-full 
                max-w-6xl 
                grid 
                grid-cols-1 
                md:grid-cols-3 
                gap-3 
                sm:gap-2
                p-3 
                sm:p-2
                rounded-xl 
                bg-opacity-90 
                mb-3 
                sm:mb-2
                            " /*   style={{
                                backgroundImage: `url(${functionBackground})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)'
                            }} */>

                {/* Description Box */}
                <div className="description-box 
                               bg-gradient-to-b 
                from-blue-100 
                to-blue-200 
                border-2 
                border-gray-700 
                p-2 
                md:p-4 
                mt-5
                rounded-xl 
                mb-4
                md:mb-3 
                h-40 
                md:h-48 
                overflow-y-auto 
                shadow-md">
                    <div className="text-gray-800 leading-relaxed text-sm md:text-base">{definition.text || "Discover a scientific term to reveal its definition."}</div>

                    {definition.source && (
                        <a
                            href={definition.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium text-xs md:text-sm mt-2 group"
                        >
                            Learn more <span className="ml-1 group-hover:ml-2 transition-all duration-300">→</span>
                        </a>
                    )}
                </div>

               
                {/* Letter Grid */}
                <div className="letter-grid grid grid-cols-4 gap-1 md:gap-1.5 bg-blue-50 border-2 border-gray-700 p-2 rounded-lg place-items-center">
                    {gridLetters.map((letter, index) => (
                        <div
                            key={index}
                            className={`relative grid-letter w-8 h-8 md:w-10 md:h-10 border-2 border-gray-700 flex items-center justify-center text-base md:text-lg font-bold cursor-pointer transition-all duration-300 rounded-lg
                                ${highlightedIndices.includes(index) ? 'bg-green-300 scale-105' : 'hover:bg-blue-100'}
                                ${letterEffects[index] ? effectStyles[letterEffects[index]] : 'bg-blue-50'}`}
                            onClick={() => handleLetterClick(letter, index)}
                        >
                            {letter}
                            {letterEffects[index] && (
                                <div className="absolute opacity-0 hover:opacity-100 bg-gray-800 text-white text-xs rounded py-1 px-2 w-32 -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none transition-opacity duration-200 z-10">
                                    {effectDescriptions[letterEffects[index]]}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right Side Controls */}
                <div className="flex flex-col space-y-1.5">

    {/* Action Buttons */}
    <div className="action-buttons mt-2 md:mt-8 flex flex-col space-y-1 md:space-y-2">
        <button
            className={`
                bg-gradient-to-r 
                from-teal-500 to-teal-600 text-white 
                border-2 border-gray-700 py-1.5 md:py-2 text-center
                font-bold text-sm md:text-base rounded-lg transition-all
                ${!isValidWord ? "opacity-50 cursor-not-allowed"
                : "hover:from-teal-600 hover:to-teal-700 hover:shadow-lg transform hover:-translate-y-0.5"}`}
            onClick={handleAttack}
            disabled={!isValidWord}
        >
            ANALYZE
        </button>

        <div className="hint-box bg-blue-50 border-2 border-gray-700 py-1.5 md:py-2 px-2 md:px-3 text-center rounded-lg shadow-inner">
            <p className="text-xs md:text-sm truncate font-medium">{hint || `Lab assistance: ${hintsRemaining}`}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
            <button
                className={`bg-gradient-to-r from-indigo-500 
                to-indigo-600 text-white border-2 border-gray-700 py-1.5 md:py-2 text-xs md:text-sm font-bold 
                rounded-lg transition-all ${hintsRemaining > 0 ?
                'hover:from-indigo-600 hover:to-indigo-700 hover:shadow-md transform hover:-translate-y-0.5'
                : 'opacity-50 cursor-not-allowed'}`}
                onClick={handleHint}
                disabled={hintsRemaining <= 0}
            >
                HINT
            </button>

            <button
                className={`scramble-button bg-blue-50 text-gray-800 border-2 border-gray-700 py-1.5 md:py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${
                    scrambleCooldown ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100 hover:shadow-md transform hover:-translate-y-0.5'
                }`}
                onClick={handleScramble}
                disabled={scrambleCooldown}
            >
                RECOMBINE
            </button>
        </div>
    </div>
</div>
            </div>

            {/* Modals */}
            {settingsOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center">
                    <div className="bg-[#f4d9a3] border-4 border-black p-6 rounded-lg text-center max-w-md w-full relative">
                        <button 
                            onClick={() => setSettingsOpen(false)} 
                            className="absolute top-2 right-2 text-2xl hover:text-gray-700"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Game Settings</h2>
                        <GameSettings
                            onClose={() => setSettingsOpen(false)}
                            onSave={(newMusicVolume, newSoundEffectsVolume, newBackgroundVolume) => {
                                setMusicVolume(newMusicVolume);
                                // Sound effects and background volume will be handled by App.js
                            }}
                            onReset={() => {
                                setMusicVolume(50);
                                // Sound effects and background volume will be handled by App.js
                            }}
                            musicVolume={musicVolume}
                            soundEffectsVolume={soundEffectsVolume}
                            backgroundVolume={backgroundVolume}
                        />
                    </div>
                </div>
            )}
            {profileOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center">
                    <div className="bg-[#f4d9a3] border-4 border-black p-6 rounded-lg text-center max-w-md w-full relative">
                        <button 
                            onClick={() => setProfileOpen(false)} 
                            className="absolute top-2 right-2 text-2xl hover:text-gray-700"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Profile</h2>
                        <Profile
                            onClose={() => setProfileOpen(false)}
                            profileData={profileData}
                            setProfileData={setProfileData}
                        />
                    </div>
                </div>
            )}
            {/* Game Cleared Dialog */}
            {gameCleared && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                    <div className="bg-gray-900 p-8 text-center text-white border-4 border-gray-700">
                        <h2 className="text-4xl font-bold mb-4">🏆 Game Completed! 🏆</h2>
                        <p className="text-lg mb-4">You completed the game</p>
                        <button 
                            onClick={onMainMenu}
                            className="bg-green-500 px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-600"
                        >
                            Return to Main Menu
                        </button>
                    </div>
                </div>
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
                                onClick={() => {
                                    resetPlayerHealth(); // Reset player health
                                    setEnemyHearts(currentEnemy.health); // Reset enemy health
                                    setHintsRemaining(3); // Reset hints to full
                                    setHighlightedIndices([]); // Clear any highlighted hints
                                    setHint(''); // Clear hint message
                                    setDefeatVisible(false); // Hide defeat screen
                                }}
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
                    <div className="bg-[#f4d9a3] border-4 border-black p-6 rounded-lg text-center max-w-md w-full">
                        {showTutorial ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Tutorial</h2>
                                <p className="text-lg mb-4">{tutorialSteps[tutorialStep].message}</p>
                                {tutorialStep < tutorialSteps.length - 1 ? (
                                    <button
                                        className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-bold hover:bg-blue-600 transition-colors"
                                        onClick={handleNextDialog}
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg font-bold hover:bg-green-600 transition-colors"
                                        onClick={handleNextDialog}
                                    >
                                        Start Game
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                {currentEnemy?.image && (
                                    <img
                                        src={require(`../assets/${currentEnemy.image}`)}
                                        alt={currentEnemy.name}
                                        className="w-32 h-32 object-contain mx-auto mb-4"
                                    />
                                )}
                                <p className="text-lg mb-4">{dialogSequence[currentDialogIndex]}</p>
                                <button
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-bold hover:bg-blue-600 transition-colors"
                                    onClick={handleNextDialog}
                                >
                                    {currentDialogIndex < dialogSequence.length - 1 ? "Next" : "Begin Battle"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Fun Fact */}
            {showFunFact && (
                <FunFact />
            )}

            {/* Sidebar */}
            <Slidebar
                isOpen={slidebarOpen}
                toggleSlidebar={toggleSlidebar}
                onMainMenu={handleMainMenu}
                setSettingsOpen={setSettingsOpen}
                setProfileOpen={setProfileOpen}
                onLogout={onLogout}
            />
        </div>
    );
};

export default GamePage;
