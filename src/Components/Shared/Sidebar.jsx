import React, { useContext, useEffect, useState } from 'react';
import logo1 from '../../assets/Logo/logo1.png'
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { AuthContext } from '../../Provider/AuthContext';
import { BsCapsule } from 'react-icons/bs';
import { FaEye, FaHeadSideMask, FaUsers } from 'react-icons/fa';
import { MdCategory, MdCurrencyExchange } from 'react-icons/md';
import { FcCurrencyExchange } from 'react-icons/fc';
import { FaBookAtlas, FaPersonCircleQuestion } from 'react-icons/fa6';
import { GrStatusPlaceholder } from 'react-icons/gr';

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState([]);
    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/users')
            .then(res => res.json())
            .then(data => setLoggedIn(data.filter((item) => item.email === user.email)))
    }, []);
    console.log(loggedIn[0]?.role);
    return (
        <div className='h-full mb-4 overflow-y-auto bg-[#1a6868] w-[220px] mr-2 p-2 shadow-2xl rounded-xl text-white'>
            <img className='shadow-2xl rounded-full my-4 h-[120px] w-[120px] mx-auto' src={logo1} alt="" />
            <hr className='shadow-2xl mb-2' />
            <p className='text-[#c8ec44]'><span className='font-bold '>User:</span> {user?.displayName}</p>
            <hr className='shadow-2xl my-2' />
            <div className='flex gap-2 items-center text-xl font-bold'>
                <AiOutlineHome />
                <NavLink to='/' className=''>Home</NavLink>
            </div>

            {
                loggedIn && loggedIn[0]?.role == 'admin' && <>
                    <hr className='shadow-2xl mt-5 mb-2' />
                    <div className='flex gap-2 items-center text-xl font-bold'>
                        <FaUsers />
                        <NavLink to='/dashboard/users' className=''>Users</NavLink>
                    </div>

                    <div className='flex gap-2 items-center mt-2 text-xl font-bold'>
                        <MdCategory className='text-lime-400' />
                        <NavLink to='/dashboard/category' className=''>Categor</NavLink>
                    </div>

                    <div className='flex gap-2 items-center mt-2 text-xl font-bold'>
                        <FcCurrencyExchange className='text-xl' />
                        <NavLink to='/dashboard/adminpayment' className=''>Payment</NavLink>
                    </div>

                    <div className='flex gap-2 items-center mt-2 text-xl font-bold'>
                        <FaBookAtlas />
                        <NavLink to='/dashboard/report' className=''>Report</NavLink>
                    </div>

                    <div className='flex gap-2 items-center mt-2 text-xl font-bold'>
                        <FaEye />
                        <NavLink to='/dashboard/ads' className=''>Banner Ads</NavLink>
                    </div>
                </>
            }

            {
                loggedIn && loggedIn[0]?.role == 'seller' && <>
                    <hr className='shadow-2xl mt-5 mb-2' />
                    <div className='flex gap-2 items-center text-xl font-bold'>
                        <BsCapsule className='text-red-500' />
                        <NavLink to='/dashboard/medicines' className=''>Medicines</NavLink>
                    </div>

                    <div className='flex gap-2 items-center mt-2 text-xl font-bold'>
                        <FcCurrencyExchange className='text-xl' />
                        <NavLink to='/dashboard/sellerpayment' className=''>Payment</NavLink>
                    </div>

                    <div className='flex gap-2 items-center mt-2 text-xl font-bold'>
                        <FaHeadSideMask className='text-yellow-600' />
                        <NavLink to='/dashboard/advertise' className=''>Advertise</NavLink>
                    </div>
                </>
            }

            {
                loggedIn && loggedIn[0]?.role == 'user' && <>
                    <hr className='shadow-2xl mt-5 mb-2' />
                    <div className='flex gap-2 items-center text-xl font-bold'>
                        <FaPersonCircleQuestion />
                        <NavLink to='/dashboard/quesries' className=''>Queries</NavLink>
                    </div>

                    <div className='flex gap-2 mt-2 items-center text-xl font-bold'>
                        <FcCurrencyExchange className='text-xl' />
                        <NavLink to='/dashboard/userpayment' className=''>Payment</NavLink>
                    </div>
                </>
            }
        </div>
    );
};

export default Sidebar;