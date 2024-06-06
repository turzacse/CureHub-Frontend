import React, { useContext, useState } from 'react';
import profileImage from '../../assets/Logo/logo4.png'
import logo1 from '../../assets/Logo/logo1.png'
import logo2 from '../../assets/Logo/logo2.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContext';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication logic
    const [showMenu, setShowMenu] = useState(false);
    // const profileImage = 'path/to/profile/image.jpg'; // Replace with actual profile image path
    
    const {user, logOut} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = () => {
        setIsOpen(false);
    };

    const handleLogout = (e) => {
        e.preventDefault();
       logOut();
       navigate('/sign-up')
    }

    return (
        <nav className="bg-[#006666] text-white">
            <div className=" mx-auto px-4 py-4 flex justify-between items-center">
                <NavLink to='/' className="text-2xl font-bold">
                    {/* <a >CureHub</a> */}
                    <img className='h-[80px] w-[80px] rounded-full' src={logo2} alt="" />
                </NavLink>
                <div className="hidden md:flex space-x-6">
                    <a className="hover:text-blue-400">Home</a>
                    <a className="hover:text-blue-400">Shop</a>
                    <a className="hover:text-blue-400">About Us</a>
                    <a className="hover:text-blue-400">Contact</a>
                </div>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-16 h-16 rounded-full cursor-pointer"
                            onClick={() => setShowMenu(!showMenu)}
                        />
                        {showMenu && (
                            <div className="absolute top-24 right-0 bg-[#006666] shadow-lg rounded-lg mt-2 py-2 w-48 z-50 text-white">
                                <button  className="block px-4 py-2 text-white hover:" onClick={() => {}}>Dashboard</button>
                                <button  className="block px-4 py-2 text-white hover:" onClick={handleLogout} >Logout</button>
                            </div>
                        )}
                    </>
                    ) : (
                        <>
                            {/* <a href="#" className="hover:text-blue-400">Sign Up</a> */}
                            <a  className="hover:text-blue-400">Sign In</a>
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
                    <a  className="block px-4 py-2 hover:bg-gray-700">Home</a>
                    <a  className="block px-4 py-2 hover:bg-gray-700">Shop</a>
                    <a  className="block px-4 py-2 hover:bg-gray-700">About Us</a>
                    <a  className="block px-4 py-2 hover:bg-gray-700">Contact</a>
                    {user ? (
                        <a  className="block px-4 py-2 hover:bg-gray-700">Profile</a>
                    ) : (
                        <>
                            <a  className="block px-4 py-2 hover:bg-gray-700">Sign Up</a>
                            <a  className="block px-4 py-2 hover:bg-gray-700">Sign In</a>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
