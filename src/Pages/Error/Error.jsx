import React from 'react';
import img from '../../assets/Image/error.png'
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <div className='flex flex-col justify-center items-center bg-[#008080] h-screen text-2xl text-white'>
            <img src={img} className='w-1/2 h-1/2 rounded-lg mb-10' alt="" />
            <h2 >We are making something great great. Please take a look on us. </h2>
            <NavLink to='/' className='p-2 px-4 bg-[#38B6FF] mt-4 shadow-2xl rounded-xl' >Continue</NavLink>
        </div>
    );
};

export default Error;