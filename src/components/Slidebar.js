import React from 'react';
import { Cross } from 'hamburger-react';

const Slidebar = ({ isOpen, toggleSlidebar, onMainMenu, setSettingsOpen, setProfileOpen, onLogout }) => {
    return (
        <div className={`slidebar fixed top-0 left-0 w-64 h-full bg-gray-800 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-10 pt-5`}>
            <div className="slidebar-icon text-2xl cursor-pointer absolute top-5 left-5 text-white" onClick={toggleSlidebar}>
                <Cross toggled={isOpen} toggle={toggleSlidebar} />
            </div>
            <h1 className="text-white text-center mb-4 mt-2">Gamified</h1>
            <ul className="list-none p-0 m-0">
                <li className="p-4 text-center border-b border-gray-700 hover:bg-gray-700 transition-colors duration-300">
                    <button className="text-white text-lg block w-full text-left" onClick={onMainMenu}>Main Menu</button>
                </li>
                <li className="p-4 text-center border-b border-gray-700 hover:bg-gray-700 transition-colors duration-300">
                    <button className="text-white text-lg block w-full text-left" onClick={() => setSettingsOpen(true)}>Settings</button>
                </li>
                <li className="p-4 text-center border-b border-gray-700 hover:bg-gray-700 transition-colors duration-300">
                    <button className="text-white text-lg block w-full text-left" onClick={() => setProfileOpen(true)}>Profile</button>
                </li>
                <li className="p-4 text-center border-b border-gray-700 hover:bg-gray-700 transition-colors duration-300">
                    <button className="text-white text-lg block w-full text-left" onClick={onLogout}>Logout</button>
                </li>
            </ul>
        </div>
    );
};

export default Slidebar;