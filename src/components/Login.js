import React, { useState, useEffect } from 'react';

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

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === 'admin@gmail.com' && password === 'admin') {
            onLoginSuccess(); 
        } else {
            setError('Invalid email or password');
        }
    };

    if (showLoadingScreen) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-black">
                <h1 className="text-6xl font-bold text-white">Gamified</h1>
                
            </div>
        ); // Render the loading animation directly in Login.js
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
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
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
                <button type="button" onClick={onSwitchToSignup} className="mt-2 text-blue-500">Sign Up</button>
            </form>
        </div>
    );
};

export default Login;