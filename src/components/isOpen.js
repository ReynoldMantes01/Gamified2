import React, { useState } from 'react';
import Slidebar from './Slidebar';

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSlidebar = () => setIsOpen(!isOpen);

    return (
        <div className="h-screen bg-gray-800 flex items-center justify-center">
            <button
                onClick={toggleSlidebar}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
                Toggle Slidebar
            </button>
            <Slidebar
                isOpen={isOpen}
                toggleSlidebar={toggleSlidebar}
                onMainMenu={() => alert('Main Menu Clicked')}
                setSettingsOpen={(isOpen) => console.log('Settings Open', isOpen)}
                setProfileOpen={(isOpen) => console.log('Profile Open', isOpen)}
                onLogout={() => alert('Logout Clicked')}
            />
        </div>
    );
}

export default App;