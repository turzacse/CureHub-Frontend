import React, { useContext } from 'react';
import logo1 from '../../assets/Logo/logo1.png'
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { AuthContext } from '../../Provider/AuthContext';
import { BsCapsule } from 'react-icons/bs';

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className='h-screen bg-[#1a6868] w-[220px] m-2 p-2 shadow-2xl rounded-xl text-white'>
           <img className='shadow-2xl rounded-full my-4 h-[120px] w-[120px] mx-auto' src={logo1} alt="" />
           <hr className='shadow-2xl mb-2' />
           <p className='text-[#c8ec44]'><span className='font-bold '>User:</span> {user?.displayName}</p>
           <hr className='shadow-2xl my-2' />
           <div className='flex gap-2 items-center text-xl font-bold'>
           <AiOutlineHome />
           <NavLink to='/' className=''>Home</NavLink>
           </div>

           <hr className='shadow-2xl mt-5 mb-2' />
           <div className='flex gap-2 items-center text-xl font-bold'>
           <BsCapsule className='text-red-500' />
           <NavLink to='/dashboard/medicines' className=''>Medicines</NavLink>
           </div>
        </div>
    );
};

export default Sidebar;