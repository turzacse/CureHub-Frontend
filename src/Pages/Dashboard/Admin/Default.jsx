import React, { useContext, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import DashboardCard from './DashboardCard';
import { AuthContext } from '../../../Provider/AuthContext';
import axios from 'axios';


const DefaultAdmin = () => {
    const [payment, setPayment] = useState(0);
    const [order, setOrder] = useState(0);

  useEffect(() => {
    const fetchOrderHistory = async () => {
        try {
            const response = await axios.get(
                "https://cure-hub-backend-gules.vercel.app/payments/medicine"
            );
            const list = response.data.payments;
            const reversedList = list.reverse();
            setOrder(reversedList?.length);
            // setLoading(false);
        } catch (err) {
            setError("Failed to fetch order history");
            // setLoading(false);
        }
    };

    fetchOrderHistory();
  }, []);

  const getAllPayments = async () => {
    try {
        const response = await fetch('https://cure-hub-backend-gules.vercel.app/payments');
        if (response.ok) {
            const data = await response.json();
            setPayment(data?.length);
        } else {
            console.error("Failed to fetch messages. Status:", response.status);
        }
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
};

useEffect(() => {
    getAllPayments();
}, []);

    const {allUsers, allDoctors, allTelemedicineAppointment, allAppointment, allMessage, allMedicine,allPayments} = useContext(AuthContext);
    return (
        <div  className='md:mt-10 mt-12 md:mx-10 '>
            <div
            style={{
                maxHeight: 'calc(100vh - 60px)', // Adjust based on your header/footer size
                overflowY: 'auto',
                padding: '10px',
              }}
            className='grid md:grid-cols-4 grid-cols-1 gap-6'>
                <DashboardCard title='CH USERS' number={allUsers?.length || 0} link='/dashboard/alluser' color='#6761DA' />
                <DashboardCard title='CH DOCTORS' number={allDoctors?.length || 0} link='/dashboard/doctors' color='#EBA11C' />
                <DashboardCard title='APPOINTMENTS' number={allTelemedicineAppointment?.length + allAppointment?.length || 0} link='/dashboard/appointment-management' color='#D85958' />
                <DashboardCard title='PAYMENTS' link='/dashboard/payments' number={payment || 0}  color='#599C2D' />
                <DashboardCard title='MESSAGES' number={allMessage?.length || 0} link='/dashboard/all-message' color='#0EAFE9' />
                <DashboardCard title='MEMBERSHIP' link='/dashboard/membership' number={5} color='#3B5998' />
                <DashboardCard title='ORDER HISTORY' link='/dashboard/order-history' number={order || 0} color='#F7511C' />
                <DashboardCard title='MEDICINE' link='/dashboard/medicines'  number={ allMedicine?.length || 0} color='#006666' />

            </div>
        </div>
        
    );
};

export default DefaultAdmin;
