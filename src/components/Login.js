import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import ForgotPassword from './ForgotPassword';
import FunFact from './FunFact';
import Bg from '../assets/Science Quest Icon.png';
const Login = ({ onLoginSuccess, onSwitchToSignup }) => {
    const [email, setEmail] = useState(() => localStorage.getItem('savedEmail') || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showFunFact, setShowFunFact] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoadingScreen(false);
            setShowFunFact(true);
        }, 1000);
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
                profile: {
                    username: user.email.split('@')[0],
                    updatedAt: new Date().toISOString()
                }
            });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Check if the user's email is verified
            if (!user.emailVerified) {
                setError('Please verify your email!');
                return;
            }
            
            localStorage.setItem('savedEmail', email);
            handleLoginSuccess(user);
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    setError('No account found with this email');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address');
                    break;
                default:
                    setError('Failed to log in. Please try again.');
            }
        }
    };

    const handleLoginSuccess = (user) => {
        setShowFunFact(true);
        initializeUserProfile(user).then(() => {
            onLoginSuccess(user);
        });
    };

    if (showLoadingScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black">
            <img 
              src={Bg} 
              alt="Gamified" 
              className="w-3/4 sm:w-1/2 md:w-1/3 max-w-lg h-auto" 
            />
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
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-blue-500 hover:text-blue-600 text-sm text-center"
                    >
                        Forgot Password?
                    </button>
                </form>

                <p className="text-center mt-4">
                    Don't have an account?{' '}
                    <button
                        onClick={onSwitchToSignup}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Sign up
                    </button>
                </p>
            </div>

            {showForgotPassword && (
                <ForgotPassword onClose={() => setShowForgotPassword(false)} />
            )}
        </div>
    );
};

export default Login;
