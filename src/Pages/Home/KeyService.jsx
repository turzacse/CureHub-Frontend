import React from 'react';
import img1 from '../../assets/Icon/s1.png'
import img2 from '../../assets/Icon/s2.png'
import img3 from '../../assets/Icon/s3.png'
import img4 from '../../assets/Icon/s4.png'
import img5 from '../../assets/Icon/s5.png'
import img6 from '../../assets/Icon/s6.png'

const KeyServices = () => {
    const services = [
        {
            title: 'Online Medicine Purchase',
            description: 'Browse and purchase medicines online with ease.',
            icon: img1
        },
        {
            title: 'Doctor Appointments',
            description: 'Schedule appointments with experienced doctors.',
            icon: img2
        },
        {
            title: 'Telemedicine Services',
            description: 'Consult with healthcare professionals remotely.',
            icon: img3
        },
        {
            title: 'Medical Analysis',
            description: 'Get detailed medical analysis and reports.',
            icon: img4
        },
        {
            title: 'Patient History Management',
            description: 'Access and manage your medical records securely.',
            icon: img5
        },
        {
            title: 'Medical and Health Products',
            description: 'Explore and purchase medical and health-related products.',
            icon: img6
        }
    ];

    return (
        <div className="bg-gray-400">
            <div className='lg:container lg:mx-auto mx-4 py-12 '>
            <h2 className="text-3xl font-bold mb-4 text-center text-black">Key Services</h2>
            <p className="text-lg mb-8 text-center text-black">Explore Our Wide Range of Essential Healthcare Services Designed to Meet Your Every Need.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {services.map((service, index) => (
                    <div key={index} className='bg-gray-300 rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105'>
                        <div className='p-6 flex items-center'>
                            <img src={service.icon} alt={service.title} className='w-12 h-12 object-contain mr-4' />
                            <div>
                                <h3 className='text-lg font-semibold mb-2 text-black'>{service.title}</h3>
                                <p className='text-gray-700'>{service.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default KeyServices;
