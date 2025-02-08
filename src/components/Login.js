import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
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
            onLoginSuccess(user);
        } catch (error) {
            console.error('Google login error:', error);
            setError(error.message || 'Failed to process Google login');
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
            <div className="max-w-sm w-11/12">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 p-2 border border-gray-300 rounded text-black"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4 p-2 border border-gray-300 rounded text-black"
                        required
                    />
                    {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
                </form>
                <div className="mt-4 text-center">
                    <span>or</span>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-lg px-6 py-2 hover:bg-gray-50"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Sign in with Google
                    </button>
                </div>
                <p className="mt-4 text-center">New Here? <button onClick={onSwitchToSignup} className="text-blue-500 hover:text-blue-600">Sign Up</button></p>
            </div>
        </div>
    );
};

export default Login;
