import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTAtele = () => {
    const navigate = useNavigate();
    return (
        <div className="md:py-16 py-8 bg-gradient-to-r from-teal-400 to-blue-500 text-white">
            <div className="max-w-4xl mx-auto text-center px-8">
                <h2 className="md:text-4xl text-2xl font-bold md:mb-4 mb-2">Get Started with Our Telemedicine Services Today!</h2>
                <p className="md:text-lg mb-8">
                    Experience convenient and quality healthcare from the comfort of your home. Join us now and take control of your health with our expert medical consultations.
                </p>
                <button
                onClick={ () => {
                    navigate('/telemedicine-booking');
                }}
                className="bg-white text-teal-500 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 ease-in-out">
                    Book Your Appointment
                </button>
            </div>
        </div>
    );
};

export default CTAtele;
