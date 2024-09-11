import React from 'react';
import img1 from '../../assets/Icon/s1.png'
import img2 from '../../assets/Icon/s2.png'
import img3 from '../../assets/Icon/s3.png'
import img4 from '../../assets/Icon/s4.png'
import img5 from '../../assets/Icon/s5.png'
import img6 from '../../assets/Icon/pay.png'
import { NavLink } from 'react-router-dom';

const Tab4 = () => {
    const services = [
        {
            title: 'Answering Question',
            description: 'Request an appointment by selecting a date.',
            icon: img1
        },
        {
            title: 'Confirmation',
            description: `Complete 100% payment to confirm the appointment.`,
            icon: img4
        },
        {
            title: 'Assigning',
            description: 'Admin assigns a doctor and schedules the time.',
            icon: img2
        },
        {
            title: 'Notify',
            description: 'Admin informs the user and doctor about the appointment.',
            icon: img6
        },
        {
            title: 'Meeting',
            description: 'Attend the appointment via video call on the scheduled date and time.',
            icon: img3
        },
        {
            title: 'Prescription',
            description: 'Receive your prescription online.',
            icon: img5
        }
    ];

    return (
        <div className="">
            <div className='lg:container lg:mx-auto mx-4 py-12 '>

                {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
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
                </div> */}
                <div>
                    <p className='text-center text-white'>We are working something amazing. <br /> Please stay with us.</p>
                </div>
                <div className='flex justify-center'>
                <NavLink to='/analysis' className='btn btn-warning mt-10 px-5'>Click here to do your Medical Analysis.</NavLink>
                </div>
                
            </div>
        </div>
    );
};

export default Tab4;
