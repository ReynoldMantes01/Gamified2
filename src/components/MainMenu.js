import React from 'react';

const MainMenu = ({ onPlay, onSettings, onProfile, onLogout }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="text-center">
                <h1 className="text-5xl text-white font-bold mb-20">Main Menu</h1> {/* Increased margin below the heading */}
                <div className="flex flex-col items-center space-y-2"> {/* Center buttons horizontally */}
                    <button onClick={onPlay} className="bg-blue-500 text-white p-2 rounded w-48">Play</button>
                    <button onClick={onSettings} className="bg-gray-500 text-white p-2 rounded w-48">Settings</button>
                    <button onClick={onProfile} className="bg-green-500 text-white p-2 rounded w-48">Profile</button>
                    <button onClick={onLogout} className="bg-red-500 text-white p-2 rounded w-48">Log Out</button>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;