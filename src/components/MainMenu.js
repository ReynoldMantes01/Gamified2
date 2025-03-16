import React, { useState, useEffect } from 'react';

const MainMenu = ({ onPlay, onSettings, onProfile, onAlmanac, onLogout, onMiniGame, onScoreboard }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const menuItems = [
        { label: 'Play', onClick: onPlay, className: 'bg-blue-500 hover:bg-blue-700' },
        { label: 'Mini Game', onClick: onMiniGame, className: 'bg-yellow-500 hover:bg-yellow-700' },
        { label: 'Scoreboard', onClick: onScoreboard, className: 'bg-green-500 hover:bg-green-700' },
        { label: 'Almanac', onClick: onAlmanac, className: 'bg-purple-500 hover:bg-purple-700' },
        { label: 'Settings', onClick: onSettings, className: 'bg-gray-500 hover:bg-gray-700' },
        { label: 'Profile', onClick: onProfile, className: 'bg-green-500 hover:bg-green-700' },
        { label: 'Log Out', onClick: onLogout, className: 'bg-red-500 hover:bg-red-700' }
    ];

    const handleKeyPress = (event) => {
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
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedIndex]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center pixelated" style={{ backgroundImage: "url('/bg.gif')" }}>
            <div className="text-center">
                <h1 className="text-8xl font-bold text-gray-300 mb-10 drop-shadow-[4px_4px_4px_black]">Gamified</h1>
                <h1 className="text-4xl font-bold text-gray-300 mb-5 drop-shadow-[2px_4px_4px_black]">Main Menu</h1>
                <div className="flex flex-col items-center space-y-2">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={item.onClick}
                            className={`${item.className} text-white p-2 rounded w-48 transition duration-200
                                ${index === selectedIndex ? 
                                    'scale-110 ring-2 ring-white' : 
                                    'hover:scale-110'}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
