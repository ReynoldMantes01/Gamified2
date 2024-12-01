import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import GamePage from './components/GamePage';
import GameSettings from './components/GameSettings';
import Profile from './components/Profile';
import Login from './components/Login';  // New component
import Signup from './components/Signup';  // New component

const App = () => {
    const [currentPage, setCurrentPage] = useState('mainMenu');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);  // New state
    const [userData, setUserData] = useState(null);  // New state for user data
    const [profileData, setProfileData] = useState({
        image: '',
        username: '',
        age: '',
        gender: ''
    });

    // Handle login success
    const handleLoginSuccess = (user) => {
        setUserData(user);
        setIsAuthenticated(true);
        setCurrentPage('mainMenu'); // Redirect to main menu after login
    };

    // Handle logout
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserData(null);
        setCurrentPage('mainMenu'); // Redirect to main menu after logout
    };

    // Render the correct page based on currentPage
    const renderPage = () => {
        switch (currentPage) {
            case 'mainMenu':
                return (
                    <MainMenu
                        onPlay={() => isAuthenticated ? setCurrentPage('gamePage') : setCurrentPage('login')}
                        onSettings={() => setSettingsOpen(true)}
                        onProfile={() => setProfileOpen(true)}
                        onLogin={() => setCurrentPage('login')}
                        onSignup={() => setCurrentPage('signup')}
                        onLogout={handleLogout}
                        isAuthenticated={isAuthenticated}
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
            case 'login':
                return <Login onLoginSuccess={handleLoginSuccess} />;
            case 'signup':
                return <Signup onSignupSuccess={() => setCurrentPage('login')} />;
            default:
                return (
                    <MainMenu
                        onPlay={() => isAuthenticated ? setCurrentPage('gamePage') : setCurrentPage('login')}
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
            {profileOpen && (
                <Profile
                    onClose={() => setProfileOpen(false)}
                    onSave={() => setProfileOpen(false)}
                    profileData={profileData}
                    setProfileData={setProfileData}
                />
            )}
        </div>
    );
};

export default App;
