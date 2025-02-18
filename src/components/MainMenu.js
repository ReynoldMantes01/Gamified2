import React from 'react';

const MainMenu = ({ onPlay, onSettings, onProfile, onAlmanac, onLogout, onMiniGame, onScoreboard }) => {
    return (
        <div className="flex items-center justify-center min-h-screen b">
               <div
    style={{
        src: "/bg.gif",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}></div>
            <div className="text-center ">
                <h1 className="text-8xl font-bold text-white text-stroke-7 text-stroke-black mb-10">Gamified</h1>
                <h1 className="text-4xl text-white font-bold mb-5">Main Menu</h1>
                <div className="flex flex-col items-center space-y-2">
                    <button onClick={onPlay} className="bg-blue-500 text-white p-2 rounded w-48  hover:bg-blue-700 hover:scale-150 transition duration-200 transform">Play</button>
                    <button onClick={onMiniGame} className="bg-yellow-500 text-white p-2 rounded w-48 hover:bg-yellow-700 hover:scale-150 transition duration-200 transform">Mini Game</button>
                    <button onClick={onScoreboard} className="bg-green-500 text-white p-2 rounded w-48 hover:bg-green-700 hover:scale-150 transition duration-200 transform">Scoreboard</button>
                    <button onClick={onAlmanac} className="bg-purple-500 text-white p-2 rounded w-48 hover:bg-puple-700 hover:scale-150 transition duration-200 transform ">Almanac</button>
                    <button onClick={onSettings} className="bg-gray-500 text-white p-2 rounded w-48 hover:bg-grey-700 hover:scale-150 transition duration-200 transform">Settings</button>
                    <button onClick={onProfile} className="bg-green-500 text-white p-2 rounded w-48 hover:bg-green-700 hover:scale-150 transition duration-200 transform">Profile</button>
                    <button onClick={onLogout} className="bg-red-500 text-white p-2 rounded w-48 hover:bg-red-700 hover:scale-150 transition duration-200 transform">Log Out</button>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
