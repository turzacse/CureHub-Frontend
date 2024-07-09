// // import React, { useContext, useState } from 'react';
// // import profileImage from '../../assets/Logo/logo4.png'
// // import logo1 from '../../assets/Logo/logo1.png'
// // import logo2 from '../../assets/Logo/logo2.png'
// // import { NavLink, useNavigate } from 'react-router-dom';
// // import { AuthContext } from '../../Provider/AuthContext';


// // const Navbar = () => {
// //     const [isOpen, setIsOpen] = useState(false);
// //     const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication logic
// //     const [showMenu, setShowMenu] = useState(false);
// //     // const profileImage = 'path/to/profile/image.jpg'; // Replace with actual profile image path

// //     const {user, logOut} = useContext(AuthContext);
// //     const navigate = useNavigate();
// //     console.log(user);
// //     const toggleMenu = () => {
// //         setIsOpen(!isOpen);
// //     };

// //     const handleChange = () => {
// //         setIsOpen(false);
// //     };
// //     const handleDashboard = (e) => {
// //         e.preventDefault();
// //         navigate('/dashboard')
// //     }

// //     const handleLogout = (e) => {
// //         e.preventDefault();
// //        logOut();
// //        navigate('/sign-in')
// //     }
// //     // #006666 nav color
// //     return (
// //         <nav className="bg-[#006666] text-white">
// //             <div className=" mx-auto px-4 py-4 flex justify-between items-center">
// //                 <NavLink to='/' className="text-2xl font-bold">

// //                     <img className='h-[80px] w-[80px] rounded-full' src={logo2} alt="" />
// //                 </NavLink>
// //                 <div className="hidden md:flex space-x-6">
// //                     <NavLink to='/' className="hover:text-blue-400">Home</NavLink>
// //                     <NavLink to='/shop' className="hover:text-blue-400">Shop</NavLink>
// //                     <NavLink to='/doctors' className="hover:text-blue-400">Doctors</NavLink>
// //                     <NavLink to='/contact-us' className="hover:text-blue-400">Contact</NavLink>
// //                 </div>
// //                 <div className="flex items-center space-x-4">
// //                     {user ? (
// //                         <>
// //                         <img
// //                             src={user.photoURL}
// //                             alt="Profile"
// //                             className="w-16 h-16 rounded-full cursor-pointer"
// //                             onClick={() => setShowMenu(!showMenu)}
// //                         />
// //                         {showMenu && (
// //                             <div className="absolute top-24 right-0 bg-[#006666] shadow-lg rounded-lg mt-2 py-2 w-48 z-50 text-white">
// //                                 <button  className="block px-4 py-2 text-white hover:" onClick={handleDashboard}>Dashboard</button>
// //                                 <button  className="block px-4 py-2 text-white hover:" onClick={handleLogout} >Logout</button>
// //                             </div>
// //                         )}
// //                     </>
// //                     ) : (
// //                         <>
// //                             <a  className="hover:text-blue-400">Sign In</a>
// //                         </>
// //                     )}
// //                 </div>
// //                 <div className="md:hidden">
// //                     <button onClick={toggleMenu} className="focus:outline-none">
// //                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
// //                         </svg>
// //                     </button>
// //                 </div>
// //             </div>
// //             {isOpen && (
// //                 <div className="md:hidden z-50 absolute w-3/4 rounded-lg right-0 shadow-2xl bg-[#006666]" onClick={handleChange}>
// //                     <NavLink to='/'  className="block px-4 py-2 hover:bg-gray-700">Home</NavLink>
// //                     <NavLink to='/shop'  className="block px-4 py-2 hover:bg-gray-700">Shop</NavLink>
// //                     <NavLink to='/doctors'  className="block px-4 py-2 hover:bg-gray-700">Doctors</NavLink>
// //                     <NavLink to='/'  className="block px-4 py-2 hover:bg-gray-700">Contact</NavLink>
// //                     {user ? (
// //                         <NavLink to='/dashboard'  className="block px-4 py-2 hover:bg-gray-700">Dashboard</NavLink>
// //                     ) : (
// //                         <>
// //                             <NavLink to='/sign-up'  className="block px-4 py-2 hover:bg-gray-700">Sign Up</NavLink>
// //                             <NavLink to='/sign-in'  className="block px-4 py-2 hover:bg-gray-700">Sign In</NavLink>
// //                         </>
// //                     )}
// //                 </div>
// //             )}
// //         </nav>
// //     );
// // };

// // export default Navbar;
// import React, { useContext, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../Provider/AuthContext';
// import logo1 from '../../assets/Logo/logo1.png'
// import logo2 from '../../assets/Logo/logo2.png'

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [showMenu, setShowMenu] = useState(false);
//     const { user, logOut } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleChange = () => {
//         setIsOpen(false);
//     };

//     const handleDashboard = (e) => {
//         e.preventDefault();
//         navigate('/dashboard');
//     };

//     const handleLogout = (e) => {
//         e.preventDefault();
//         logOut();
//         navigate('/sign-in');
//     };

//     return (
//         <div className="navbar bg-[#006666] text-white">
//             <div className="navbar-start">
//                 <div className="dropdown">
//                     <div
//                         tabIndex={0}
//                         role="button"
//                         className="btn btn-ghost lg:hidden"
//                         onClick={toggleMenu}
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M4 6h16M4 12h8m-8 6h16"
//                             />
//                         </svg>
//                     </div>
//                     <ul
//                         tabIndex={0}
//                         className={`menu menu-sm dropdown-content bg-[#006666] rounded-box z-[1] mt-3 w-52 p-2 shadow ${isOpen ? 'block' : 'hidden'}`}
//                         onClick={handleChange}
//                     >
//                         <li>
//                             <NavLink to="/" className="block px-4 py-2 hover:bg-gray-700">
//                                 Home
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/shop" className="block px-4 py-2 hover:bg-gray-700">
//                                 Shop
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/doctors" className="block px-4 py-2 hover:bg-gray-700">
//                                 Doctors
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/contact-us" className="block px-4 py-2 hover:bg-gray-700">
//                                 Contact
//                             </NavLink>
//                         </li>
//                         {user ? (
//                             <li>
//                                 <NavLink
//                                     to="/dashboard"
//                                     className="block px-4 py-2 hover:bg-gray-700"
//                                 >
//                                     Dashboard
//                                 </NavLink>
//                             </li>
//                         ) : (
//                             <>
//                                 <li>
//                                     <NavLink to="/sign-up" className="block px-4 py-2 hover:bg-gray-700">
//                                         Sign Up
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink to="/sign-in" className="block px-4 py-2 hover:bg-gray-700">
//                                         Sign In
//                                     </NavLink>
//                                 </li>
//                             </>
//                         )}
//                     </ul>
//                 </div>
//                 <NavLink to='/' className="text-2xl font-bold">

//                     <img className='h-[80px] w-[80px] rounded-full' src={logo2} alt="" />
//                 </NavLink>
//             </div>
//             <div className="navbar-center hidden lg:flex">
//                 <ul className="menu menu-horizontal px-1">
//                     <li>
//                         <NavLink to="/" className="block px-4 py-2 hover:bg-gray-700">
//                             Home
//                         </NavLink>
//                     </li>
//                     <li>
//                         <details>
//                             <summary>Apointment</summary>
//                             <ul className="p-2 z-10 bg-[#006666] w-[250px] text-white">
//                                 <li>
//                                     <NavLink to="/doctors" className="block px-4 py-2 hover:bg-gray-700">
//                                         Doctors
//                                     </NavLink>

//                                 </li>
//                                 <li>
//                                     <NavLink to="/booking-system" className="block px-4 py-2 hover:bg-gray-700">
//                                         Booking System
//                                     </NavLink>

//                                 </li><li>
//                                     <NavLink to="/appointment-guideline" className="block px-4 py-2 hover:bg-gray-700">
//                                         Appointment Guidelines
//                                     </NavLink>

//                                 </li><li>
//                                     <NavLink to="/telemedicine-appointments" className="block px-4 py-2 hover:bg-gray-700">
//                                         Telemedicine Appointment
//                                     </NavLink>

//                                 </li>
//                             </ul>
//                         </details>
//                     </li>
//                     <li>
//                         <NavLink
//                         to='/about'
//                         className="block px-4 py-2 hover:bg-gray-700"
//                         >About</NavLink>
//                     </li>
//                 </ul>
//             </div>
//             <div className="flex items-center navbar-end space-x-4">
//                      {user ? (
//                          <>
//                          <img
//                              src={user.photoURL}
//                              alt="Profile"
//                              className="w-16 h-16 rounded-full cursor-pointer"
//                              onClick={() => setShowMenu(!showMenu)}
//                          />
//                          {showMenu && (
//                              <div className="absolute top-24 right-0 bg-[#006666] shadow-lg rounded-lg mt-2 py-2 w-48 z-50 text-white">
//                                  <button  className="block px-4 py-2 text-white hover:" onClick={handleDashboard}>Dashboard</button>
//                                  <button  className="block px-4 py-2 text-white hover:" onClick={handleLogout} >Logout</button>
//                              </div>
//                          )}
//                      </>
//                      ) : (
//                          <>
//                              <a  className="hover:text-blue-400">Sign In</a>
//                          </>
//                      )}
//                  </div>
//         </div>
//     );
// };

// export default Navbar;



import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContext';
import logo1 from '../../assets/Logo/logo1.png'
import logo2 from '../../assets/Logo/logo2.png'

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut();
    }
    const links = <div className='flex flex-col lg:flex-row lg:justify-center lg:items-center'>
        <li className='font-semibold'><NavLink to='/'>Home</NavLink></li>
        <li className='font-semibold'><NavLink to='/shop'>MedicineShop</NavLink></li>
        <li className='font-semibold'><NavLink to='/telemedicine'>Telemedicine</NavLink></li>
        <li>
            <NavLink to="/doctors" className='font-semibold'>
                Doctors
            </NavLink>
        </li>
        {/* <li className='font-semibold'><NavLink to='/prescription'>Prescription</NavLink></li> */}
        {/* <li className='font-semibold'><NavLink to='/patient-history'>Patient History</NavLink></li> */}
        <div className="dropdown bg-[#006666]">
            <li tabIndex={0} role="button" className="font-semibold m-1">CureHub</li>
            <ul tabIndex={0} className="md:dropdown-content md:menu rounded-box z-[1] md:w-[220px] md:shadow bg-[#0a9191]">
                <li className='font-semibold'><NavLink to='/about'>About</NavLink></li>
                <li className='font-semibold'><NavLink to='/faq'>FAQ</NavLink></li>
                <li className='font-semibold'><NavLink to='/blog'>Blog</NavLink></li>
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

    return (
        <div>
            <div className="shadow-2xl">
                <div className="navbar bg-[#006666] px-10 text-white">
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
                            {/* <h2 className="text-xl font-semibold text-orange-500 hidden md:block">Bangla Bites</h2> */}
                        </Link>
                        {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
                    </div>
                    <div className="navbar-center  hidden lg:flex">
                        <ul className="menu bg-[#006666] menu-horizontal text-left px-1 text-[12px]">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <div className="indicator mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                        {user ? (
                            <>

                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img className="rounded-full flex justify-center items-center mx-auto" src={user.photoURL} alt="user profile" />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#006666] rounded-box w-52">
                                        <p className='ml-3'>
                                            <div className="justify-between">
                                                <h2 className='text-green-500 font-semibold'>{
                                                    user.displayName}</h2>
                                            </div>
                                        </p>

                                        <li><button className="text-white font-bold" onClick={() => {
                                            navigate('/dashboard')
                                        }}>Account</button></li>
                                        <li><button className="text-white font-bold" onClick={handleLogout}>Log Out</button></li>

                                    </ul>
                                </div>

                            </>
                        ) : (
                            <NavLink to='/login' className="btn btn-outline btn-warning">Login</NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;