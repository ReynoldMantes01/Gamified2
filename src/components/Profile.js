import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { getDatabase, ref, set, get } from 'firebase/database';

const Profile = ({ onClose, profileData, setProfileData }) => {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
                        gender: data.gender
                    }));
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

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            // Only update the image in local state
            setProfileData(prevData => ({
                ...prevData,
                image: reader.result
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
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
                updatedAt: new Date().toISOString()
            });

            onClose();
        } catch (err) {
            setError(err.message);
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
            <div className="bg-gray-800 text-white p-8 rounded w-96" onClick={(e) => e.stopPropagation()}>
                <h1 className="text-4xl mb-8 text-center">Profile</h1>
                <div className="mb-4 text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-500 mx-auto mb-4 cursor-pointer" onClick={() => document.getElementById('fileInput').click()}>
                        {profileData.image ? (
                            <img src={profileData.image} alt="Profile" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <span className="block w-full h-full rounded-full flex items-center justify-center text-gray-700">No Profile Yet</span>
                        )}
                    </div>
                    <input type="file" id="fileInput" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <p className="text-sm text-gray-400">Image will be stored locally only</p>
                </div>
                <div className="mb-4 text-center">
                    <label className="block mb-2">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={profileData.username || ''} 
                        onChange={handleInputChange} 
                        className="w-64 mx-auto p-2 text-black" 
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
                        className="w-64 mx-auto p-2 text-black" 
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
                        className="w-64 mx-auto p-2 text-black" 
                        disabled={!!profileData.gender}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
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
        </div>
    );
};

export default Profile;