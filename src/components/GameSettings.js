import React, { useState, useEffect } from "react";
import { auth } from '../firebase/config';
import ChangePassword from './ChangePassword';

const GameSettings = ({ onClose, onSave, onReset, musicVolume }) => {
  const [tempMusicVolume, setTempMusicVolume] = useState(() => {
    const savedVolume = localStorage.getItem('musicVolume');
    return savedVolume ? parseInt(savedVolume) : (musicVolume || 50);
  });
  const [saveMessage, setSaveMessage] = useState('');
  const [selectedButton, setSelectedButton] = useState(-1);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Check if user is using email/password authentication
  const isEmailProvider = auth.currentUser?.providerData[0]?.providerId === 'password';

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
    // Prevent event propagation to background elements
    event.stopPropagation();

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
        
        {/* Music Volume Section */}
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
              className="w-full"
            />
            <div className="text-center mt-2">{tempMusicVolume}%</div>
          </div>
        </div>

        {/* Change Password Button - Only show for email/password users */}
        {isEmailProvider && (
          <div className="mb-6">
            <button
            type="button"
              onClick={() => setShowChangePassword(true)}
              className="text-blue-500 hover:text-blue-600 text-sm text-center"
            >
              Change Password
            </button>

          
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          {buttons.map((button, index) => (
            <button
              key={button.label}
              onClick={button.onClick}
              className={`${button.className} text-white px-6 py-2 rounded transition-all duration-200 ${
                selectedButton === index ? 'ring-2 ring-white scale-105' : ''
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>

        {saveMessage && (
          <div className="mt-4 text-center text-green-500">{saveMessage}</div>
        )}
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
};

export default GameSettings;