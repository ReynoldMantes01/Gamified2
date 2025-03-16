import React, { useState, useEffect } from 'react';
import { Cross } from 'hamburger-react';
import Scoreboard from './Scoreboard';

const Slidebar = ({ isOpen, toggleSlidebar, onMainMenu, setSettingsOpen, setProfileOpen, onLogout }) => {
    const [scoreboardOpen, setScoreboardOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const menuItems = [
        { label: 'Main Menu', onClick: onMainMenu },
        { label: 'Settings', onClick: () => setSettingsOpen(true) },
        { label: 'Profile', onClick: () => setProfileOpen(true) },
        { label: 'Scoreboard', onClick: () => setScoreboardOpen(true) },
        { label: 'Logout', onClick: onLogout }
    ];

    const handleKeyPress = (event) => {
        if (!isOpen) return;

        switch (event.key) {
            case 'ArrowUp':
                setSelectedIndex(prev => 
                    prev <= 0 ? menuItems.length - 1 : prev - 1
                );
                break;
            case 'ArrowDown':
                setSelectedIndex(prev => 
                    prev >= menuItems.length - 1 ? 0 : prev + 1
                );
                break;
            case 'Enter':
                menuItems[selectedIndex].onClick();
                break;
            case 'Escape':
                toggleSlidebar();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedIndex, isOpen]);

    // Reset selected index when slidebar opens/closes
    useEffect(() => {
        setSelectedIndex(0);
    }, [isOpen]);

    return ( 
        <>
        <div
            className={`slidebar fixed top-1/2 left-1/2 w-96 h-auto max-h-screen bg-gray-900 text-white rounded-xl shadow-2xl 
            transform ${isOpen ? 'translate-x-[-50%] translate-y-[-50%] scale-100' : 'translate-x-[-50%] translate-y-[-50%] scale-0'}
            transition-transform duration-300 ease-in-out z-10 overflow-hidden`}
        >
            {/* Close Icon */}
            <div className="absolute top-4 right-4 text-3xl cursor-pointer" onClick={toggleSlidebar}>
                <Cross toggled={isOpen} toggle={toggleSlidebar} />
            </div>

            {/* Title */}
            <h1 className="text-center text-3xl font-bold mt-10 mb-6">Gamified</h1>

            {/* Menu Items */}
            <ul className="list-none px-6 mb-10">
                {menuItems.map((item, index) => (
                    <li 
                        key={index}
                        className={`p-4 border-b border-gray-700 transition duration-300 rounded-md
                            ${index === selectedIndex ? 'bg-gray-700 ring-2 ring-white' : 'hover:bg-gray-700'}`}
                    >
                        <button 
                            className="text-white text-lg block w-full text-left"
                            onClick={item.onClick}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        {scoreboardOpen && (
            <Scoreboard onMainMenu={() => setScoreboardOpen(false)} />
        )}
        </>
    );
};

export default Slidebar;
