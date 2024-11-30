import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import GamePage from './components/GamePage';
import GameSettings from './components/GameSettings';
import Profile from './components/Profile';

const App = () => {
    const [currentPage, setCurrentPage] = useState('mainMenu');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        image: '',
        username: '',
        age: '',
        gender: ''
    });

    const renderPage = () => {
        switch (currentPage) {
            case 'mainMenu':
                return (
                    <MainMenu
                        onPlay={() => setCurrentPage('gamePage')}
                        onSettings={() => setSettingsOpen(true)}
                        onProfile={() => setProfileOpen(true)}
                    />
                );
            case 'gamePage':
                return (
                    <GamePage
                        onMainMenu={() => setCurrentPage('mainMenu')}
                        profileData={profileData}
                        setProfileData={setProfileData}
                    />
                );
            default:
                return (
                    <MainMenu
                        onPlay={() => setCurrentPage('gamePage')}
                        onSettings={() => setSettingsOpen(true)}
                        onProfile={() => setProfileOpen(true)}
                    />
                );
        }
    };

    return (
        <div>
            {renderPage()}
            {settingsOpen && <GameSettings onClose={() => setSettingsOpen(false)} />}
            {profileOpen && <Profile onClose={() => setProfileOpen(false)} onSave={() => setProfileOpen(false)} profileData={profileData} setProfileData={setProfileData} />}
        </div>
    );
};

export default App;