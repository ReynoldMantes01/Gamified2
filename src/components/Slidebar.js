import React, { useState } from 'react';
import { Cross } from 'hamburger-react';
import Scoreboard from './Scoreboard'; // Import the Scoreboard component

const Slidebar = ({ isOpen, toggleSlidebar, onMainMenu, setSettingsOpen, setProfileOpen, onLogout }) => {
    const [scoreboardOpen, setScoreboardOpen] = useState(false); // State for scoreboard visibility

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
                <li className="p-4 border-b border-gray-700 hover:bg-gray-700 rounded-md transition duration-300">
                    <button className="text-white text-lg block w-full text-left" onClick={onMainMenu}>
                        Main Menu
                    </button>
                </li>
                <li className="p-4 border-b border-gray-700 hover:bg-gray-700 rounded-md transition duration-300">
                    <button className="text-white text-lg block w-full text-left" onClick={() => setSettingsOpen(true)}>
                        Settings
                    </button>
                </li>
                <li className="p-4 border-b border-gray-700 hover:bg-gray-700 rounded-md transition duration-300">
                    <button className="text-white text-lg block w-full text-left" onClick={() => setProfileOpen(true)}>
                        Profile
                    </button>
                </li>
                <li className="p-4 border-b border-gray-700 hover:bg-gray-700 rounded-md transition duration-300">
                    <button 
                        className="text-white text-lg block w-full text-left" 
                        onClick={() => setScoreboardOpen(true)} // Open scoreboard
                    >
                        Scoreboard
                    </button>
                </li>
                <li className="p-4 hover:bg-gray-700 rounded-md transition duration-300">
                    <button className="text-white text-lg block w-full text-left" onClick={onLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
        {scoreboardOpen && ( // Render Scoreboard if open
            <Scoreboard onMainMenu={() => setScoreboardOpen(false)} />
        )}
        </>
    );
};

export default Slidebar;
