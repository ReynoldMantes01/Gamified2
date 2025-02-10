import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { getDatabase, ref, set, get } from 'firebase/database';
import alienAvatar from '../assets/avatar/ALIEN AVATAR.jpg';
import astronautAvatar from '../assets/avatar/ASTRONOUT AVATAR.jpg';
import geishaAvatar from '../assets/avatar/GEISHA AVATAR.jpg';
import AvatarSelectionPopup from './AvatarSelectionPopup';

const Profile = ({ onClose, profileData, setProfileData }) => {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAvatarPopup, setShowAvatarPopup] = useState(false);

    // Load saved profile data when component mounts
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
                        selectedAvatar: data.selectedAvatar || alienAvatar // Set alien as initial avatar only if no avatar is set
                    }));

                    // If no avatar is set, save the initial avatar
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
    };

    const handleGenderChange = (e) => {
        if (!profileData.gender) {
            setProfileData(prevData => ({
                ...prevData,
                gender: e.target.value
            }));
        }
    };

    const handleSave = async () => {
        if (!auth.currentUser) {
            setError('You must be logged in to save profile data');
            return;
        }

        // Validate required fields
        if (!profileData.username) {
            setError('Username is required');
            return;
        }

        try {
            setSaving(true);
            const db = getDatabase();
            const userId = auth.currentUser.uid;

            // Save user data to Firebase Realtime Database
            await set(ref(db, `users/${userId}/profile`), {
                username: profileData.username,
                age: profileData.age ? Number(profileData.age) : null,
                gender: profileData.gender || null,
                selectedAvatar: profileData.selectedAvatar || alienAvatar,
                updatedAt: new Date().toISOString()
            });

            onClose();
        } catch (err) {
            console.error('Error saving profile:', err);
            setError('Failed to save profile data');
        } finally {
            setSaving(false);
        }
    };

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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20" onClick={onClose}>
            <div className="bg-gray-800 text-white p-8 rounded w-[450px]" onClick={(e) => e.stopPropagation()}>
                <h1 className="text-4xl mb-8 text-center">Profile</h1>
                
                {/* Avatar Display and Selection Button */}
                <div className="mb-6 text-center">
                    <label className="block mb-4">Avatar</label>
                    <div 
                        className="w-32 h-32 mx-auto mb-2 cursor-pointer rounded-lg border-2 border-gray-600 hover:border-gray-500 overflow-hidden"
                        onClick={() => setShowAvatarPopup(true)}
                    >
                        <img 
                            src={profileData.selectedAvatar || alienAvatar} 
                            alt="Selected Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button
                        className="text-sm text-blue-400 hover:text-blue-300"
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
                        className="w-80 mx-auto p-2 text-black rounded" 
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
                        className="w-80 mx-auto p-2 text-black rounded" 
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
                        className="w-80 mx-auto p-2 text-black rounded" 
                        disabled={!!profileData.gender}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="flex space-x-4 mb-4 justify-center">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50" 
                        onClick={handleSave}
                        disabled={saving || !profileData.username}
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button 
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={onClose}
                    >
                        Back
                    </button>
                </div>
            </div>

            {/* Avatar Selection Popup */}
            {showAvatarPopup && (
                <AvatarSelectionPopup
                    onClose={() => setShowAvatarPopup(false)}
                    onSelect={handleAvatarSelect}
                    selectedAvatar={profileData.selectedAvatar}
                />
            )}
        </div>
    );
};

export default Profile;