import React from 'react';
import img1 from '../../assets/Icon/s1.png'
import img2 from '../../assets/Icon/s2.png'
import img3 from '../../assets/Icon/s3.png'
import img4 from '../../assets/Icon/s4.png'
import img5 from '../../assets/Icon/s5.png'
import img6 from '../../assets/Icon/pay.png'
import { NavLink } from 'react-router-dom';

const Tab3 = () => {
    const services = [
        {
            title: "Purchase",
            description: "You can purchase any medicine from our online medical shop.",
            icon: img1
        },
        {
            title: "Payment Method",
            description: "We offer flexible payment options, including cash on delivery and online payments.",
            icon: img6
        },
        {
            title: "Delivery",
            description: "Expect delivery of your purchased medicines within 24 hours.",
            icon: img2
        },
        // {
        //     title: 'Notify',
        //     description: 'Admin informs the user and doctor about the appointment.',
        //     icon: img4
        // },
        // {
        //     title: 'Meeting',
        //     description: 'Attend the appointment via video call on the scheduled date and time.',
        //     icon: img6
        // },
        // {
        //     title: 'Prescription',
        //     description: 'Receive your prescription online.',
        //     icon: img5
        // }
    ];

    return (
        <div className="">
            <div className='lg:container lg:mx-auto mx-4 py-12 '>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {services.map((service, index) => (
                        <div key={index} className='bg-gray-300 rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105'>
                            <div className='p-6 flex items-center'>
                                <span className='text-sm font-bold py-[5px] px-[10px] mr-2  rounded-full absolute top-2 right-0 bg-warning'>{index + 1}</span>
                                <img src={service.icon} alt={service.title} className='w-12 h-12 object-contain mr-4' />
                                <div>
                                    <h3 className='text-lg font-semibold mb-2'>{service.title}</h3>
                                    <p className='text-gray-700'>{service.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center'>
                <NavLink to='/shop' className='btn btn-warning mt-10 px-5'>Click here to purchase medicine from our Medi Shop.</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Tab3;
