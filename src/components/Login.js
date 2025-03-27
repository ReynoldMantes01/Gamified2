import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import ForgotPassword from './ForgotPassword';

const Login = ({ onLoginSuccess, onSwitchToSignup }) => {
    const [email, setEmail] = useState(() => localStorage.getItem('savedEmail') || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

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
            localStorage.setItem('savedEmail', email);
            await initializeUserProfile(user);
            onLoginSuccess(user);
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

    const handleFacebookLogin = async () => {
        try {
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await initializeUserProfile(user);
            onLoginSuccess(user);
        } catch (error) {
            console.error('Facebook login error:', error);
            setError('Failed to process Facebook login');
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

                <div className="my-6 flex items-center justify-center">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <span className="px-4 text-gray-500">or</span>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleFacebookLogin}
                        className="flex items-center justify-center bg-[#1877F2] text-white rounded-lg p-3 hover:bg-[#1864D9] transition-colors shadow-md"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"
                            alt="Facebook"
                            className="w-6 h-6"
                        />
                    </button>
                </div>

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
