import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Shared/Footer';
import Sidebar from '../Components/Shared/Sidebar';
import { AuthContext } from '../Provider/AuthContext';
import DefaultAdmin from '../Pages/Dashboard/Admin/Default';

const Dashboard = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <div className='bg-[#3d7c7c]'>
            <div className='flex flex-row md:gap-2'>
                <div className='w-screen m-4'>
                {user  && location.pathname === '/dashboard' && (
                        <div>
                            <DefaultAdmin />
                        </div>
                    )}
                <Outlet />
                </div>
                <div className='hidden md:flex'>
                <Sidebar className='' />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;