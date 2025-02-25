import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';

const Login = ({ onLoginSuccess, onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoadingScreen(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const initializeUserProfile = async (user) => {
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
        
        // Check if user profile exists
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
            // Initialize new user profile with only first map and enemy unlocked
            await set(userRef, {
                email: user.email,
                currentLevel: 1,
                currentWorld: 1,
                unlockedWorlds: ["map1"],  // Only first world unlocked
                unlockedEnemies: ["microbe"],  // Only first enemy unlocked
                defeatedEnemies: [],
                experience: 0,
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await initializeUserProfile(user);
            onLoginSuccess(user);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await initializeUserProfile(user);
            onLoginSuccess(user);
        } catch (error) {
            console.error('Google login error:', error);
            setError(error.message || 'Failed to process Google login');
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await initializeUserProfile(user);
            onLoginSuccess(user);
        } catch (error) {
            console.error('Facebook login error:', error);
            setError(error.message || 'Failed to process Facebook login');
        }
    };

    if (showLoadingScreen) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-black">
                <h1 className="text-6xl font-bold text-white">Gamified</h1>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="max-w-lg w-11/12">
                <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-black"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-black"
                        required
                    />
                    {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">Login</button>
                </form>
                <div className="my-6 flex items-center justify-center">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <span className="px-4 text-gray-500">or</span>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center gap-3 border-2 border-gray-300 rounded-lg px-6 py-3 hover:border-blue-500 transition-colors"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="w-4 h-5"
                        />
                        Google
                    </button>
                    <button
                        onClick={handleFacebookLogin}
                        className="flex items-center justify-center gap-3 border-2 border-gray-300 rounded-lg px-6 py-3 hover:border-blue-500 transition-colors"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"
                            alt="Facebook"
                            className="w-4 h-5"
                        />
                        Facebook
                    </button>
                </div>
                <p className="mt-6 text-center">
                    New Here? 
                    <button onClick={onSwitchToSignup} className="text-blue-500 hover:text-blue-600 transition-colors ml-2">
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
