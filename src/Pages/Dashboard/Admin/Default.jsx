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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A6D71C'];

const monthlyData = [
    { month: 'January2024', patients: 30 },
    { month: 'February2024', patients: 40 },
    { month: 'March2024', patients: 45 },
    { month: 'April2024', patients: 65 },
    { month: 'May2024', patients: 58 },
    { month: 'June2024', patients: 72 },
    { month: 'July2024', patients: 83 },
    { month: 'August2024', patients: 48 },

    // You can add more data here as needed
];

const DefaultAdmin = () => {

    const {allUsers, allDoctors, allTelemedicineAppointment, allAppointment, allMessage} = useContext(AuthContext);
    return (
        <div className='mt-10 mx-10'>
            <div className='grid grid-cols-4 gap-6'>
                <DashboardCard title='CH USERS' number={allUsers?.length || 0} link='/dashboard/alluser' color='#6761DA' />
                <DashboardCard title='CH DOCTORS' number={allDoctors?.length || 0} link='/dashboard/doctors' color='#EBA11C' />
                <DashboardCard title='APPOINTMENTS' number={allTelemedicineAppointment?.length + allAppointment?.length || 0} link='/dashboard/appointment-management' color='#D85958' />
                <DashboardCard title='PAYMENTS' number={10}  color='#599C2D' />
                <DashboardCard title='MESSAGES' number={allMessage?.length || 0} link='/dashboard/all-message' color='#0EAFE9' />
                <DashboardCard title='MEMBERSHIP' number={5} color='#3B5998' />
                <DashboardCard title='ORDER HISTORY' number={8} color='#F7511C' />
                <DashboardCard title='MEDICAL ANALYSIS' number={5} color='#006666' />

            </div>
        </div>
        
    );
};

export default DefaultAdmin;
