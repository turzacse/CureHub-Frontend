// import React, { useContext, useEffect, useState } from 'react';
// import { Outlet, useLocation } from 'react-router-dom';
// import Footer from '../Components/Shared/Footer';
// import Sidebar from '../Components/Shared/Sidebar';
// import { AuthContext } from '../Provider/AuthContext';
// import DefaultAdmin from '../Pages/Dashboard/Admin/Default';
// import DashboardNav from '../Components/Shared/DashboardNav';
// import Defaultuser from '../Pages/Dashboard/User/Defaultuser';
// import VideoCall from '../Components/VideoCall/VideoCall';
// // import DashboardNav from '../Components/Shared/DashboardNav';

// const Dashboard = () => {
//     const {user} = useContext(AuthContext);

//     const location = useLocation();
//     const [currentuser, setCurrentUser] = useState();
//     useEffect( () => {
//         fetch('https://cure-hub-backend-gules.vercel.app/users')
//         .then(res => res.json())
//         .then(data => {
//             const cureHubUser = data?.find((item) => item?.email === user?.email);
//             setCurrentUser(cureHubUser);
//         })
//     } ,[user])
//     console.log(currentuser);
//     return (
//         <div className='bg-gray-400'>
//             <DashboardNav/>
//             {/* <VideoCall/> */}
//             <div className='lg:conatiner lg:mx-auto flex flex-row'>
//                 <div className='w-screen'>
//                 {currentuser?.role =='admin'  && location.pathname === '/dashboard' && (
//                         <div>
//                             <DefaultAdmin />
//                         </div>
//                  )}
//                  {currentuser?.role =='user'  && location.pathname === '/dashboard' && (
//                         <div>
//                             <Defaultuser />
//                         </div>
//                  )}
//                 <Outlet />
//                 </div>
//                 <div className='hidden md:flex'>
//                 {/* <Sidebar className='' /> */}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default Dashboard;

import { Link, Outlet, useLocation } from "react-router-dom";
import { MdAccountCircle, MdAddBox } from "react-icons/md";
import { IoAddCircleSharp, IoCalendarNumber } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import Defaultuser from '../Pages/Dashboard/User/Defaultuser';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { FaCartArrowDown, FaVideo } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";


const Dashboard = () => {
    const { user, curehubUser } = useContext(AuthContext);
    const [role, setRole] = useState('');
    const location = useLocation();
    useEffect(() => {
        setRole(curehubUser?.role || 'user');
    }, [curehubUser])
    console.log(curehubUser, role);

    return (
        <div className="relative min-h-[100vh] bg-gray-400">

            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col  ">
                    <label htmlFor="my-drawer-2" className=" lg:hidden absolute left-0 top-0 btn cursor-pointer py-0 border-none bg-[#006666] text-white "
                    style={{borderRadius: '0px', height:'20px', borderBottomRightRadius: '8px'}}
                    ><GiHamburgerMenu /></label>
                    {role == 'user' && location.pathname === '/dashboard' ? (
                        <div>
                            <Defaultuser />
                        </div>
                    ) : (<div></div>)

                    }
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side lg:h-full lg:bg-[#006666] ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
                    <ul className="menu p-4 w-44 lg:w-44 h-screen bg-[#006666] text-white">
                        <div className="p-4 ">
                            <div className="text-center mb-8">
                                <img className="w-12 h-12 lg:w-20 lg:h-20 rounded-full mx-auto mb-2" src={curehubUser?.photo} alt="Profile" />

                                <h4 className="text-lg font-bold pb-2">
                                    {curehubUser?.username}
                                </h4>
                                {/* <p className="">User Email</p> */}
                            </div>
                        </div>

                        {
                            role && role === 'user' ? <>
                                <hr className='border-2 ' />
                                <Link to='/dashboard' className="py-4 pl-5 hover:bg-gray-400 hover:text-black flex gap-2 items-center">
                                <MdAccountCircle className="text-xl "/>
                                <li className="font-semibold">
                                    
                                     Account</li></Link>
                                <hr className='border-2 ' />
                                <Link to='/dashboard/patient-appointment' className="py-4 pl-5 hover:bg-gray-400 flex gap-2 items-center hover:text-black">
                                <IoCalendarNumber className="text-xl "/>
                                <li className="font-semibold">Appointment</li></Link>
                                <hr className='border-2' />
                                <Link to='/telemedicine' className="py-4 pl-5 hover:bg-gray-400 flex gap-2 items-center hover:text-black">
                                <FaVideo className="text-xl "/>
                                <li className="font-semibold"> Telemedicine</li></Link>
                                <hr className='border-2' />
                                <Link to='/dashboard/cart' className="py-4 pl-5 hover:bg-gray-400 flex gap-2 items-center hover:text-black">
                                <FaCartArrowDown className="text-xl text-[#22C55E] hover:text-black"/>
                                <li className="font-semibold">Cart</li></Link>
                                <hr className='border-2' />
                            </>
                                :
                                <>
                                    <hr className='border-2 ' />
                                    <Link to='/dashboard/products' className="py-4 pl-5 hover:bg-gray-400 hover:text-black"><li className="font-semibold"> Products</li></Link>
                                    <hr className='border-2' />
                                    <Link to='/dashboard/allusers' className="py-4 pl-5 hover:bg-gray-400 hover:text-black"><li className="font-semibold"> All Users</li></Link>
                                    <hr className='border-2' />
                                    <Link to='/dashboard/allorder' className="py-4 pl-5 hover:bg-gray-400 hover:text-black"><li className="font-semibold"> All Order</li></Link>
                                    <hr className='border-2' />
                                </>
                        }
                    </ul>

                    
                    <div className="absolute bottom-5 w-44">
                        <ul className="p-4 mr-4 bg-[#006666] text-white">

                            <Link to='/' className=" pl-5 py-4 block hover:bg-gray-400  hover:text-black"><li className="font-semibold"> Home</li></Link>
                            <hr className='border-2' />
                            <Link to='#' className=" pl-5 py-4 block hover:bg-gray-400  hover:text-black"><li className="font-semibold">LogOut</li></Link>
                            <hr className='border-2' />
                            
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;