// import React, { useContext } from 'react';
// import { AuthContext } from '../../Provider/AuthContext';
// import Heading from '../../Components/PageHeading/Heading';

// const Appointment = () => {
//     const {usersAppoitment} = useContext(AuthContext);
//     return (
//         <div>
//             <Heading title='Doctors Appointment' ></Heading>
//             <section className='md:container md:mx-auto mx-4 py-10'>
//                 Your Upcomming Appointment number {usersAppoitment?.length}
//             </section>
//         </div>
//     );
// };

// export default Appointment;


import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import Heading from '../../Components/PageHeading/Heading';
import { FaRegHandshake } from 'react-icons/fa';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { FcCancel } from 'react-icons/fc';
import { IoCalendarNumberSharp } from 'react-icons/io5';
import { MdDateRange } from 'react-icons/md';





const Appointment = () => {
    const { usersAppoitment } = useContext(AuthContext);

    // Calculate appointment stats
    const upcomingCount = 3;
    const bookedCount = 14;
    const canceledCount = 4;
    const metCount = 7;

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
                        <div className="text-green-500 text-4xl"><MdDateRange/> </div>
                    </div>
                    <div className="bg-gray-300 shadow-lg rounded-lg p-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-700">{upcomingCount}</h3>
                            <p className="text-gray-500">Upcoming Appointments</p>
                        </div>
                        <div className="text-blue-500 text-4xl"><IoCalendarNumberSharp/> </div>
                    </div>
                    
                    <div className="bg-gray-300 shadow-lg rounded-lg p-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-700">{canceledCount}</h3>
                            <p className="text-gray-500">Canceled Appointments</p>
                        </div>
                        <div className="text-red-500 text-4xl"><FcCancel/> </div>
                    </div>
                    <div className="bg-gray-300 shadow-lg rounded-lg p-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-700">{metCount}</h3>
                            <p className="text-gray-500">Met Appointments</p>
                        </div>
                        <div className="text-purple-500 text-4xl"><FaHandshakeSimple className='text-warning'/> </div> 
                        {/* 🤝 ❌ 📅 🗓️ */}
                    </div>
                </div>

                {/* Upcoming Appointments List */}
                <div className="bg-gray-300 shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Upcoming Appointments</h2>
                    {usersAppoitment?.length === 0 ? (
                        <p className="text-gray-500">No upcoming appointments.</p>
                    ) : (
                        <ul>
                            {usersAppoitment?.map((appointment, index) =>{
                                //  const targetDate = parseDateTime(appointment?.appointedDate || '28/08/2024', appointment?.appointedTime);
                                 return (
                            
                                
                                    <li key={index} className="border-b py-4 flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700">{appointment?.doctorName}</h3>
                                            <p className="text-gray-500 text-[12px] md:text-base ">{appointment?.appointedDate || '28/07/2024'} at {appointment?.appointedTime}</p>
                                        </div>
                                        {/* <div className="ml-4">
                                        <CountdownTimer targetDate={targetDate} />
                            </div> */}
                                        <button className="bg-blue-500 text-white py-1 px-3 rounded-md">
                                            View Details
                                        </button>
                                    </li>
                                ) })}
                        </ul>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Appointment;


