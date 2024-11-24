import React from 'react';
import icon1 from '../../assets/Icon/i1.png'
import icon2 from '../../assets/Icon/i2.png'
import icon3 from '../../assets/Icon/i3.png'
import icon4 from '../../assets/Icon/i4.png'

const benefits = [
    {
        icon: icon1,
        title: 'Convenience',
        description: 'Access healthcare services from home without the need to travel.',
    },
    {
        icon: icon2,
        title: 'Security',
        description: 'Your medical records are encrypted and securely stored.',
    },
    {
        icon: icon3,
        title: 'Comprehensive Care',
        description: 'Integrated platform offering a range of healthcare services.',
    },
    {
        icon: icon4,
        title: 'Expert Doctors',
        description: 'Consult with qualified and experienced healthcare professionals.',
    },
];

const BenefitsSection = () => {
    return (
        <section className=" mx-auto py-16  text-center">
            <h2 className="md:text-3xl text-2xl font-bold text-white mb-8">Why Choose CureHub?</h2>
            <div className="grid grid-cols-1 container mx-auto md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                    <div key={index} className="p-6 mx-4 bg-gray-300  shadow-md rounded-md">
                        <img src={benefit.icon} alt={benefit.title} className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-gray-700">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;
