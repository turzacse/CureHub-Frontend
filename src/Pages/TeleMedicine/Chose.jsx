import React from 'react';
import icon1 from '../../assets/Icon/i1.png'
import icon2 from '../../assets/Icon/i2.png'
import icon5 from '../../assets/Icon/i5.png'
import icon4 from '../../assets/Icon/i4.png'

const benefits = [
    {
        icon: icon1,
        title: 'Convenience',
        description: 'Access healthcare services from home without the need to travel.',
    },
    {
        icon: icon4,
        title: 'Expert Doctors',
        description: 'Certified and experienced medical professionals',
    },
    {
        icon: icon2,
        title: 'Security',
        description: 'Secure and confidential consultations',
    },
    {
        icon: icon5,
        title: 'Follow-up',
        description: 'Immediate assistance and follow-up',
    },

];

const Chose = () => {
    return (
        <section className=" mx-auto py-16  text-center">
            <div className='lg:container lg:mx-auto mx-4'>
                <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Telemedicine Services?</h2>
                <p className="text-white md:w-3/4 sm:text-justify md:text-center mx-auto mb-8">
                    Our telemedicine and medical consultancy services offer a seamless way to consult with healthcare professionals without leaving your home. Enjoy the convenience and reliability of our service, which connects you with experienced doctors for comprehensive medical advice and consultation.
                </p>
                <div className="grid grid-cols-1 container mx-auto md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="p-6 mx-4 bg-gray-300  shadow-md rounded-md">
                            <img src={benefit.icon} alt={benefit.title} className="w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-gray-700">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Chose;
