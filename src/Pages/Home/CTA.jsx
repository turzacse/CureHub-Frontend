import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-gradient-to-r from-teal-400 to-blue-500 text-white  md:py-8 py-4 text-center">
            <h2 className="md:text-2xl  font-bold md:mb-4 ">Join CureHub Today</h2>
            <p className="md:mb-8 mb-4 text-[12px] md:text-[16px] px-10 ">
                Take control of your healthcare with our comprehensive platform. Click the button below to get started.
            </p>
            <button 
            onClick={() => {
                navigate('/sign-up')
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 text-[12px] md:text-[16px] ">
                Sign Up Now
            </button>
        </section>
    );
};

export default CTASection;
