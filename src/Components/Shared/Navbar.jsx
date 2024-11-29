import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContext';
import logo1 from '../../assets/Logo/logo1.png'
import logo2 from '../../assets/Logo/logo2.png'
import { FaBookmark, FaCartArrowDown } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logOut, loading, usersAppoitment } = useContext(AuthContext);
    const handleLogout = () => {
        logOut();
        navigate('/');
    }
    const links = <div className='text-[14px] flex flex-col lg:flex-row lg:justify-center lg:items-center'>
        <li className='font-semibold'><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to="/doctors" className='font-semibold'>Doctors</NavLink></li>
        <li className='font-semibold'><NavLink to='/telemedicine'>Telemedicine</NavLink></li>
        <li className='font-semibold'><NavLink to='/shop'>Medi Shop</NavLink></li>
        <li><NavLink to="/analysis" className='font-semibold'>Medical Analysis</NavLink></li>
        <div className="dropdown bg-[#006666]">
            <li tabIndex={0} role="button" className="font-semibold m-1">CureHub</li>
            <ul tabIndex={0} className="md:dropdown-content md:menu rounded-box z-[1] md:w-[220px] md:shadow bg-[#0a9191]">
                <li className='font-semibold'><NavLink to='/about'>About</NavLink></li>
                <li className='font-semibold'><NavLink to='/faq'>FAQ</NavLink></li>
                <li className='font-semibold'><NavLink to='/blog'>Blog</NavLink></li>
                <li className='font-semibold'><NavLink to='/how-it-works'>How It Works</NavLink></li>
                <li>
                    <NavLink to="/booking-system" className='font-semibold'>
                        Booking System
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/appointment-guideline" className='font-semibold'>
                        Appointment Guidelines
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/telemedicine-appointments" className='font-semibold'>
                        Telemedicine Appointment
                    </NavLink>
                </li>

            </ul>
        </div>
    </div>

    if (loading) {
        return (
            <div>
                <p>Loading.......</p>
            </div>
        )
    }

    return (
        <div>
            <div className="shadow-2xl">
                <div className="navbar bg-[#006666] md:px-10 text-white">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#006666] rounded-box w-52">
                                {links}
                            </ul>
                        </div>
                        <Link>
                            <img className="md:h-[60px] h-[40px] rounded-full" src={logo1} alt="" />
                        </Link>
                    </div>
                    <div className="navbar-center  hidden lg:flex">
                        <ul className="menu bg-[#006666] menu-horizontal text-left px-1 text-[12px]">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <div>
                        <FaCartArrowDown onClick={() => {
                            navigate('/cart')
                        }}
                        className='text-xl text-pink-300'
                        style={{cursor: 'pointer', marginRight: '10px'}}
                        />
                        </div>

                        
                        {user ? (
                            <>

                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img className="rounded-full flex justify-center items-center mx-auto" src={user.photoURL} alt="user profile" />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gray-100 rounded-box w-52 ">
                                        <p className='ml-3'>
                                            <div className="justify-between">
                                                <h2 className='text-black font-bold'>{
                                                    user.displayName}</h2>
                                            </div>
                                            <hr />
                                        </p>

                                        <li><button className="text-gray-800 font-semibold text-md hover:bg-yellow-400" onClick={() => {
                                            navigate('/dashboard')
                                        }}>Account</button></li>
                                        <li><button className="text-red-600 font-semibold text-md hover:bg-yellow-400" onClick={handleLogout}>Log Out</button></li>

                                    </ul>
                                </div>

                            </>
                        ) : (
                            <NavLink to='/sign-in' className="btn btn-outline btn-warning">Login</NavLink>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
