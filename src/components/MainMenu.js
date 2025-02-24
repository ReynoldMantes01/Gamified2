import React from 'react';

const MainMenu = ({ onPlay, onSettings, onProfile, onAlmanac, onLogout, onMiniGame, onScoreboard }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center pixelated" style={{ backgroundImage: "url('/bg.gif')" }}>
            <div className="text-center">
                <h1 className="text-8xl font-bold text-gray-300 mb-10 drop-shadow-[4px_4px_4px_black]">Gamified</h1>
                <h1 className="text-4xl font-bold text-gray-300 mb-5 drop-shadow-[2px_4px_4px_black]">Main Menu</h1>
                <div className="flex flex-col items-center space-y-2">
                    <button onClick={onPlay} className="bg-blue-500 text-white p-2 rounded w-48 hover:bg-blue-700 hover:scale-110 transition duration-200 ">Play</button>
                    <button onClick={onMiniGame} className="bg-yellow-500 text-white p-2 rounded w-48 hover:bg-yellow-700 hover:scale-110 transition duration-200 ">Mini Game</button>
                    <button onClick={onScoreboard} className="bg-green-500 text-white p-2 rounded w-48 hover:bg-green-700 hover:scale-110 transition duration-200 ">Scoreboard</button>
                    <button onClick={onAlmanac} className="bg-purple-500 text-white p-2 rounded w-48 hover:bg-purple-700 hover:scale-110 transition duration-200 ">Almanac</button>
                    <button onClick={onSettings} className="bg-gray-500 text-white p-2 rounded w-48 hover:bg-gray-700 hover:scale-110 transition duration-200 ">Settings</button>
                    <button onClick={onProfile} className="bg-green-500 text-white p-2 rounded w-48 hover:bg-green-700 hover:scale-110 transition duration-200 ">Profile</button>
                    <button onClick={onLogout} className="bg-red-500 text-white p-2 rounded w-48 hover:bg-red-700 hover:scale-110 transition duration-200 ">Log Out</button>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
