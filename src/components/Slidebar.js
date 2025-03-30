import React, { useState, useEffect } from 'react';
import { Cross } from 'hamburger-react';
import Scoreboard from './Scoreboard';

const Slidebar = ({ isOpen, toggleSlidebar, onMainMenu, setSettingsOpen, setProfileOpen, onLogout }) => {
    const [scoreboardOpen, setScoreboardOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const menuItems = [
        { label: 'Main Menu', onClick: onMainMenu },
        { label: 'Settings', onClick: () => {
            setSettingsOpen(true);
            // Don't close slidebar for settings
        }},
        { label: 'Profile', onClick: () => {
            setProfileOpen(true);
            // Don't close slidebar for profile
        }},
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
    className={`slidebar fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} 
        transition-all duration-300 ease-in-out`}
>
    <div
        className={`w-full max-w-md mx-4 sm:w-96 h-auto max-h-[90vh] bg-gray-900 text-white rounded-xl shadow-2xl 
        transform ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}
        transition-transform duration-300 ease-in-out overflow-hidden relative`}
    >
        {/* Close Icon */}
        <div 
            className="absolute top-4 right-4 text-2xl sm:text-3xl cursor-pointer z-10" 
            onClick={toggleSlidebar}
        >
            <Cross toggled={isOpen} toggle={toggleSlidebar} />
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl sm:text-3xl font-bold mt-6 sm:mt-10 mb-4 sm:mb-6 px-4">
            Science Quest
        </h1>

        {/* Menu Items */}
        <ul className="list-none px-4 sm:px-6 mb-6 sm:mb-10 max-h-[60vh] overflow-y-auto">
            {menuItems.map((item, index) => (
                <li 
                    key={index}
                    className={`p-3 sm:p-4 border-b border-gray-700 transition duration-300 rounded-md
                        ${index === selectedIndex ? 'bg-gray-700 ring-2 ring-white' : 'hover:bg-gray-700'}`}
                >
                    <button 
                        className="text-white text-base sm:text-lg block w-full text-left"
                        onClick={item.onClick}
                    >
                        {item.label}
                    </button>
                </li>
            ))}
        </ul>
    </div>
</div>
        {scoreboardOpen && (
            <Scoreboard onMainMenu={() => setScoreboardOpen(false)} />
        )}
        </>
    );
};

export default Slidebar;
