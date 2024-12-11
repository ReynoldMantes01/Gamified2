import React, { useState } from "react";

const GameSettings = ({ onClose, onSave, onReset, musicVolume }) => {
  const [tempMusicVolume, setTempMusicVolume] = useState(musicVolume);

  const handleSave = () => {
    onSave(tempMusicVolume);
  };

  const handleReset = () => {
    setTempMusicVolume(50); // Reset to default value
    onReset();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-sm w-11/12 sm:w-96">
        <h2 className="text-xl mb-4">Game Settings</h2>
        <div className="mb-4">
          <label htmlFor="volume" className="block mb-2">Music Volume</label>
          <input
            type="range"
            id="volume"
            min="0"
            max="100"
            value={tempMusicVolume}
            onChange={(e) => setTempMusicVolume(Number(e.target.value))}
            className="w-full"
          />
          <p className="mt-2 text-sm">Volume: {tempMusicVolume}%</p>
        </div>
        <div className="flex space-x-4 mb-4 justify-center">
        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save
          </button>
          <button onClick={handleReset} className="bg-red-500 hover:bg-red-700 text -white font-bold py-2 px-4 rounded">
            Reset
          </button>

        </div>
        <div className="flex justify-center">
          <button onClick={onClose} className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-700">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;