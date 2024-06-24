import React from 'react';

const Headline = ({headline}) => {
    return (
        <div>
            <h2 className='text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center font-bold my-10 md:text-4xl text-xl md:w-1/2 mx-auto py-2 rounded-lg shadow-2xl uppercase'> {headline} </h2>
            {/* <hr className='mb-5 w-1/3 mx-auto h-1' /> */}
            
        </div>
    );
};

export default Headline;