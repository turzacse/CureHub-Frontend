import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            title: 'Sign Up or Log In',
            description: 'Create an account or log in to access our services.'
        },
        {
            title: 'Browse and Purchase Medicines',
            description: 'Explore our wide range of medicines and make purchases online.'
        },
        {
            title: 'Book Doctor Appointments',
            description: 'Schedule appointments with our experienced doctors.'
        },
        {
            title: 'Consult via Telemedicine',
            description: 'Enjoy virtual consultations with healthcare professionals.'
        },
        {
            title: 'Manage Your Patient History',
            description: 'Access and manage your medical records securely.'
        }
    ];

    return (
        <div className=' py-12'>
            <div className='lg:container lg:mx-auto mx-4 '>
                <h2 className="text-3xl font-bold mb-4 text-center text-white">How CureHub Works</h2>
                <p className="text-lg mb-8 text-center text-white">Discover How You Can Seamlessly Manage Your Health Journey with CureHub's Comprehensive Services.</p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
                    {steps.map((step, index) => (
                        <div key={index} className='bg-gray-300 rounded-lg shadow-md overflow-hidden'>
                            <div className='p-6'>
                                <h3 className='text-xl font-bold mb-4'>{`${index + 1}. ${step.title}`}</h3>
                                <p className='text-gray-700'>{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
