import React from 'react';

const OurExpertise = () => {
    const specialties = [
        'General Medicine',
        'Pediatrics',
        'Gynecology',
        'Dermatology',
        'Psychiatry',
        'Nutrition and Dietetics'
    ];

    return (
        <div className="md:py-12 py-8 bg-gray-50">
            <div className=" lg:mx-auto mx-4 lg:container ">
                <h2 className="md:text-4xl text-2xl font-bold text-center md:mb-6 mb-2 text-gray-800">Our Expertise</h2>
                <p className="text-center mb-8 md:text-lg text-gray-600">
                    Our team of specialists is dedicated to providing top-notch medical advice in a wide range of fields. Whether you need general medical consultation or specialized care, our experts are here to assist you.
                </p>
                <div className="flex flex-wrap justify-center space-x-4">
                    {specialties.map((specialty, index) => (
                        <div key={index} className="bg-gray-300 rounded-lg p-4 m-2 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out ">
                            <p className="md:text-xl text-[14px] font-semibold text-gray-700">{specialty}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurExpertise;
