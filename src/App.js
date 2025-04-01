import React, { useEffect, useRef, useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getDatabase, ref, set, get, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ModalProvider } from './context/ModalContext';
import MainMenu from "./components/MainMenu";
import GamePage from "./components/GamePage";
import MapSelection from "./components/MapSelection";
import GameSettings from "./components/GameSettings";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Slidebar from "./components/Slidebar";
import Almanac from "./components/Almanac";
import MiniGame from "./components/MiniGame";
import Scoreboard from "./components/Scoreboard"; // Import Scoreboard component
import bgImage from "./assets/bg.gif";
import bgMusic from "./assets/BG1.mp3";
import settingsSound from "./assets/SFX/settings.wav";
import almanacSound from "./assets/SFX/almanac.wav";
import scoreboardSound from "./assets/SFX/scoreboard.wav";
import bossFightMusic from "./assets/SFX/bossfight.wav";
import fightSound from "./assets/SFX/fightsound.wav";
import mapsData from "./components/maps.json";

const App = () => {
  const [currentPage, setCurrentPage] = useState("mainMenu");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(true);
  const [signupOpen, setSignupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scoreboardOpen, setScoreboardOpen] = useState(false); // Add scoreboardOpen state
  const [userProgress, setUserProgress] = useState(null);
  const [profileData, setProfileData] = useState({
    image: "",
    username: "",
    age: "",
    gender: "",
  });
  const [slidebarOpen, setSlidebarOpen] = useState(false);
  const [musicVolume, setMusicVolume] = useState(() => {
    // Try to get saved volume from localStorage first
    const savedVolume = localStorage.getItem('musicVolume');
    return savedVolume ? parseInt(savedVolume) : 50;
  });
  const [bossFight, setBossFight] = useState(false); // Add bossFight state
  const [fightSoundPlaying, setFightSoundPlaying] = useState(false); // Add fightSoundPlaying state
  const audioRef = useRef(null);
  const bossFightAudioRef = useRef(null);
  const fightSoundAudioRef = useRef(null);
  const settingsAudioRef = useRef(null);
  const almanacAudioRef = useRef(null);
  const scoreboardAudioRef = useRef(null);
  const bgMusicAudioRef = useRef(null);
  const db = getDatabase();



  // Update audio volume whenever musicVolume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume / 100;
      // Save to localStorage for immediate persistence
      localStorage.setItem('musicVolume', musicVolume.toString());
    }
    if (bossFightAudioRef.current) {
      bossFightAudioRef.current.volume = musicVolume / 100;
    }
    if (fightSoundAudioRef.current) {
      fightSoundAudioRef.current.volume = musicVolume / 100;
    }
    if (settingsAudioRef.current) {
      settingsAudioRef.current.volume = musicVolume / 100;
    }
    if (almanacAudioRef.current) {
      almanacAudioRef.current.volume = musicVolume / 100;
    }
    if (scoreboardAudioRef.current) {
      scoreboardAudioRef.current.volume = musicVolume / 100;
    }
    if (bgMusicAudioRef.current) {
      bgMusicAudioRef.current.volume = musicVolume / 100;
    }
  }, [musicVolume]);

  // Add a specific effect to handle page changes and control audio
  useEffect(() => {
    // Stop all audio first
    const stopAllAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (bossFightAudioRef.current) {
        bossFightAudioRef.current.pause();
        bossFightAudioRef.current.currentTime = 0;
      }
      if (fightSoundAudioRef.current) {
        fightSoundAudioRef.current.pause();
        fightSoundAudioRef.current.currentTime = 0;
      }
      if (settingsAudioRef.current) {
        settingsAudioRef.current.pause();
        settingsAudioRef.current.currentTime = 0;
      }
      if (almanacAudioRef.current) {
        almanacAudioRef.current.pause();
        almanacAudioRef.current.currentTime = 0;
      }
      if (scoreboardAudioRef.current) {
        scoreboardAudioRef.current.pause();
        scoreboardAudioRef.current.currentTime = 0;
      }
      if (bgMusicAudioRef.current) {
        bgMusicAudioRef.current.pause();
        bgMusicAudioRef.current.currentTime = 0;
      }
    };

    stopAllAudio();

    // Play the appropriate audio based on current page
    if (currentPage === "gamePage") {
      // GamePage has its own audio handling with boss fights
      if (bossFight && bossFightAudioRef.current) {
        bossFightAudioRef.current.play().catch(err => {
          console.error("Error playing boss fight music:", err);
        });
      } else if (!bossFight && fightSoundPlaying && fightSoundAudioRef.current) {
        fightSoundAudioRef.current.play().catch(err => {
          console.error("Error playing fight sound:", err);
        });
      }
    } else if ((currentPage === "settings" || currentPage === "miniGame") && settingsAudioRef.current) {
      settingsAudioRef.current.play().catch(err => {
        console.error("Error playing settings sound:", err);
      });
    } else if (currentPage === "almanac" && almanacAudioRef.current) {
      almanacAudioRef.current.play().catch(err => {
        console.error("Error playing almanac sound:", err);
      });
    } else if (currentPage === "scoreboard" && scoreboardAudioRef.current) {
      scoreboardAudioRef.current.play().catch(err => {
        console.error("Error playing scoreboard sound:", err);
      });
    } else if (bgMusicAudioRef.current) {
      bgMusicAudioRef.current.play().catch(err => {
        console.error("Error playing background music:", err);
      });
    }
  }, [currentPage, bossFight, fightSoundPlaying]);

  // Setup real-time listener for music volume when user is authenticated
  useEffect(() => {
    if (profileData?.uid) {
      const settingsRef = ref(db, `users/${profileData.uid}/settings`);
      
      // First load the initial value
      get(settingsRef).then((snapshot) => {
        if (snapshot.exists() && snapshot.val().musicVolume !== undefined) {
          const savedVolume = snapshot.val().musicVolume;
          setMusicVolume(savedVolume);
          localStorage.setItem('musicVolume', savedVolume.toString());
        } else {
          // If no saved volume in database, save the current volume
          set(settingsRef, {
            musicVolume: musicVolume
          });
        }
      }).catch((error) => {
        console.error('Error loading initial volume:', error);
      });

      // Then set up real-time listener for future changes
      const unsubscribe = onValue(settingsRef, (snapshot) => {
        if (snapshot.exists() && snapshot.val().musicVolume !== undefined) {
          const savedVolume = snapshot.val().musicVolume;
          setMusicVolume(savedVolume);
          localStorage.setItem('musicVolume', savedVolume.toString());
        }
      }, (error) => {
        console.error('Error loading settings:', error);
      });

      return () => unsubscribe();
    }
  }, [db, profileData]);

  // Function to force reload user progress data from Firebase
  const reloadUserProgress = () => {
    console.log("Forcing reload of user progress data from Firebase");
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Reloaded user progress:", data);
          setUserProgress(data);
        } else {
          console.log("No user data found during reload");
        }
      }).catch(error => {
        console.error("Error reloading user progress:", error);
      });
    } else {
      console.log("No user logged in, can't reload progress");
    }
  };

  // Add useEffect to fetch user progress
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
        
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserProgress(data);
            setIsAuthenticated(true);
          }
        });
      } else {
        // User is signed out
        setUserProgress(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to handle level selection
  const handleLevelSelect = (levelData) => {
    console.log("Level selected:", levelData);

    // Always allow microbe in first map
    if (levelData.selectedMap.id === "map1" && levelData.enemy.name.toLowerCase() === "microbe") {
        console.log("First enemy in first map is always unlocked");

      setSelectedLevel(levelData);
      setCurrentPage("gamePage");
      return;
  }

    // Check if user has required progress
    const enemyName = levelData.enemy.name.toLowerCase().replace(' ', '_');
    if (userProgress?.unlockedEnemies?.includes(enemyName)) {
        console.log(`Enemy ${enemyName} is unlocked, proceeding to game page`);
        setSelectedLevel(levelData);
        setCurrentPage("gamePage");
    } else {
        console.log(`Enemy ${enemyName} is locked, cannot proceed`);
    }
};


  // Save music volume to database
  const handleSettingsSave = async (newMusicVolume) => {
    if (profileData?.uid) {
      try {
        const settingsRef = ref(db, `users/${profileData.uid}/settings`);
        await set(settingsRef, {
          musicVolume: newMusicVolume
        });
        setMusicVolume(newMusicVolume);
        localStorage.setItem('musicVolume', newMusicVolume.toString());
        console.log('Music volume saved successfully');
      } catch (error) {
        console.error('Error saving music volume:', error);
      }
    } else {
      // If not logged in, just save to localStorage
      setMusicVolume(newMusicVolume);
      localStorage.setItem('musicVolume', newMusicVolume.toString());
    }
  };

  const handleSettingsReset = async () => {
    const defaultVolume = 50;
    if (profileData?.uid) {
      try {
        const settingsRef = ref(db, `users/${profileData.uid}/settings`);
        await set(settingsRef, {
          musicVolume: defaultVolume
        });
        setMusicVolume(defaultVolume);
        localStorage.setItem('musicVolume', defaultVolume.toString());
        console.log('Music volume reset successfully');
      } catch (error) {
        console.error('Error resetting music volume:', error);
      }
    } else {
      // If not logged in, just save to localStorage
      setMusicVolume(defaultVolume);
      localStorage.setItem('musicVolume', defaultVolume.toString());
    }
  };

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

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setLoginOpen(false);
    setCurrentPage("mainMenu");

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

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');

    console.log('Logged out successfully');
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
            onPlay={() => setCurrentPage("mapSelection")}
            onSettings={() => setSettingsOpen(true)}
            onProfile={() => setProfileOpen(true)}
            onAlmanac={() => setCurrentPage("almanac")}
            onLogout={handleLogout}
            onMiniGame={() => setCurrentPage("miniGame")}
            onScoreboard={() => setScoreboardOpen(true)} // Add onScoreboard handler
          />
        );
        case "mapSelection":
          return (
              <MapSelection
                  maps={mapsData.maps}
                  onLevelSelect={handleLevelSelect}
                  onMainMenu={() => {
                      setCurrentPage("mainMenu");
                  }}          
                  startingMapIndex={0}
              />
          );
      
      case "gamePage":
        return (
          <GamePage
            level={selectedLevel}
            onMainMenu={() => {
              console.log("Returning to Main Menu.");
              setCurrentPage("mainMenu");
          }}
          
            backgroundImage={selectedLevel?.background || "defaultBackground.jpg"}
            profileData={profileData}
            setProfileData={setProfileData}
            onLogout={handleLogout} 
            musicVolume={musicVolume}
            setMusicVolume={setMusicVolume}
            reload={reloadUserProgress}
            bossFight={bossFight}
            setBossFight={setBossFight}
            fightSoundPlaying={fightSoundPlaying}
            setFightSoundPlaying={setFightSoundPlaying}
          />
        );
      case "almanac":
        return <Almanac
        onMainMenu={() => {
          console.log("Returning to Main Menu.");
          setCurrentPage("mainMenu");
      }}      
         />;
      case "miniGame":
        return (
          <MiniGame
          onMainMenu={() => {
            console.log("Returning to Main Menu.");
            setCurrentPage("mainMenu");
        }}       
            onLogout={handleLogout}
            musicVolume={musicVolume}
            setMusicVolume={setMusicVolume}
            profileData={profileData}
            setProfileData={setProfileData}
          />
        );
      default:
        return <MainMenu onPlay={() => setCurrentPage("gamePage")} />;
    }
  };

  return (
    <ModalProvider value={{ settingsOpen, profileOpen, loginOpen, signupOpen, scoreboardOpen }}>
      <GoogleOAuthProvider clientId="157299428708-eraakaj5sblugtout401ailphf12j81n.apps.googleusercontent.com">
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
          {/* Audio Elements */}
          {bossFight && currentPage === "gamePage" && (
            <audio ref={bossFightAudioRef} src={bossFightMusic} loop preload="auto" />
          )}
          {fightSoundPlaying && currentPage === "gamePage" && (
            <audio ref={fightSoundAudioRef} src={fightSound} loop preload="auto" />
          )}
          {(currentPage === "settings" || currentPage === "miniGame") && (
            <audio ref={settingsAudioRef} src={settingsSound} loop preload="auto" />
          )}
          {currentPage === "almanac" && (
            <audio ref={almanacAudioRef} src={almanacSound} loop preload="auto" />
          )}
          {currentPage === "scoreboard" && (
            <audio ref={scoreboardAudioRef} src={scoreboardSound} loop preload="auto" />
          )}
          {currentPage !== "settings" && currentPage !== "almanac" && currentPage !== "scoreboard" && currentPage !== "miniGame" && currentPage !== "gamePage" && (
            <audio ref={bgMusicAudioRef} src={bgMusic} loop preload="auto" />
          )}
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
          {scoreboardOpen && (
            <Scoreboard 
              onMainMenu={() => {
                console.log("Returning to Main Menu. Stopping Timer.");
                setScoreboardOpen(false); // Hide scoreboard
                setCurrentPage("mainMenu");
              }} 
            />
          )}
          <Slidebar
            isOpen={slidebarOpen}
            toggleSlidebar={() => setSlidebarOpen(!slidebarOpen)}
            onMainMenu={() => {
              console.log("Returning to Main Menu. Stopping Timer.");
              setCurrentPage("mainMenu");
          }}          
            setSettingsOpen={setSettingsOpen}
            setProfileOpen={setProfileOpen}
            onLogout={handleLogout}
            musicVolume={musicVolume}
          />
        </div>
      </GoogleOAuthProvider>
    </ModalProvider>
  );
};

export default App;
