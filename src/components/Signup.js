import React, { useState } from 'react';

const Signup = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        console.log('User  signed up:', email);
        onSwitchToLogin(); 
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSignup} className="flex flex-col">
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded text-black" 
                    required
                />
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
                <button type="button" onClick={onSwitchToLogin} className="mt-2 text-blue-500">Back to Login</button>
            </form>
        </div>
    );
};

export default Signup;