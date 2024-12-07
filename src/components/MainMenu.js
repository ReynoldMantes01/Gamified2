import React from 'react';

const MainMenu = ({ onPlay, onSettings, onProfile, onAlmanac, onLogout }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="text-center ">
                <h1 className="text-8xl font-bold text-white text-stroke-7 text-stroke-black mb-10">Gamified</h1>
                <h1 className="text-4xl text-white font-bold mb-5">Main Menu</h1>
                <div className="flex flex-col items-center space-y-2">
                    <button onClick={onPlay} className="bg-blue-500 text-white p-2 rounded w-48">Play</button>
                    <button onClick={onAlmanac} className="bg-purple-500 text-white p-2 rounded w-48">Almanac</button>
                    <button onClick={onSettings} className="bg-gray-500 text-white p-2 rounded w-48">Settings</button>
                    <button onClick={onProfile} className="bg-green-500 text-white p-2 rounded w-48">Profile</button>
                    <button onClick={onLogout} className="bg-red-500 text-white p-2 rounded w-48">Log Out</button>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
