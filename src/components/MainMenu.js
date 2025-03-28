import React, { useState, useEffect } from 'react';
import { useModal } from '../context/ModalContext';

const MainMenu = ({ onPlay, onSettings, onProfile, onAlmanac, onLogout, onMiniGame, onScoreboard }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { settingsOpen, profileOpen, loginOpen, signupOpen, scoreboardOpen } = useModal();

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
        // Don't handle keyboard events if any popup is open
        if (settingsOpen || profileOpen || loginOpen || signupOpen || scoreboardOpen) {
            return;
        }

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
    }, [selectedIndex, settingsOpen, profileOpen, loginOpen, signupOpen, scoreboardOpen]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center pixelated p-4"
        style={{ backgroundImage: "url('/bg.gif')" }}>
       <div className="text-center w-full max-w-md">
           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-300 mb-4 sm:mb-6 md:mb-8 drop-shadow-[4px_4px_4px_black]">
               Science Quest
           </h1>
           <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4 sm:mb-5 md:mb-6 drop-shadow-[2px_4px_4px_black]">
               Main Menu
           </h2>
           <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4">
               {menuItems.map((item, index) => (
                   <button
                       key={index}
                       onClick={item.onClick}
                       className={`
                           text-white
                           p-2
                           rounded
                           w-full
                           max-w-xs
                           transition
                           duration-200
                           ${item.className}
                           ${index === selectedIndex 
                               ? 'scale-105 ring-2 ring-white' 
                               : 'hover:scale-105'}
                       `}
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
