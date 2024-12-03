import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import GamePage from './components/GamePage';
import GameSettings from './components/GameSettings';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Slidebar from './components/Slidebar';
import bgImage from './assets/bg.gif'; // Import the background image

const App = () => {
    const [currentPage, setCurrentPage] = useState('mainMenu');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(true);
    const [signupOpen, setSignupOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileData, setProfileData] = useState({
        image: '',
        username: '',
        age: '',
        gender: ''
    });
    const [slidebarOpen, setSlidebarOpen] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setLoginOpen(false);
        setCurrentPage('mainMenu');
    };

    const handleSignupSuccess = () => {
        setSignupOpen(false);
        setLoginOpen(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setLoginOpen(true);
        setCurrentPage('mainMenu');
        setSlidebarOpen(false);
    };

    const renderLoginPopup = () => {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                <div className="bg-gray-800 text-white p-8 rounded w-96">
                    <Login onLoginSuccess={handleLoginSuccess} onSwitchToSignup={() => { setLoginOpen(false); setSignupOpen(true); }} />
                </div>
            </div>
        );
    };

    const renderSignupPopup = () => {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                <div className="bg-gray-800 text-white p-8 rounded w-96">
                    <Signup onSwitchToLogin={handleSignupSuccess} />
                </div>
            </div>
        );
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'mainMenu':
                return (
                    <MainMenu
                        onPlay={() => isAuthenticated ? setCurrentPage('gamePage') : setLoginOpen(true)}
                        onSettings={() => setSettingsOpen(true)}
                        onProfile={() => setProfileOpen(true)}
                        onLogout={handleLogout}
                    />
                );
            case 'gamePage':
                return (
                    <GamePage
                        onMainMenu={() => setCurrentPage('mainMenu')}
                        profileData={profileData}
                        setProfileData={setProfileData}
                        onLogout={handleLogout}
                    />
                );
            default:
                return <MainMenu onPlay={() => setCurrentPage('gamePage')} />;
        }
    };

    return (
        <div 
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }} // Use the imported background image
        >
            {loginOpen && renderLoginPopup()}
            {signupOpen && renderSignupPopup()}
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
            <Slidebar 
                isOpen={slidebarOpen}
                toggleSlidebar={() => setSlidebarOpen(!slidebarOpen)}
                onMainMenu={() => setCurrentPage('mainMenu')}
                setSettingsOpen={setSettingsOpen}
                setProfileOpen={setProfileOpen}
                onLogout={handleLogout}
            />
        </div>
    );
};

export default App;