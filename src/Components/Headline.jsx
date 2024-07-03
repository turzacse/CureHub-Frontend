import React from 'react';

const Headline = ({headline}) => {
    return (
        //bg-[#1D447E]
        <div className=''>
            <h2 className='text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center font-bold my-10 md:text-2xl text-xl md:w-1/2 mx-auto py-2 rounded-lg uppercase'> {headline} </h2>
        </div>
    );
};

export default Headline;