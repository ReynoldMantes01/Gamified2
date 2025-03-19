import React, { useState, useEffect } from 'react';
import alienAvatar from '../assets/avatar/ALIEN AVATAR.jpg';
import astronautAvatar from '../assets/avatar/ASTRONOUT AVATAR.jpg';
import cuteAvatar from '../assets/avatar/CUTE AVATAR.jpg';
import geishaAvatar from '../assets/avatar/GEISHA AVATAR.jpg';
import ninjaAvatar from '../assets/avatar/NINJA AVATAR.jpg';
import sushicatAvatar from '../assets/avatar/SUSHICAT AVATAR.jpg';

const AvatarSelectionPopup = ({ onClose, onSelect, selectedAvatar }) => {
    const avatarOptions = [
        { src: alienAvatar, name: 'Alien' },
        { src: astronautAvatar, name: 'Astronaut' },
        { src: cuteAvatar, name: 'Rabbit Scientist' },
        { src: geishaAvatar, name: 'Geisha' },
        { src: ninjaAvatar, name: 'Ninja' },
        { src: sushicatAvatar, name: 'Sushi Cat' }
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const avatarsPerPage = 1;
    const totalPages = avatarOptions.length;

    const handleNextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const getCurrentAvatars = () => {
        const start = currentPage * avatarsPerPage;
        return avatarOptions.slice(start, start + avatarsPerPage);
    };

    const handleAvatarSelect = (avatarSrc) => {
        onSelect(avatarSrc);
        onClose();
    };

    const handleKeyPress = (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                handlePrevPage();
                break;
            case 'ArrowRight':
                handleNextPage();
                break;
            case 'Enter': {
                const currentAvatar = getCurrentAvatars()[0];
                handleAvatarSelect(currentAvatar.src);
                break;
            }
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
    }, [currentPage]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30" onClick={onClose}>
            <div className="bg-gray-800 text-white p-10 rounded-lg w-[600px]" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-3xl mb-8 text-center">Select Avatar</h2>
                <div className="flex items-center justify-between">
                    <button
                        onClick={handlePrevPage}
                        className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-4 focus:outline-none transform transition hover:scale-110"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div className="flex justify-center mx-4">
                        {getCurrentAvatars().map((avatar, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer rounded-lg p-3 transform transition hover:scale-105 ring-4 ${
                                    selectedAvatar === avatar.src
                                    ? 'ring-blue-500'
                                    : 'ring-gray-600 hover:ring-gray-500'
                                }`}
                                onClick={() => handleAvatarSelect(avatar.src)}
                            >
                                <img
                                    src={avatar.src}
                                    alt={avatar.name}
                                    className="w-64 h-64 object-cover rounded-lg"
                                />
                                <p className="text-center mt-3 text-2xl text-gray-300">{avatar.name}</p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleNextPage}
                        className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-4 focus:outline-none transform transition hover:scale-110"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="text-center mt-8">
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>

                <div className="flex justify-center mt-4 space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                                currentPage === index ? 'bg-blue-500' : 'bg-gray-600'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AvatarSelectionPopup;
