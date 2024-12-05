import React, { useState, useEffect, useCallback } from 'react';
import { Cross } from 'hamburger-react';
import GameSettings from './GameSettings';
import Profile from './Profile';
import Slidebar from './Slidebar';
import computerTerms from './computerTerms';
import heartImage from '../assets/heart.png';
import attackImage from '../assets/attack.gif';
import attackEnemyImage from '../assets/attack.png'
import Character from '../assets/Character.png';
import enemyOne from '../assets/enemyOne.png';

const GamePage = ({ onMainMenu, profileData, setProfileData, onLogout }) => {
    const [enemyLaserActive, setEnemyLaserActive] = useState(false);
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [gridLetters, setGridLetters] = useState(generateRandomLetters());
    const [definition, setDefinition] = useState('');
    const [playerHearts, setPlayerHearts] = useState(3);
    const [enemyHearts, setEnemyHearts] = useState(3);
    const [emptyIndices, setEmptyIndices] = useState([]);
    const [slidebarOpen, setSlidebarOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    // Animation State
    const [laserActive, setLaserActive] = useState(false);

    function generateRandomLetters() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomLetters = [];
        for (let i = 0; i < 16; i++) {
            randomLetters.push(letters.charAt(Math.floor(Math.random() * letters.length)));
        }
        return randomLetters;
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
        emptyIndices.forEach(index => {
            newGridLetters[index] = '';
        });
        setGridLetters(newGridLetters);

        handleEnemyAttack(); // Trigger enemy attack on scramble
    };

    const handleEnemyAttack = () => {
        setEnemyLaserActive(true);

        // Decrease player's health after the enemy attack
        setPlayerHearts((prev) => Math.max(0, prev - 1));

        // Stop the enemy laser animation after it finishes
        setTimeout(() => setEnemyLaserActive(false), 500); // Match the laser animation duration
    };

    const handleAttack = () => {
        const word = selectedLetters.join('');
        const wordLength = word.length;
        let damage = 0;

        if (wordLength >= 0 && wordLength <= 4) {
            damage = 1;
        } else if (wordLength > 4 && wordLength <= 8) {
            damage = 2;
        } else if (wordLength > 8) {
            damage = 3;
        }

        if (computerTerms[word.toUpperCase()]) {
            setDefinition(computerTerms[word.toUpperCase()]);
            setEnemyHearts(Math.max(0, enemyHearts - damage));
        } else {
            setDefinition('Invalid word. Please try again.');
            setPlayerHearts(Math.max(0, playerHearts - damage));
            handleEnemyAttack(); // Trigger enemy attack on wrong answer

        }

        // Trigger player laser animation for both correct and incorrect attacks
        setLaserActive(true);
        setTimeout(() => setLaserActive(false), 500);

        // Reset the grid and selected letters
        setSelectedLetters([]);
        setEmptyIndices([]);
        setGridLetters(generateRandomLetters());
    };

    const toggleSlidebar = () => {
        setSlidebarOpen(!slidebarOpen);
    };

    const handleClickOutside = useCallback((event) => {
        if (slidebarOpen && !event.target.closest('.slidebar') && !event.target.closest('.slidebar-icon')) {
            setSlidebarOpen(false);
        }
    }, [slidebarOpen]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className="game-container flex flex-col items-center justify-center h-screen relative">
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
                        className={`character w-80 h-80 bg-contain bg-no-repeat transition-transform duration-300 ${laserActive ? 'transform scale-110' : ''}`}
                        style={{ backgroundImage: `url(${Character})` }}
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
                        className={`enemy w-72 h-72 bg-contain bg-no-repeat transition-transform duration-300 ${laserActive ? 'transform scale-110' : ''}`}
                        style={{ backgroundImage: `url(${enemyOne})` }}
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
            <div className="game-content flex items-center justify-between w-4/5 mt-24">
                <div className="description-box bg-[#f4d9a3] border-2 border-black p-2 w-72 mr-5">
                    {definition}
                </div>
                <div className="letter-grid grid grid-cols-4 gap-1 bg-[#f4d9a3] border-2 border-black p-2">
                    {gridLetters.map((letter, index) => (
                        <div
                            key={index}
                            className="grid-letter w-12 h-12 bg-[#f4d9a3] border-2 border-black flex items-center justify-center text-2xl cursor-pointer hover:bg-[#e5c8a1]"
                            onClick={() => handleLetterClick(letter, index)}
                        >
                            {letter}
                        </div>
                    ))}
                </div>
                <div className="action-buttons flex flex-col gap-2">
                    <div className="button bg-[#f4d9a3] border-2 border-black p-2 text-center text-xl cursor-pointer hover:bg-[#e5c8a1]" onClick={handleAttack}>ATTACK</div>
                    <div className="button bg-[#f4d9a3] border-2 border-black p-2 text-center text-xl cursor-pointer hover:bg-[#e5c8a1]" onClick={handleScramble}>SCRAMBLE</div>
                </div>
            </div>
            {settingsOpen && <GameSettings onClose={() => setSettingsOpen(false)} />}
            {profileOpen && <Profile onClose={() => setProfileOpen(false)} onSave={() => setProfileOpen(false)} profileData={profileData} setProfileData={setProfileData} />}
        </div>
        
    );
};

export default GamePage;
