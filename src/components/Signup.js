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
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="max-w-lg w-11/12 text-center">
                    <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
                    <div className="space-y-3">
                        <div className="border-y-2 border-blue-500 py-4 mx-auto">
                            <p className="text-sm  ">A verification link has been sent to:</p>
                            <p className="text-xs font-bold text-blue-500 mt-1 break-all">{email}</p>
                        </div>
                        <p className="text-sm text-gray-500">Please check your email and click the link to verify your account.</p>
                        <div className="pt-4">
                            <button 
                                onClick={onSwitchToLogin}
                                className="bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="max-w-lg w-11/12">
                <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
                <form onSubmit={handleSignup} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-black"
                        required
                    />
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-black"
                        required
                    />
                    {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">Sign Up</button>
                    <button 
                        type="button" 
                        onClick={onSwitchToLogin} 
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;