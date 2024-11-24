import React from 'react';
import { useNavigate } from 'react-router-dom';

const MedicineAdCTA = () => {
    const navigate = useNavigate();
    return (
        //from-yellow-400 to-orange-500
        <section className="bg-gradient-to-r from-teal-400 to-blue-500 text-white lg:py-16 py-8 text-center">
            <h2 className="md:text-3xl text-2xl font-bold md:mb-4">Explore Our Medicinal Offerings</h2>
            <p className="text-[12px] md:text-[16px] px-10 text-gray-200 md:mb-8 mb-4">
                Discover a wide range of medications to support your health needs. Click below to view our selection.
            </p>
            <button 
                onClick={() => {
                    navigate('/shop');
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300">
                View Medicines
            </button>
        </section>
    );
};

export default MedicineAdCTA;
