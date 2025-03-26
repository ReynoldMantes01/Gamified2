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
import mapsData from "./components/maps.json";

const App = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
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
  const audioRef = useRef(null);
  const db = getDatabase();

// Timer when game start  
    useEffect(() => {
      let timer;
      if (timerRunning) {
          timer = setInterval(() => {
              setElapsedTime(prev => prev + 1);
          }, 1000);
      } else {
          clearInterval(timer);
      }
      return () => clearInterval(timer);
  }, [timerRunning]);


  // Update audio volume whenever musicVolume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume / 100;
      // Save to localStorage for immediate persistence
      localStorage.setItem('musicVolume', musicVolume.toString());
    }
  }, [musicVolume]);

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

        setTimerRunning((prev) => {
          if (!prev) {
              console.log("Resuming Timer...");
              return true;
          }
          return prev;
      });

      setSelectedLevel(levelData);
      setCurrentPage("gamePage");
      return;
  }

    // Check if user has required progress
    const enemyName = levelData.enemy.name.toLowerCase().replace(' ', '_');
    if (userProgress?.unlockedEnemies?.includes(enemyName)) {
        console.log(`Enemy ${enemyName} is unlocked, proceeding to game page`);

        // Ensure Timer Doesn't Reset When Switching Enemies
        setTimerRunning((prev) => {
            if (!prev) {
                console.log("Starting Timer");
                return true;
            }
            return prev;
        });

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
    setTimerRunning(false);
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
                  setTimerRunning={setTimerRunning}
                  onMainMenu={() => {
                      console.log("Returning to Main Menu. Stopping Timer.");
                      setTimerRunning(false);
                      setCurrentPage("mainMenu");
                  }}          
                  startingMapIndex={0}
              />
          );
      
      case "gamePage":
        return (
          <GamePage
            level={selectedLevel}
            elapsedTime={elapsedTime}
            setElapsedTime={setElapsedTime}
            setTimerRunning={setTimerRunning}
            onMainMenu={() => {
              console.log("Returning to Main Menu. Stopping Timer.");
              setTimerRunning(false); // Stop timer only when quitting
              setCurrentPage("mainMenu");
          }}
          
            backgroundImage={selectedLevel?.background || "defaultBackground.jpg"}
            profileData={profileData}
            setProfileData={setProfileData}
            onLogout={handleLogout} 
            musicVolume={musicVolume}
            setMusicVolume={setMusicVolume}
            reload={reloadUserProgress}
          />
        );
      case "almanac":
        return <Almanac
        onMainMenu={() => {
          console.log("Returning to Main Menu. Stopping Timer.");
          setTimerRunning(false); // Stop timer only when quitting
          setCurrentPage("mainMenu");
      }}      
         />;
      case "miniGame":
        return (
          <MiniGame
          onMainMenu={() => {
            console.log("Returning to Main Menu. Stopping Timer.");
            setTimerRunning(false); // Stop timer only when quitting
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
          {scoreboardOpen && (
            <Scoreboard 
            onMainMenu={() => {
              console.log("Returning to Main Menu. Stopping Timer.");
              setTimerRunning(false); // Stop timer only when quitting
              setCurrentPage("mainMenu");
          }}          
            />
          )}
          <Slidebar
            isOpen={slidebarOpen}
            toggleSlidebar={() => setSlidebarOpen(!slidebarOpen)}
            onMainMenu={() => {
              console.log("Returning to Main Menu. Stopping Timer.");
              setTimerRunning(false); // Stop timer only when quitting
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
