import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnalysisCTA = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-gradient-to-r from-teal-400 to-blue-500 text-white lg:py-16 py-8 text-center">
            <h2 className="md:text-4xl text-2xl font-bold md:mb-4">Take Charge of Your Health Today</h2>
            <p className="text-[12px] md:text-[16px] px-10 text-gray-200 md:mb-8 mb-4">
            Don't wait until it's too late. Start your personalized health analysis now and take the first step towards a healthier you.
            </p>
            <button 
                onClick={() => {
                    navigate('/analysis');
                }}
                className="bg-white text-green-500 font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-gray-100 transition duration-300">
                Start Your Free Analysis
            </button>
        </section>
    );
};

export default AnalysisCTA;