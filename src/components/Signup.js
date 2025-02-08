import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const Signup = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [verificationSent, setVerificationSent] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Send verification email
            await sendEmailVerification(user);
            setVerificationSent(true);

            // Store the name in the database (you can add this later)
            // For now, we'll just show the verification message

        } catch (error) {
            setError(error.message || 'Signup failed');
        }
    };

    if (verificationSent) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
                <p className="mb-4">A verification link has been sent to {email}.</p>
                <p className="mb-4">Please check your email and click the link to verify your account.</p>
                <button 
                    onClick={onSwitchToLogin}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSignup} className="flex flex-col">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded text-black"
                    required
                />
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
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Sign Up</button>
                <button 
                    type="button" 
                    onClick={onSwitchToLogin} 
                    className="mt-2 text-blue-500 hover:text-blue-600"
                >
                    Back to Login
                </button>
            </form>
        </div>
    );
};

export default Signup;