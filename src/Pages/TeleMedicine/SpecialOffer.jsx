import React from 'react';
import icon1 from '../../assets/Icon/tel1.png'
import icon2 from '../../assets/Icon/tel2.png'
import icon3 from '../../assets/Icon/tel3.png'

const SpecialOffers = () => {
    const offers = [
        {
            title: 'First Consultation Free',
            description: 'New users can enjoy their first telemedicine consultation at no charge.',
            img: icon1
        },
        {
            title: 'Discounted Rates',
            description: 'Get up to 30% off on follow-up consultations.',
            img: icon2
        },
        {
            title: 'Membership Plans',
            description: 'Sign up for our membership plans for unlimited consultations and exclusive healthcare benefits.',
            img: icon3
        }
    ];

    return (
        <div className="md:py-12 py-8 bg-gray-50">
            <div className=" lg:container lg:mx-auto mx-4">
                <h2 className="md:text-4xl text-2xl font-bold text-center md:mb-4 mb-2 text-gray-800">Special Offers</h2>
                <p className="text-center mb-8 md:text-lg text-gray-600">
                    Take advantage of our special offers to get the best value on your healthcare needs.
                </p>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {offers.map((offer, index) => (
                        <div key={index} className={`bg-gray-300 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out flex gap-2 justify-center items-center`}>
                            <img
                            className='h-[80px] w-[80px]'
                            src={offer.img} alt="" />
                            <div>
                                <h3 className="md:text-2xl font-bold text-gray-800">{offer.title}</h3>
                                <p className="mt-2 text-[12px] md:text-[16px] text-gray-700">{offer.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpecialOffers;
