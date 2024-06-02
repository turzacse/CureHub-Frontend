import React, { useState } from 'react';
import profileImage from '../../assets/Logo/logo4.png'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication logic
    // const profileImage = 'path/to/profile/image.jpg'; // Replace with actual profile image path

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = () => {
        setIsOpen(false);
    };

    return (
        <nav className="bg-[#006666] text-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <a href="#">MedStore</a>
                </div>
                <div className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-blue-400">Home</a>
                    <a href="#" className="hover:text-blue-400">Shop</a>
                    <a href="#" className="hover:text-blue-400">About Us</a>
                    <a href="#" className="hover:text-blue-400">Contact</a>
                </div>
                <div className="flex items-center space-x-4">
                    {!isLoggedIn ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                    ) : (
                        <>
                            {/* <a href="#" className="hover:text-blue-400">Sign Up</a> */}
                            <a href="#" className="hover:text-blue-400">Sign In</a>
                        </>
                    )}
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden" onClick={handleChange}>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">Home</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">Shop</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">About Us</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">Contact</a>
                    {isLoggedIn ? (
                        <a href="#" className="block px-4 py-2 hover:bg-gray-700">Profile</a>
                    ) : (
                        <>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-700">Sign Up</a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-700">Sign In</a>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
