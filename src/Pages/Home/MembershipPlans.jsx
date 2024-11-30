import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const plans = [
    {
        name: 'Basic Plan',
        price: 299,
        features: [
            'Access to online medicine purchase',
            'Book appointments with general practitioners',
            'Basic medical analysis',
            'Secure storage of medical records',
            'Limited telemedicine consultations (up to 3 per month)',
            'Email support'
        ]
    },
    {
        name: 'Premium Plan',
        price: 499,
        features: [
            'All features of the Basic Plan',
            'Unlimited telemedicine consultations',
            'Priority booking for doctor appointments',
            'Advanced medical analysis and diagnostics',
            'Personalized health tips and recommendations',
            '24/7 phone and chat support'
        ]
    },
    {
        name: 'Family Plan',
        price: 999,
        features: [
            'All features of the Premium Plan',
            'Coverage for up to 4 family members',
            'Family health monitoring and shared medical records',
            'Dedicated family health advisor',
            'Wellness programs and discounts on health products'
        ]
    }
];

const MembershipPlans = () => {
    const navigate = useNavigate();
    return (
        <section className=" mx-auto md:py-12 py-8 text-center">
            <h2 className="md:text-2xl font-bold text-white ">Choose the Right Membership Plan for You</h2>
            <p className="md:mb-8 mb-4 text-white md:text-lg text-xs">Affordable and flexible plans to suit your healthcare needs.</p>
            <div className="grid container mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gp-8">
                {plans.map((plan, index) => (
                    <div key={index} className="bg-gray-300 mx-4 p-6 rounded-lg shadow-md">
                        <h3 className="md:text-2xl font-bold mb-0 text-yellow-700">{plan.name}</h3>
                        <p className="md:text-xl text-sm font-bold text-teal-500 mb-4">TK {plan.price}/month</p>
                        <ul className="text-left lg:h-[220px] md:h-[240px] mb-6">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="mb-2 text-[12px] md:text-[16px]">• {feature}</li>
                            ))}
                        </ul>

                    </div>
                ))}
            </div>
            <button
            onClick={ () => {
                navigate('/membership-plan')
            }}
            className="bg-teal-500 md:mt-10 mt-5 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300 text-[12px] md:text-[16px]">
                CHOSE YOUR PLAN
            </button>
        </section>
    );
};

export default MembershipPlans;
