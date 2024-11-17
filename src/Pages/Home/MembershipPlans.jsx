import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const plans = [
    {
        name: 'Basic Plan',
        price: '$9.99/month',
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
        price: '$29.99/month',
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
        price: '$49.99/month',
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
        <section className=" mx-auto py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Choose the Right Membership Plan for You</h2>
            <p className="mb-8 text-white">Affordable and flexible plans to suit your healthcare needs.</p>
            <div className="grid container mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <div key={index} className="bg-gray-300 mx-4 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
                        <p className="text-xl font-bold text-teal-500 mb-4">{plan.price}</p>
                        <ul className="text-left lg:h-[220px] md:h-[240px] mb-6">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="mb-2">• {feature}</li>
                            ))}
                        </ul>

                    </div>
                ))}
            </div>
            <button
            onClick={ () => {
                navigate('/membership-plan')
            }}
            className="bg-teal-500 mt-10 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300">
                CHOSE YOUR PLAN
            </button>
        </section>
    );
};

export default MembershipPlans;
