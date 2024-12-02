import React, { useState } from 'react';

const Login = ({ onLoginSuccess, onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login logic
        if (email === 'admin@gmail.com' && password === 'admin') {
            onLoginSuccess();
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div>
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