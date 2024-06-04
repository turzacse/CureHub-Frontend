import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Shared/Footer';
import Sidebar from '../Components/Shared/Sidebar';

const Dashboard = () => {
    return (
        <div className='bg-[#008080]'>
            <div className='flex flex-row gap-2'>
                <div className='w-screen m-4'>
                <Outlet />
                </div>
                <div className=''>
                <Sidebar />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;