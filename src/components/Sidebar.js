import React, { useState } from "react";
import { FaHome, FaUser, FaCog, FaBars } from "react-icons/fa";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`${isOpen ? "w-64" : "w-16"
                    } h-screen bg-gray-800 text-white transition-all duration-300 flex flex-col`}
            >
                {/* Toggle Button */}
                <div className="p-4">
                    <button
                        className="text-xl focus:outline-none"
                        onClick={toggleSidebar}
                    >
                        <FaBars />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="flex flex-col space-y-4 p-4">
                    <a
                        href="#home"
                        className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md"
                    >
                        <FaHome />
                        {isOpen && <span>Home</span>}
                    </a>
                    <a
                        href="#profile"
                        className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md"
                    >
                        <FaUser />
                        {isOpen && <span>Profile</span>}
                    </a>
                    <a
                        href="#settings"
                        className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md"
                    >
                        <FaCog />
                        {isOpen && <span>Settings</span>}
                    </a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6">
                <h1 className="text-2xl font-bold">Main Content</h1>
                <p className="mt-4">This is where your main content goes.</p>
            </div>
        </div>
    );
};

export default Sidebar;
