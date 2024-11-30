import React from 'react';

const MainMenu = ({ onPlay, onSettings, onProfile }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
            <h1 className="text-4xl mb-8">Main Menu</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={onPlay}>Play</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={onSettings}>Settings</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={onProfile}>Profile</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
    );
};

export default MainMenu;