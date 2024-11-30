import React from 'react';

const Profile = ({ onClose, onSave, profileData, setProfileData }) => {
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileData({ ...profileData, image: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleGenderChange = (e) => {
        if (!profileData.gender) {
            setProfileData({ ...profileData, gender: e.target.value });
        }
    };

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
                </div>
                <div className="mb-4 text-center">
                    <label className="block mb-2">Username</label>
                    <input type="text" name="username" value={profileData.username} onChange={handleInputChange} className="w-64 mx-auto p-2 text-black" placeholder="Enter Username" />
                </div>
                <div className="mb-4 text-center">
                    <label className="block mb-2">Age</label>
                    <input type="number" name="age" value={profileData.age} onChange={handleInputChange} className="w-64 mx-auto p-2 text-black" placeholder="Enter Age" />
                </div>
                <div className="mb-4 text-center">
                    <label className="block mb-2">Gender</label>
                    <select name="gender" value={profileData.gender} onChange={handleGenderChange} className="w-64 mx-auto p-2 text-black" disabled={!!profileData.gender}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="flex space-x-4 mb-4 justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onSave}>Save</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;