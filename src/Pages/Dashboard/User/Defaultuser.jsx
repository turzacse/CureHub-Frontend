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
            <Heading title='Account' ></Heading>
            <section className='lg:container lg:mx-auto mx-4 py-10'>
                <h2 className='uppercase text-2xl font-bold'>{currentuser?.username} || {currentuser?.role}</h2>

                <p>Your Telemedicine booking <span className='text-red-500 font-bold'>{telemedicineBooking?.length} </span></p>

                {
                    telemedicineBooking?.map((item) => <ul key={item._id}>
                        <li className='flex gap-2 items-center' >{item.specialty} on {item.date} <FaRegEye /> </li>
                    </ul>)
                }
            </section>
        </div>
    );
};

export default Defaultuser;