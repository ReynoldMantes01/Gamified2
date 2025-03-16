import React, { useState, useEffect } from "react";

const GameSettings = ({ onClose, onSave, onReset, musicVolume }) => {
  const [tempMusicVolume, setTempMusicVolume] = useState(() => {
    const savedVolume = localStorage.getItem('musicVolume');
    return savedVolume ? parseInt(savedVolume) : (musicVolume || 50);
  });
  const [saveMessage, setSaveMessage] = useState('');
  const [selectedButton, setSelectedButton] = useState(-1); // -1 for volume, 0-2 for buttons

  useEffect(() => {
    if (musicVolume !== undefined) {
      setTempMusicVolume(musicVolume);
    }
  }, [musicVolume]);

  const handleVolumeChange = (newVolume) => {
    const clampedVolume = Math.max(0, Math.min(100, newVolume));
    setTempMusicVolume(clampedVolume);
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      audioElement.volume = clampedVolume / 100;
    }
    setSaveMessage('');
  };

  const handleSave = () => {
    onSave(tempMusicVolume);
    setSaveMessage('Settings saved!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleReset = () => {
    onReset();
    setSaveMessage('Settings reset!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleKeyPress = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        if (selectedButton === -1) {
          handleVolumeChange(tempMusicVolume - 5);
        } else {
          setSelectedButton(prev => (prev <= 0 ? 2 : prev - 1));
        }
        break;
      case 'ArrowRight':
        if (selectedButton === -1) {
          handleVolumeChange(tempMusicVolume + 5);
        } else {
          setSelectedButton(prev => (prev >= 2 ? 0 : prev + 1));
        }
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        setSelectedButton(prev => prev === -1 ? 0 : -1);
        break;
      case 'Enter':
        if (selectedButton === 0) handleSave();
        else if (selectedButton === 1) handleReset();
        else if (selectedButton === 2) onClose();
        break;
      case 'Shift':
        handleReset();
        break;
      case 'Escape':
        onClose();
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
  }, [selectedButton, tempMusicVolume]);

  const buttons = [
    { label: 'Save', onClick: handleSave, className: 'bg-blue-500 hover:bg-blue-700' },
    { label: 'Reset', onClick: handleReset, className: 'bg-red-500 hover:bg-red-700' },
    { label: 'Back', onClick: onClose, className: 'bg-gray-600 hover:bg-gray-700' }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-gray-800 text-white p-8 rounded w-[450px]">
        <h2 className="text-4xl mb-8 text-center">Settings</h2>
        <div className="mb-6">
          <label htmlFor="volume" className="block mb-4 text-center">Music Volume</label>
          <div className={`p-2 rounded ${selectedButton === -1 ? 'ring-2 ring-white' : ''}`}>
            <input
              type="range"
              id="volume"
              min="0"
              max="100"
              value={tempMusicVolume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-80 mx-auto block"
            />
            <p className="mt-4 text-center">Volume: {tempMusicVolume}%</p>
          </div>
          {saveMessage && (
            <p className="mt-4 text-green-400 text-center">{saveMessage}</p>
          )}
        </div>
        <div className="flex space-x-4 justify-center">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`${button.className} text-white font-bold py-2 px-4 rounded transition-all duration-200
                ${selectedButton === index ? 'ring-2 ring-white scale-110' : ''}`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameSettings;