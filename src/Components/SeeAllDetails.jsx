import React from 'react';
import { NavLink } from 'react-router-dom';

const SeeAllDetails = ({button, description, routes}) => {
    return (
        <div>
            <h2 className='mt-10 text-center text-xl mb-5 bg-gradient-to-r from-[#6B65F2] via-green-500 to-[#EA499D] font-medium text-transparent bg-clip-text'>{description}</h2>
            <NavLink to={routes}  className=' flex justify-center w-[100px] p-2 mx-auto text-white bg-[#DD4BAF] rounded-lg shadow-2xl hover:bg-[#cf2299]'>
                {button}
            </NavLink>
        </div>
    );
};

export default SeeAllDetails;