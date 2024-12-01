import React, { useState } from 'react';

const Login = ({ onLoginSuccess, onBack, onSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Hardcoded users for demonstration purposes
    const users = [
        { email: 'test@example.com', password: 'password123' },
    ];

    const handleLogin = (e) => {
        e.preventDefault();

        // Check if email and password match hardcoded users
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // If login is successful, pass user data to parent component
            onLoginSuccess({ email: user.email });
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={onSignup}
                            className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <button
                    onClick={onBack}
                    className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default Login;
