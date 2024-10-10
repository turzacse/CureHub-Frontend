import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardCard = ({ title, number, color, link }) => {
    return (
        <NavLink
            to={link}
            style={{ backgroundColor: color }}
            className={` rounded-md h-[150px] p-4 text-white`}>
            <h2 className='capitalize font-medium text-xl'>{title}</h2>
            <p className='text-2xl font-semibold'>{number}</p>
        </NavLink>
    );
};

export default DashboardCard;