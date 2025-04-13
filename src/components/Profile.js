import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { getDatabase, ref, set, get, onValue } from 'firebase/database';
import alienAvatar from '../assets/avatar/ALIEN AVATAR.jpg';
import astronautAvatar from '../assets/avatar/ASTRONOUT AVATAR.jpg';
import geishaAvatar from '../assets/avatar/GEISHA AVATAR.jpg';
import AvatarSelectionPopup from './AvatarSelectionPopup';
import ChangePassword from './ChangePassword';
import FunFact from './FunFact';
import useFunFact from '../hooks/useFunFact';

const Profile = ({ onClose, profileData, setProfileData }) => {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAvatarPopup, setShowAvatarPopup] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [selectedField, setSelectedField] = useState(0);
    const { showFunFact, showFunFactWithDelay } = useFunFact();

    useEffect(() => {
        const loadProfileData = async () => {
            if (!auth.currentUser) {
                setLoading(false);
                return;
            }

            try {
                const db = getDatabase();
                const userId = auth.currentUser.uid;
                const profileRef = ref(db, `users/${userId}/profile`);
                const snapshot = await get(profileRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setProfileData(prevData => ({
                        ...prevData,
                        username: data.username,
                        age: data.age,
                        gender: data.gender,
                        selectedAvatar: data.selectedAvatar || alienAvatar,
                        previousUsername: data.username
                    }));

                    if (!data.selectedAvatar) {
                        await set(profileRef, {
                            ...data,
                            selectedAvatar: alienAvatar
                        });
                    }
                }
            } catch (err) {
                console.error('Error loading profile:', err);
                setError('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        loadProfileData();
        showFunFactWithDelay();
    }, [setProfileData]);

    const handleAvatarSelect = (avatarSrc) => {
        setProfileData(prevData => ({
            ...prevData,
            selectedAvatar: avatarSrc
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setError(null); // Clear any previous errors
    };

    const handleGenderChange = (e) => {
        setProfileData(prevData => ({
            ...prevData,
            gender: e.target.value
        }));
        setError(null);
    };

    const checkUsernameAvailability = async (username) => {
        const db = getDatabase();
        const usernameRef = ref(db, `usernames/${username}`);
        const snapshot = await get(usernameRef);
        return !snapshot.exists() || snapshot.val() === auth.currentUser.uid;
    };

    const handleSave = async () => {
        if (!auth.currentUser) {
            setError('You must be logged in to save profile data');
            return;
        }

        if (!profileData.username) {
            setError('Username is required');
            return;
        }

        try {
            setSaving(true);
            await showFunFactWithDelay();
            const db = getDatabase();
            const userId = auth.currentUser.uid;

            // Check if username is available
            const isUsernameAvailable = await checkUsernameAvailability(profileData.username);
            if (!isUsernameAvailable) {
                setError('Username is already taken. Please choose another one.');
                setSaving(false);
                return;
            }

            // If user had a previous username, remove it from usernames node
            if (profileData.previousUsername && profileData.previousUsername !== profileData.username) {
                await set(ref(db, `usernames/${profileData.previousUsername}`), null);
            }

            // Set the new username in usernames node
            await set(ref(db, `usernames/${profileData.username}`), userId);

            // Update profile data
            await set(ref(db, `users/${userId}/profile`), {
                username: profileData.username,
                age: profileData.age ? Number(profileData.age) : null,
                gender: profileData.gender || null,
                selectedAvatar: profileData.selectedAvatar || alienAvatar,
                updatedAt: new Date().toISOString()
            });

            // Update previous username
            setProfileData(prevData => ({
                ...prevData,
                previousUsername: profileData.username
            }));

            setError(null);
            onClose();
        } catch (err) {
            console.error('Error saving profile:', err);
            setError('Failed to save profile data');
        } finally {
            setSaving(false);
        }
    };

    const handleKeyPress = (event) => {
        // Prevent event propagation to background elements
        event.stopPropagation();
        
        // Don't handle keyboard events if change password modal is open
        if (showChangePassword) {
            if (event.key === 'Escape') {
                setShowChangePassword(false);
            }
            return;
        }

        const isEmailProvider = auth.currentUser?.providerData[0]?.providerId === 'password';

        switch (event.key) {
            case 'ArrowUp':
                setSelectedField(prev => (prev > 0 ? prev - 1 : isEmailProvider ? 6 : 5));
                break;
            case 'ArrowDown':
                setSelectedField(prev => (prev < (isEmailProvider ? 6 : 5) ? prev + 1 : 0));
                break;
            case 'Enter':
                if (selectedField === 0) {
                    setShowAvatarPopup(true);
                } else if (selectedField === 4 && !saving && profileData.username) {
                    handleSave();
                } else if (selectedField === 5) {
                    onClose();
                } else if (selectedField === 6 && isEmailProvider) {
                    setShowChangePassword(true);
                }
                break;
            case 'Escape':
                onClose();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedField, saving, profileData]);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                <div className="bg-gray-800 text-white p-8 rounded">
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20" style={{ userSelect: 'none' }}>
            {showFunFact && <FunFact />}
            <div className="bg-gray-800 text-white p-8 rounded w-[450px]" onClick={(e) => e.stopPropagation()}>
                <h1 className="text-4xl mb-8 text-center">Profile</h1>
                
                <div className="mb-6 text-center">
                    <label className="block mb-4">Avatar</label>
                    <div 
                        className={`w-32 h-32 mx-auto mb-2 cursor-pointer rounded-lg overflow-hidden transition-all duration-200
                            ${selectedField === 0 ? 'ring-4 ring-blue-500 scale-105' : 'border-2 border-gray-600 hover:border-gray-500'}`}
                        onClick={() => setShowAvatarPopup(true)}
                    >
                        <img 
                            src={profileData.selectedAvatar || alienAvatar} 
                            alt="Selected Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button
                        className={`text-sm ${selectedField === 0 ? 'text-blue-300' : 'text-blue-400 hover:text-blue-300'}`}
                        onClick={() => setShowAvatarPopup(true)}
                    >
                        Change Avatar
                    </button>
                </div>

                <div className="mb-4 text-center">
                    <label className="block mb-2">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={profileData.username || ''} 
                        onChange={handleInputChange} 
                        className={`w-80 mx-auto p-2 text-black rounded transition-all duration-200
                            ${selectedField === 1 ? 'ring-4 ring-blue-500' : ''}`}
                        placeholder="Enter Username"
                        required 
                    />
                </div>

                <div className="mb-4 text-center">
                    <label className="block mb-2">Age</label>
                    <input 
                        type="number" 
                        name="age" 
                        value={profileData.age || ''} 
                        onChange={handleInputChange} 
                        className={`w-80 mx-auto p-2 text-black rounded transition-all duration-200
                            ${selectedField === 2 ? 'ring-4 ring-blue-500' : ''}`}
                        placeholder="Enter Age"
                        min="1"
                    />
                </div>

                <div className="mb-4 text-center">
                    <label className="block mb-2">Gender</label>
                    <select 
                        name="gender" 
                        value={profileData.gender || ''} 
                        onChange={handleGenderChange} 
                        className={`w-80 mx-auto p-2 text-black rounded transition-all duration-200
                            ${selectedField === 3 ? 'ring-4 ring-blue-500' : ''}`}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {auth.currentUser?.providerData[0]?.providerId === 'password' && (
                    <div className="mb-6 text-center">
                        <button
                            type="button"
                            onClick={() => setShowChangePassword(true)}
                            className={`text-blue-500 hover:text-blue-600 text-sm  transition-all duration-200
                                ${selectedField === 6 ? 'scale-105 underline' : ''}`}
                        >
                            Change Password
                        </button>
                    </div>
                )}

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="flex space-x-4 mb-4 justify-center">
                    <button 
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition-all duration-200
                            ${selectedField === 4 ? 'ring-4 ring-white scale-105' : ''}`}
                        onClick={handleSave}
                        disabled={saving || !profileData.username}
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button 
                        className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-all duration-200
                            ${selectedField === 5 ? 'ring-4 ring-white scale-105' : ''}`}
                        onClick={onClose}
                    >
                        Back
                    </button>
                </div>
            </div>

            {showAvatarPopup && (
                <AvatarSelectionPopup
                    onClose={() => setShowAvatarPopup(false)}
                    onSelect={handleAvatarSelect}
                    selectedAvatar={profileData.selectedAvatar}
                />
            )}

            {showChangePassword && (
                <ChangePassword onClose={() => setShowChangePassword(false)} />
            )}
        </div>
    );
};

export default Profile;