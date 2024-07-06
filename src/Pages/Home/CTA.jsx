import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-gradient-to-r from-teal-400 to-blue-500 text-white lg:py-16 py-8 text-center">
            <h2 className="md:text-4xl text-2xl font-bold md:mb-4 ">Join CureHub Today</h2>
            <p className="md:mb-8 mb-4 text-[12px] md:text-[16px] px-10 ">
                Take control of your healthcare with our comprehensive platform. Click the button below to get started.
            </p>
            <button 
            onClick={() => {
                navigate('/sign-up')
            }}
            className="bg-white text-teal-500 font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-gray-100 transition duration-300">
                Sign Up Now
            </button>
        </section>
    );
};

export default CTASection;
