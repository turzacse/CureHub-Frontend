import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import Heading from '../../Components/PageHeading/Heading';
import { FaRegHandshake } from 'react-icons/fa';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { FcCancel } from 'react-icons/fc';
import { IoCalendarNumberSharp } from 'react-icons/io5';
import { MdCancel, MdDateRange, MdPaid } from 'react-icons/md';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
    const { curehubUser } = useContext(AuthContext);
    const [usersAppoitment, setUsersAppointment] = useState()
    const [telemedicine, setTeleMedicine] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getAllData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://cure-hub-backend-gules.vercel.app/appoinment/patient/${curehubUser?._id}`);
            setUsersAppointment(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching appointment data:', error);
            // Optionally handle the error here, e.g., show an error message to the user
        }
    };

    const getTeleMedicine = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://cure-hub-backend-gules.vercel.app/telemedicine-appointment/${curehubUser?._id}`);
            setTeleMedicine(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching appointment data:', error);
            // Optionally handle the error here, e.g., show an error message to the user
        }
    };

    useEffect(() => {
        getAllData();
        getTeleMedicine();
        window.scroll(0, 0);
    }, [curehubUser?._id])


    // Calculate appointment stats
    const upcomingCount = 3;
    const bookedCount = 14;
    const canceledCount = 4;
    const metCount = 7;

    const handleCancelClick = async (appointment) => {
        try {
            const { value: isConfirmed } = await Swal.fire({
                text: "Are you sure you want to cancel your appointment?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, cancel it!',
                cancelButtonText: 'No',
                background: '#006666', // Set background color
                color: '#fff',
            });

            if (isConfirmed) {
                // Store cancellation data
                await axios.post('https://cure-hub-backend-gules.vercel.app/cancel/appoinment', {
                    appointment: appointment,
                    cancelDate: new Date().toISOString(), // or any other date format
                    appointmentType: 'General',
                    curehubUser: curehubUser?._id,
                });

                // Delete the appointment
                await axios.delete(`https://cure-hub-backend-gules.vercel.app/appoinment/delete/${appointment._id}`);
                getAllData();

                // Show success message
                Swal.fire({
                    text: 'Your appointment has been cancelled.',
                    icon: 'success',
                    background: '#006666',
                    confirmButtonColor: '#3085d6',
                    color: '#fff',
                });
            }
        } catch (error) {
            console.error('Error handling cancellation:', error);
            Swal.fire({
                text: 'An error occurred while cancelling your appointment. Please try again.',
                icon: 'error',
                background: '#006666',
                confirmButtonColor: '#3085d6',
                color: '#fff',
            });
        }
    };

    const handlePayClick = () => {
        Swal.fire({
            // title: 'Proceed with payment?',
            text: "To confirm your appointment, you must pay our service charge or 50% of the total payment.",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, pay now!',
            background: '#006666', // Set background color
            color: '#fff',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    // title: 'Cancelled!',
                    text: 'Your payment has been successfully processed.',
                    icon: 'success',
                    background: '#006666',
                    confirmButtonColor: '#3085d6',
                    color: '#fff',
                })
            }
        });
    };

    const handleTelemedicineCancel = async (appointment) => {
        try {
            const { value: isConfirmed } = await Swal.fire({
                text: "Are you sure you want to cancel your telemedicine appointment?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, cancel it!',
                cancelButtonText: 'No',
                background: '#006666', // Set background color
                color: '#fff',
            });

            if (isConfirmed) {
                // Store cancellation data
                await axios.post('https://cure-hub-backend-gules.vercel.app/cancel/appoinment', {
                    appointment: appointment,
                    cancelDate: new Date().toISOString(), // or any other date format
                    appointmentType: 'Telemedicine',
                    curehubUser: curehubUser?._id,
                });

                // Delete the appointment
                await axios.delete(`https://cure-hub-backend-gules.vercel.app/telemedicine/delete/${appointment._id}`);
                getTeleMedicine();

                // Show success message
                Swal.fire({
                    text: 'Your telemedicine appointment has been cancelled.',
                    icon: 'success',
                    background: '#006666',
                    confirmButtonColor: '#3085d6',
                    color: '#fff',
                });
            }
        } catch (error) {
            console.error('Error handling cancellation:', error);
            Swal.fire({
                text: 'An error occurred while cancelling your appointment. Please try again.',
                icon: 'error',
                background: '#006666',
                confirmButtonColor: '#3085d6',
                color: '#fff',
            });
        }
    };

    return (
        <div className="min-h-screen ">
            <Heading title='Doctors Appointment' />

            <section className="container mx-auto px-4 py-10">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-300 shadow-lg rounded-lg p-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-700">{bookedCount}</h3>
                            <p className="text-gray-500">Total Booked Appointments</p>
                        </div>
                        <div className="text-green-500 text-4xl"><MdDateRange /> </div>
                    </div>
                    <div className="bg-gray-300 shadow-lg rounded-lg p-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-700">{upcomingCount}</h3>
                            <p className="text-gray-500">Upcoming Appointments</p>
                        </div>
                        <div className="text-blue-500 text-4xl"><IoCalendarNumberSharp /> </div>
                    </div>

                    <div className="bg-gray-300 shadow-lg rounded-lg p-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-700">{canceledCount}</h3>
                            <p className="text-gray-500">Canceled Appointments</p>
                        </div>
                        <div className="text-red-500 text-4xl"><FcCancel /> </div>
                    </div>
                    <div className="bg-gray-300 shadow-lg rounded-lg p-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-700">{metCount}</h3>
                            <p className="text-gray-500">Met Appointments</p>
                        </div>
                        <div className="text-purple-500 text-4xl"><FaHandshakeSimple className='text-warning' /> </div>
                        {/* 🤝 ❌ 📅 🗓️ */}
                    </div>
                </div>

                {/* Upcoming Appointments List */}
                <div className="bg-gray-300 shadow-lg rounded-lg p-6">
                    <div className="flex flex-col gap-2 mb-4">
                        <h2 className="text-2xl font-bold mb-0 pb-0 text-gray-800">Upcoming Appointments</h2>
                        <p className="text-[12px] mt-0 pt-0 font-bold bg-gradient bg-clip-text text-transparent animate-gradient">
                            To confirm your appointment, you must pay our service charge or 50% of the total payment.
                        </p>
                    </div>
                    {
                        !isLoading ? <div>
                            {usersAppoitment?.length === 0 ? (
                                <p className="text-gray-500">No upcoming appointments.</p>
                            ) : (
                                <ul>
                                    {usersAppoitment?.map((appointment, index) => (
                                        <li key={index} className="border-b py-4 flex justify-between items-center">
                                            <div className='flex-1'>
                                                <h3 className="md:text-lg md:font-semibold font-medium text-gray-700">{appointment?.doctorName}</h3>
                                                <p className="text-gray-500 text-[12px] md:text-base ">{appointment?.appointedDate || '28/07/2024'} at {appointment?.appointedTime}</p>
                                            </div>
                                            <div className="flex-1 flex justify-center">
                                                <p>12:30:42</p>
                                            </div>
                                            {/* <div className="ml-4">
                                            <CountdownTimer targetDate={targetDate} />
                                </div> */}
                                            <div className='flex flex-1 items-center md:gap-5 justify-center text-2xl'>
                                                <MdCancel className='cursor-pointer text-red-700' onClick={() => handleCancelClick(appointment)} />
                                                <MdPaid className='cursor-pointer text-blue-700' onClick={handlePayClick} />
                                            </div>
                                            <div className='flex-1 flex justify-end'>
                                                <div>
                                                    <p className='text-center text-[5px]font-bold text-purple-600'>Pending</p>
                                                    <button className="bg-blue-500  text-white py-1 px-3 rounded-md">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                    )}
                                </ul>
                            )}
                        </div> :
                            <div>
                                <span className="loading loading-ring text-pink-400 loading-xs"></span>
                                <span className="loading loading-ring loading-sm"></span>
                                <span className="loading loading-ring loading-md"></span>
                                <span className="loading loading-ring loading-lg"></span>
                            </div>
                    }

                </div>

                {/* upcomming telemedicine */}
                <div className="bg-gray-300 mt-5 shadow-lg rounded-lg p-6">

                    <div className="flex flex-col gap-2 mb-4">
                        <h2 className="text-2xl font-bold mb-0 pb-0 text-gray-800">Upcoming Telemedicine Appointments</h2>
                        <p className="text-[12px] mt-0 pt-0 font-bold bg-gradient bg-clip-text text-transparent animate-gradient">
                            To confirm your appointment, you must pay our fee.
                        </p>
                    </div>
                    {
                        !isLoading ?
                            <div>
                                {telemedicine?.length === 0 ? (
                                    <p className="text-gray-500">No upcoming appointments.</p>
                                ) : (
                                    <ul>
                                        {telemedicine?.map((appointment, index) => (
                                            <li key={index} className="border-b py-4 flex justify-between items-center">
                                                <div className='flex-1'>
                                                    <h3 className="md:text-lg md:font-semibold font-medium text-gray-700">{appointment?.specialty}</h3>
                                                    <p className="text-gray-500 text-[12px] md:text-base ">{appointment?.date || '28/07/2024'}</p>
                                                </div>
                                                <div className="flex-1 flex justify-center">
                                                    <p>12:30:42</p>
                                                </div>
                                                {/* <div className="ml-4">
                                            <CountdownTimer targetDate={targetDate} />
                                </div> */}
                                                <div className='flex flex-1 items-center md:gap-5 justify-center text-2xl'>
                                                    <MdCancel className='cursor-pointer text-red-700' onClick={() => handleTelemedicineCancel(appointment)} />
                                                    <MdPaid className='cursor-pointer text-blue-700' onClick={handlePayClick} />
                                                </div>
                                                <div className='flex-1 flex justify-end'>
                                                    <div>
                                                        {/* <p className='text-center text-[5px]font-bold text-purple-600'>Pending</p> */}
                                                        <button className="bg-blue-500  text-white py-1 px-3 rounded-md">
                                                            Track Your Meeting
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                        )}
                                    </ul>
                                )}
                            </div> :
                            <div>
                                <span className="loading loading-ring loading-xs"></span>
                                <span className="loading loading-ring loading-sm"></span>
                                <span className="loading loading-ring loading-md"></span>
                                <span className="loading loading-ring loading-lg"></span>
                            </div>
                    }

                </div>

                <div className='mt-10 flex flex-col gap-4 md:w-1/3'>
                    <button
                        onClick={() => {
                            navigate('/doctors')
                        }}
                        className='btn btn-md btn-outline hover:bg-warning hover:border-none hover:text-black'>Book Appointment with your desire Doctor</button>
                    <button
                        onClick={() => {
                            navigate('/telemedicine-booking')
                        }}
                        className='btn btn-md btn-outline hover:bg-warning hover:border-none hover:text-black'>Book a Telemedicine Appointment</button>
                </div>
            </section>
        </div>
    );
};

export default Appointment;


