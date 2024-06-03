import React from 'react';
import logo1 from '../../assets/Logo/logo1.png'
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

const Sidebar = () => {
    return (
        <div className='h-screen bg-[#1a6868] w-[220px] m-2 p-2 shadow-2xl rounded-xl text-white'>
           <img className='shadow-2xl rounded-full my-4 h-[120px] w-[120px] mx-auto' src={logo1} alt="" />
           <hr className='shadow-2xl mb-2' />
           <div className='flex gap-2 items-center text-xl font-bold'>
           <AiOutlineHome />
           <NavLink to='/' className=''>Home</NavLink>
           </div>
        </div>
    );
};

export default Sidebar;Sidebar