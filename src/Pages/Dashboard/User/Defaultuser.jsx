import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthContext';
import { useLocation } from 'react-router-dom';
import Heading from '../../../Components/PageHeading/Heading';
import { FaRegEye } from 'react-icons/fa';

const Defaultuser = () => {
    const { user } = useContext(AuthContext);
    const [currentuser, setCurrentUser] = useState();
    const [telemedicineBooking, setTelemedicineBooking] = useState();

    const location = useLocation();

    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                const cureHubUser = data?.find((item) => item?.email === user?.email);
                setCurrentUser(cureHubUser);
            })
    }, []);

    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/telemedicine-appoinment')
            .then(res => res.json())
            .then(data => {
                const booking = data?.filter((item) => item?.cureHubUser == currentuser?._id);
                setTelemedicineBooking(booking);
            })
    }, [currentuser]);


    return (
        <div>
            <Heading title='Dashboard' subtitle='Manage your appointments, health records, and more.' ></Heading>
            {/* <section className='lg:container lg:mx-auto mx-4 py-10'>
                <h2 className='uppercase text-2xl font-bold'>{currentuser?.username} || {currentuser?.role}</h2>

                <p>Your Telemedicine booking <span className='text-red-500 font-bold'>{telemedicineBooking?.length} </span></p>

                {
                    telemedicineBooking?.map((item) => <ul key={item._id}>
                        <li className='flex gap-2 items-center' >{item.specialty} on {item.date} <FaRegEye /> </li>
                    </ul>)
                }
            </section> */}
            <div className="">

                {/* Welcome Section */}
                {/* <section className="bg-gradient-to-r from-teal-400 to-blue-500 p-6 ">
                    <h1 className="text-3xl font-bold text-center mb-4">Welcome to Your Dashboard</h1>
                    <p className="text-center text-gray-600">Manage your appointments, health records, and more.</p>
                </section> */}

                <section className='text-white'>
                    <div className='my-10 lg:container lg:mx-auto mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 '>
                        <div className=' bg-gradient-to-r from-[#7870c0] to-[#5449bb] h-[200px] rounded-lg shandow flex flex-col justify-center items-center'>

                            <h2 className='text-xl font-bold'>MemeberShip</h2>
                            <p className='text-lg font-semibold'>No Plan Yet</p>
                            <p></p>
                        </div>
                        <div className='bg-gradient-to-r from-teal-400 to-blue-500 h-[200px] rounded-lg shandow flex flex-col justify-center items-center'>
                        
                        <h2 className='text-xl font-bold'>Appointment / Telemedicine</h2>
                        <p className='text-lg font-semibold'>0 / 1</p>
                        </div>
                        <div className='bg-gradient-to-r from-orange-400 to-yellow-500 h-[200px] rounded-lg shandow flex flex-col justify-center items-center'>

                        <h2 className='text-xl font-bold'>Cart</h2>
                        <p className='text-lg font-semibold'>5</p>

                        </div>
                        <div className='bg-gradient-to-r from-pink-400 to-red-400 h-[200px] rounded-lg shandow flex flex-col justify-center items-center'>

                        <h2 className='text-xl font-bold'>Due Payment</h2>
                        <p className='text-lg font-semibold'>2</p>

                        </div>
                    </div>
                </section>

                {/* Appointments Overview */}
                {/* <section className="p-6  mb-6">
                    <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-300 border-gray-200 shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th className="py-2 px-4 text-left">Date</th>
                                    <th className="py-2 px-4 text-left">Time</th>
                                    <th className="py-2 px-4 text-left">Doctor</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr>
                                    <td className="py-2 px-4">July 15, 2024</td>
                                    <td className="py-2 px-4">10:00 AM</td>
                                    <td className="py-2 px-4">Dr. Smith</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section> */}

                {/* Telemedicine Details */}

                {/* <section className="bg-[#2C3E50] p-10  text-white ">
                    <h2 className="text-2xl font-bold mb-4">Telemedicine Details</h2>
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <p className=""> {telemedicineBooking?.map((item) => <p key={item._id}>Your next telemedicine appointment is scheduled for {item.date}</p>)}  </p>
                    </div>
                </section> */}

                {/* Consultancy Details */}

                {/* <section className="bg-gary-400 py-10 lg:container mx-auto ">
                    <h2 className="text-2xl font-bold mb-4">Consultancy Details</h2>
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-gray-600">Consultancy sessions are available from Monday to Friday, 9:00 AM - 5:00 PM. Book your session today!</p>
                    </div>
                </section> */}

                {/* Account Information */}
                {/* <section className="bg-[#2C3E50] p-10  text-white">
                    <h2 className="text-2xl font-bold mb-4">Account Information</h2>
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="">Name: John Doe</p>
                        <p className="">Email: johndoe@example.com</p>
                        <p className="">Phone: +1 234 567 890</p>
                    </div>
                </section> */}

                {/* Membership and Subscription */}
                {/* <section className="bg-gray-400 p-10  ">
                    <h2 className="text-2xl font-bold mb-4">Membership and Subscription</h2>
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-gray-600">You are subscribed to the Premium plan. Enjoy unlimited consultations and priority scheduling.</p>
                    </div>
                </section> */}

                {/* Health Records */}
                {/* <section className="bg-[#2C3E50] p-10  text-white">
                    <h2 className="text-2xl font-bold mb-4">Health Records</h2>
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="">Your health records are securely stored. Access and manage them as needed.</p>
                    </div>
                </section> */}

                {/* Support and Help */}
                {/* <section className="bg-gray-400 p-10  text-white">
                    <h2 className="text-2xl font-bold mb-4">Support and Help</h2>
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-gray-600">For assistance, contact support at support@example.com. Visit our FAQs for common questions.</p>
                    </div>
                </section> */}

                {/* Settings */}
                {/* <section className="bg-[#2C3E50] p-10  text-white">
                    <h2 className="text-2xl font-bold mb-4">Settings</h2>
                    <div className="p-4 border border-gray-200 rounded-lg">
                       
                        <p className="">Manage your account settings, notifications, and security preferences.</p>
                    </div>
                </section> */}

            </div>
        </div>
    );
};

export default Defaultuser;