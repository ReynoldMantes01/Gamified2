import React, { useEffect, useRef, useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import MainMenu from "./components/MainMenu";
import GamePage from "./components/GamePage";
import MapSelection from "./components/MapSelection";
import GameSettings from "./components/GameSettings";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Slidebar from "./components/Slidebar";
import Almanac from "./components/Almanac"; // Import Almanac component
import bgImage from "./assets/bg.gif";
import bgMusic from "./assets/BG1.mp3";
import mapsData from "./components/maps.json";

const App = () => {
  const [currentPage, setCurrentPage] = useState("mainMenu");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(true);
  const [signupOpen, setSignupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState({
    image: "",
    username: "",
    age: "",
    gender: "",
  });
  const [slidebarOpen, setSlidebarOpen] = useState(false);
  const [musicVolume, setMusicVolume] = useState(50);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume / 100;
    }
  }, [musicVolume]);

  useEffect(() => {
    const playMusic = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error("Autoplay blocked. Waiting for user interaction.");
        }
      }
    };

    playMusic();

    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  const handleSettingsSave = (newMusicVolume) => {
    setMusicVolume(newMusicVolume);
    setSettingsOpen(false);
  };

  const handleSettingsReset = () => {
    setMusicVolume(50);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setLoginOpen(false);
    setCurrentPage("mainMenu");

    // Persist authentication state
    localStorage.setItem('isAuthenticated', 'true');

    const userName = localStorage.getItem('userName');
    if (userName) {
      setProfileData(prev => ({
        ...prev,
        username: userName
      }));
    }

    console.log('Login successful, navigating to main menu');
  };

  useEffect(() => {
    const authState = localStorage.getItem('isAuthenticated');
    if (authState === 'true') {
      setIsAuthenticated(true);
      setLoginOpen(false);
      setCurrentPage("mainMenu");
    }
  }, []);

  const handleSignupSuccess = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginOpen(true);
    setCurrentPage("mainMenu");
    setSlidebarOpen(false);

    // Clear authentication state and user data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');

    console.log('Logged out successfully');
  };

  const handleLevelSelect = (level) => {
      setSelectedLevel(level);
      setCurrentPage("gamePage");
    };

  const renderLoginPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-sm w-11/12 sm:w-96">
        <Login
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={() => {
            setLoginOpen(false);
            setSignupOpen(true);
          }}
        />
      </div>
    </div>
  );

  const renderSignupPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-sm w-11/12 sm:w-96">
        <Signup onSwitchToLogin={handleSignupSuccess} />
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case "mainMenu":
        return (
          <MainMenu
            onPlay={() => (isAuthenticated ? setCurrentPage("mapSelection") : setLoginOpen(true))}
            onSettings={() => setSettingsOpen(true)}
            onProfile={() => setProfileOpen(true)}
            onAlmanac={() => setCurrentPage("almanac")} // Navigate to Almanac
            onLogout={handleLogout}
          />
        );
      case "mapSelection":
        return (
          <MapSelection
            maps={mapsData.maps}
            onLevelSelect={handleLevelSelect}
            onMainMenu={() => setCurrentPage("mainMenu")}
            startingMapIndex={0}
          />
        );
      case "gamePage":
        return (
          <GamePage
            level={selectedLevel}
            onMainMenu={() => setCurrentPage("mainMenu")}
            backgroundImage={selectedLevel?.background || "defaultBackground.jpg"}
            profileData={profileData}
            setProfileData={setProfileData}
            onLogout={handleLogout} 
            musicVolume={musicVolume}
            setMusicVolume={setMusicVolume}
          />
        );
      case "almanac":
        return <Almanac onMainMenu={() => setCurrentPage("mainMenu")} />;
      default:
        return <MainMenu onPlay={() => setCurrentPage("gamePage")} />;
    }
  };

  return (
    <GoogleOAuthProvider clientId="157299428708-eraakaj5sblugtout401ailphf12j81n.apps.googleusercontent.com">
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
        {/* Background Music */}
        <audio ref={audioRef} src={bgMusic} loop preload="auto" />

        {loginOpen && renderLoginPopup()}
        {signupOpen && renderSignupPopup()}
        {renderPage()}
        {settingsOpen && (
          <GameSettings 
            onClose={() => setSettingsOpen(false)}
            onSave={handleSettingsSave}
            onReset={handleSettingsReset}
            musicVolume={musicVolume}
          />
        )}
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
          onMainMenu={() => setCurrentPage("mainMenu")}
          setSettingsOpen={setSettingsOpen}
          setProfileOpen={setProfileOpen}
          onLogout={handleLogout}
          musicVolume={musicVolume}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
