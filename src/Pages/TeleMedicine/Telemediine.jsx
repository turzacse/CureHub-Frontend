import React from 'react';
import Heading from '../../Components/PageHeading/Heading';
import OurExpertise from './OurExpertise';
import SpecialOffers from './SpecialOffer';
import Chose from './Chose';
import CTAtele from './CTASection';

const Telemediine = () => {
    return (
        <div>
            <Heading title='Telemedicine and Medical Consultancy' subtitle='Convenient, Reliable, and Expert Medical Advice from the Comfort of Your Home' />
            <div className=" min-h-screen ">
            <div className="">
                {/* <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-teal-700 mb-2">Telemedicine and Medical Consultancy</h1>
                    <p className="text-lg text-gray-700">Convenient, Reliable, and Expert Medical Advice from the Comfort of Your Home</p>
                </header> */}

                <OurExpertise/>
                <Chose/>
                <CTAtele/>
                <SpecialOffers/>

               

                {/* <section>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Book an Appointment</h2>
                        <p className="text-gray-600 mb-4">
                            Schedule your telemedicine appointment with just a few clicks. Choose your preferred date and time, and provide some basic information to help us understand your medical needs.
                        </p>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input type="email" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Preferred Date</label>
                                <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Preferred Time</label>
                                <input type="time" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Medical Concern</label>
                                <textarea className="w-full p-2 border border-gray-300 rounded-md" rows="4"></textarea>
                            </div>
                            <button type="submit" className="w-full py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700">Book Appointment</button>
                        </form>
                    </div>
                </section> */}
            </div>
        </div>
        </div>
    );
};

export default Telemediine;