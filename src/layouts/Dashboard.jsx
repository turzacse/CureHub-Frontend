import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Components/Shared/Footer';
import Sidebar from '../Components/Shared/Sidebar';
import { AuthContext } from '../Provider/AuthContext';
import DefaultAdmin from '../Pages/Dashboard/Admin/Default';
import DashboardNav from '../Components/Shared/DashboardNav';
import Defaultuser from '../Pages/Dashboard/User/Defaultuser';
import VideoCall from '../Components/VideoCall/VideoCall';
// import DashboardNav from '../Components/Shared/DashboardNav';

const Dashboard = () => {
    const {user} = useContext(AuthContext);

    const location = useLocation();
    const [currentuser, setCurrentUser] = useState();
    useEffect( () => {
        fetch('https://cure-hub-backend-gules.vercel.app/users')
        .then(res => res.json())
        .then(data => {
            const cureHubUser = data?.find((item) => item?.email === user?.email);
            setCurrentUser(cureHubUser);
        })
    } ,[user])
    console.log(currentuser);
    return (
        <div className='bg-gray-400'>
            <DashboardNav/>
            {/* <VideoCall/> */}
            <div className='lg:conatiner lg:mx-auto flex flex-row'>
                <div className='w-screen'>
                {currentuser?.role =='admin'  && location.pathname === '/dashboard' && (
                        <div>
                            <DefaultAdmin />
                        </div>
                 )}
                 {currentuser?.role =='user'  && location.pathname === '/dashboard' && (
                        <div>
                            <Defaultuser />
                        </div>
                 )}
                <Outlet />
                </div>
                <div className='hidden md:flex'>
                {/* <Sidebar className='' /> */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;