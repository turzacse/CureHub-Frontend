import React, { useContext } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import DashboardCard from './DashboardCard';
import { AuthContext } from '../../../Provider/AuthContext';

const data = [
    { name: 'Total Users', value: 10 },
    { name: 'Total Medicine', value: 30 },
    { name: 'Total Category', value: 20 },
    { name: 'Total Queries', value: 25 },
    { name: 'Total Uses', value: 30 }
];

const DefaultAdmin = () => {

    const {allUsers, allDoctors, allTelemedicineAppointment, allAppointment, allMessage, allMedicine} = useContext(AuthContext);
    return (
        <div  className='mt-10 mx-10 '>
            <div
            style={{
                maxHeight: 'calc(100vh - 100px)', // Adjust based on your header/footer size
                overflowY: 'auto',
                padding: '10px',
              }}
            className='grid md:grid-cols-4 grid-cols-1 gap-6'>
                <DashboardCard title='CH USERS' number={allUsers?.length || 0} link='/dashboard/alluser' color='#6761DA' />
                <DashboardCard title='CH DOCTORS' number={allDoctors?.length || 0} link='/dashboard/doctors' color='#EBA11C' />
                <DashboardCard title='APPOINTMENTS' number={allTelemedicineAppointment?.length + allAppointment?.length || 0} link='/dashboard/appointment-management' color='#D85958' />
                <DashboardCard title='PAYMENTS' number={10}  color='#599C2D' />
                <DashboardCard title='MESSAGES' number={allMessage?.length || 0} link='/dashboard/all-message' color='#0EAFE9' />
                <DashboardCard title='MEMBERSHIP' link='/dashboard/membership' number={5} color='#3B5998' />
                <DashboardCard title='ORDER HISTORY' link='/dashboard/order-history' number={8} color='#F7511C' />
                <DashboardCard title='MEDICINE' link='/dashboard/medicines'  number={ allMedicine?.length || 0} color='#006666' />

            </div>
        </div>
        
    );
};

export default DefaultAdmin;
