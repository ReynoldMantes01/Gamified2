import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const ChangePassword = ({ onClose }) => {
    // Check if user is using email/password authentication
    useEffect(() => {
        const provider = auth.currentUser?.providerData[0]?.providerId;
        if (provider !== 'password') {
            // If user is using social login, close the modal
            onClose();
        }
    }, [onClose]);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setError('New password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            // First, re-authenticate the user
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                currentPassword
            );
            await reauthenticateWithCredential(auth.currentUser, credential);

            // Then update the password
            await updatePassword(auth.currentUser, newPassword);
            setSuccess(true);
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                setError('Current password is incorrect');
            } else {
                setError('Failed to change password. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // If user is not using email/password auth, don't render anything
    if (auth.currentUser?.providerData[0]?.providerId !== 'password') {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg w-96 relative" onClick={e => e.stopPropagation()}>
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>
                <h2 className="text-2xl text-white mb-6 text-center">Change Password</h2>

                {!success ? (
                    <form onSubmit={handleChangePassword}>
                        <div className="mb-4">
                            <label className="block text-white mb-2">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white mb-2">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                required
                                minLength="6"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                required
                                minLength="6"
                            />
                        </div>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? 'Changing Password...' : 'Change Password'}
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className="text-green-400 mb-4">
                            Password has been successfully changed!
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

export default ChangePassword;