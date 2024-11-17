import React, { useState } from 'react';

const OffersModal = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg md:w-1/2 w-full mx-4">
                <h2 className="text-2xl font-bold mb-4">Special Offers</h2>
                <ul className='py-2 md:space-y-4 space-y-1 text-[12px] text-black md:text-[16px]'>
                    <li>Offer 1: 10% off on all orders above TK 1000</li>
                    <li>Offer 2: Buy 1 Get 1 Free on some select medicine</li>
                    <li>Offer 3: Free shipping on orders over TK3000</li>
                    <li>Offer 4: Free shipping on orders if you take Membership</li>
                </ul>
                <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Close</button>
            </div>
           
        </div>
    );
};

const OfferSection = () => {
    const [isOffersModalVisible, setOffersModalVisible] = useState(false);

    const handleViewOffersClick = () => {
        setOffersModalVisible(true);
    };

    const handleCloseOffersModal = () => {
        setOffersModalVisible(false);
    };
    return (
        <section className=" bg-gradient-to-r from-teal-400 to-blue-500 text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Special Promotions</h2>
            <p className="text-lg mb-6">Get up to 50% off on selected medicine!</p>
            <button
                onClick={() => {
                    setOffersModalVisible(true);
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">View Offers</button>
                 <OffersModal isVisible={isOffersModalVisible} onClose={handleCloseOffersModal} />
        </section>
    );
};

export default OfferSection;