import React from 'react';
import img1 from '../../assets/Icon/s1.png'
import img2 from '../../assets/Icon/s2.png'
import img3 from '../../assets/Icon/s3.png'
import img4 from '../../assets/Icon/s4.png'
import img5 from '../../assets/Icon/s5.png'
import img6 from '../../assets/Icon/pay.png'
import { NavLink } from 'react-router-dom';

const Tab1 = () => {
    const services = [
        {
            title: 'Booking',
            description: 'Users must first book an appointment with a doctor.',
            icon: img1
        },
        {
            title: 'Confirmation',
            description: `Users must pay CureHub's charge to confirm the appointment; otherwise, it will be automatically canceled after one hour.`,
            icon: img2
        },
        {
            title: 'Notify',
            description: 'After confirmation, CureHub will notify the doctor about the appointment, and the user will also receive a notice.',
            icon: img3
        },
        {
            title: 'Appointment',
            description: 'On the specified date and time, users will meet the doctor directly.',
            icon: img4
        },
        {
            title: 'Confirm Payment',
            description: 'After the appointment, the doctor will confirm the payment.',
            icon: img6
        },
        {
            title: 'Prescription',
            description: 'Finally, users will receive their prescription both online and offline, and their data will be stored on CureHub.',
            icon: img5
        }
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
                <NavLink to='/doctors' className='btn btn-warning mt-10 px-5'>Click here to book an appointment with a doctor.</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Tab1;
