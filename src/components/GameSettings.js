import React, { useState, useEffect } from "react";
import { auth } from '../firebase/config';
import FunFact from './FunFact';
import useFunFact from '../hooks/useFunFact';

const GameSettings = ({ onClose, onSave, onReset, musicVolume }) => {
  const [tempMusicVolume, setTempMusicVolume] = useState(() => {
    const savedVolume = localStorage.getItem('musicVolume');
    return savedVolume ? parseInt(savedVolume) : (musicVolume || 50);
  });
  const [saveMessage, setSaveMessage] = useState('');
  const [selectedButton, setSelectedButton] = useState(-1);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const { showFunFact, showFunFactWithDelay } = useFunFact();

  // Check if user is using email/password authentication
  const isEmailProvider = auth.currentUser?.providerData[0]?.providerId === 'password';

  useEffect(() => {
    showFunFactWithDelay();
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

  const handleSave = async () => {
    await showFunFactWithDelay();
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

    // Don't handle keyboard events if keyboard help modal is open
    if (showKeyboardHelp) {
      if (event.key === 'Escape') {
        setShowKeyboardHelp(false);
      }
      return;
    }

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{ userSelect: 'none' }}>
      {showFunFact && <FunFact />}
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

        {/* Keyboard Navigation Help Button */}
        <div className="mb-6 text-center">
          <button
            onClick={() => setShowKeyboardHelp(true)}
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            Keyboard Navigation Guide
          </button>
        </div>

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

      {/* Keyboard Navigation Help Modal */}
      {showKeyboardHelp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-gray-800 text-white p-8 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl mb-6 text-center">Keyboard Navigation Guide</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xl mb-2 text-blue-400">Main Menu</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>↑/↓ - Navigate between menu options</li>
                  <li>Enter - Select menu option</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl mb-2 text-blue-400">Game Page</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>↑/↓/←/→ - Select Level</li>
                  <li>←/→ - Navigate the selected letters</li>
                  <li>Enter - Submit word/Attack</li>
                  <li>Backspace - Remove selected letter</li>
                  <li>H - Request a hint (if available)</li>
                  <li>Ctrl - Scramble the letters</li>
                  <li>Escape - Open Tabbar</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl mb-2 text-blue-400">Mini Game</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>←/→ - Navigate the selected letters</li>
                  <li>Enter - Submit word/Attack</li>
                  <li>Backspace - Remove selected letter</li>
                  <li>Escape - Open Tabbar</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl mb-2 text-blue-400">Settings</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>↑/↓ - Toggle between volume slider and buttons</li>
                  <li>←/→ - Adjust volume or navigate between buttons</li>
                  <li>Enter - Click selected button</li>
                  <li>Escape - Close settings</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl mb-2 text-blue-400">Profile</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>↑/↓ - Navigate between fields</li>
                  <li>Enter - Select avatar or save changes</li>
                  <li>Escape - Close profile</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl mb-2 text-blue-400">Avatar Selection</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>←/→ - Browse through avatars</li>
                  <li>Enter - Select current avatar</li>
                  <li>Escape - Close avatar selection</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl mb-2 text-blue-400">Important Notes</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-gray-300">
                    When a popup or modal is open, keyboard navigation only works for that specific window.
                    The background elements won't respond to keyboard input until the popup is closed.
                  </li>
                  <li className="text-gray-300">
                    In both Game Page and Mini Game, you can use keyboard navigation to select letters and form words.
                    The controls are consistent between both modes for ease of use.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setShowKeyboardHelp(false)}
                className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSettings;