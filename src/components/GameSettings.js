import React, { useState, useEffect } from "react";

const GameSettings = ({ onClose, onSave, onReset, musicVolume }) => {
  // Initialize with current musicVolume or localStorage value
  const [tempMusicVolume, setTempMusicVolume] = useState(() => {
    const savedVolume = localStorage.getItem('musicVolume');
    return savedVolume ? parseInt(savedVolume) : (musicVolume || 50);
  });
  const [saveMessage, setSaveMessage] = useState('');

  // Update local state when musicVolume prop changes
  useEffect(() => {
    if (musicVolume !== undefined) {
      setTempMusicVolume(musicVolume);
    }
  }, [musicVolume]);

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setTempMusicVolume(newVolume);
    // Update volume in real-time for preview
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      audioElement.volume = newVolume / 100;
    }
    setSaveMessage(''); // Clear save message when volume changes
  };

  const handleSave = () => {
    onSave(tempMusicVolume);
    setSaveMessage('Settings saved!');
    // Clear message after 2 seconds
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleReset = () => {
    onReset();
    setSaveMessage('Settings reset!');
    // Clear message after 2 seconds
    setTimeout(() => setSaveMessage(''), 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-gray-800 text-white p-8 rounded w-[450px]">
        <h2 className="text-4xl mb-8 text-center">Settings</h2>
        <div className="mb-6">
          <label htmlFor="volume" className="block mb-4 text-center">Music Volume</label>
          <input
            type="range"
            id="volume"
            min="0"
            max="100"
            value={tempMusicVolume}
            onChange={handleVolumeChange}
            className="w-80 mx-auto block"
          />
          <p className="mt-4 text-center">Volume: {tempMusicVolume}%</p>
          {saveMessage && (
            <p className="mt-4 text-green-400 text-center">{saveMessage}</p>
          )}
        </div>
        <div className="flex space-x-4 justify-center">
          <button 
            onClick={handleSave} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
          <button 
            onClick={handleReset} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
          <button 
            onClick={onClose} 
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;