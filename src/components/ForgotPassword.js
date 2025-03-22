import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    setError('No account found with this email address');
                    break;
                case 'auth/invalid-email':
                    setError('Please enter a valid email address');
                    break;
                case 'auth/too-many-requests':
                    setError('Too many attempts. Please try again later');
                    break;
                default:
                    setError('Failed to send reset email. Please try again');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg w-96 relative" onClick={e => e.stopPropagation()}>
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>
                <h2 className="text-2xl text-white mb-6 text-center">Reset Password</h2>

                {!success ? (
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-4">
                            <label className="block text-white mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className="text-green-400 mb-4">
                            Password reset link has been sent to your email.
                            Please check your inbox and follow the instructions.
                        </p>
                        <button
                            onClick={onClose}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;