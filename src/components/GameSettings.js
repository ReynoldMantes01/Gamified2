import React, { useState } from 'react';

const GameSettings = ({ onClose }) => {
    const [musicVolume, setMusicVolume] = useState(50);
    const [soundVolume, setSoundVolume] = useState(50);

    const handleSave = () => {
        alert('Settings saved!');
    };

    const handleReset = () => {
        setMusicVolume(50);
        setSoundVolume(50);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20" onClick={onClose}>
            <div className="bg-gray-800 text-white p-8 rounded" onClick={(e) => e.stopPropagation()}>
                <h1 className="text-4xl mb-8 text-center">Game Settings</h1>
                <div className="mb-4 text-center">
                    <label className="block mb-2">Music Volume: {musicVolume}</label>
                    <input type="range" min="0" max="100" value={musicVolume} onChange={(e) => setMusicVolume(e.target.value)} className="w-64 mx-auto"/>
                </div>
                <div className="mb-4 text-center">
                    <label className="block mb-2">Sound Volume: {soundVolume}</label>
                    <input type="range" min="0" max="100" value={soundVolume} onChange={(e) => setSoundVolume(e.target.value)} className="w-64 mx-auto"/>
                </div>
                <div className="flex space-x-4 mb-4 justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSave}>Save</button>
                    <button className="bg-red-500 hover:bg-red-700 text -white font-bold py-2 px-4 rounded" onClick={handleReset}>Reset</button>
                </div>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-auto block" onClick={onClose}>Back</button>
            </div>
        </div>
    );
};

export default GameSettings;