import React, { useEffect, useState } from 'react';
import MembershipPlans from '../Home/MembershipPlans';
import Heading from '../../Components/PageHeading/Heading';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import PaymentForm from '../CheckOut/SSL';

const plans = [
    {
        name: 'Basic Plan',
        price: 999,
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
        price: 2999,
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
        price: 4999,
        features: [
            'All features of the Premium Plan',
            'Coverage for up to 4 family members',
            'Family health monitoring and shared medical records',
            'Dedicated family health advisor',
            'Wellness programs and discounts on health products'
        ]
    }
];

const FAQ = [
    {
        question: "What is included in each membership plan?",
        answer: "Each plan includes different levels of healthcare services, discounts, and personalized care. Refer to the plan comparison table above for more details."
    },
    {
        question: "Can I change my plan later?",
        answer: "Yes, you can upgrade or downgrade your plan at any time to better suit your healthcare needs."
    },
    {
        question: "How do I sign up for a membership?",
        answer: `Click on the "Get Started" or "Join Now" buttons to begin the sign-up process and choose your plan.`
    },
]

const MemberShip = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    return (
        <div>
            <Heading title='Membership' />
            <div className="text-center text-white mx-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Ready to Choose Your Plan?</h2>
                <p className="text-lg mb-4">Select the plan that best suits your healthcare needs and start enjoying the benefits today.</p>
                <div className="flex justify-center items-center">
                    <p className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Get Started</p>
                    <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">Join Now</p>
                </div>
            </div>
            <section className=" bg-white md:mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">Choose the Right Membership Plan for You</h2>
                <p className="mb-8">Affordable and flexible plans to suit your healthcare needs.</p>
                <div className="grid container mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div key={index} className="bg-gray-300 mx-4 p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
                            <p className="text-xl font-bold text-teal-500 mb-4">TK {plan.price}/month</p>
                            <ul className="text-left lg:h-[220px] md:h-[240px] mb-6">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="mb-2">• {feature}</li>
                                ))}
                            </ul>
                            <button className="bg-teal-500 mt-10 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300">
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>

            </section>
            {/* <PaymentForm/> */}
            <section>
                <div className="py-8 text-white lg:container lg:mx-auto mx-4">
                    <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                    <div>
                        {FAQ.map((item, index) => (
                            <div key={index} className='mb-4'>
                                <button
                                    className='w-full flex justify-between items-center text-left p-4 bg-white text-gray-700 font-bold focus:outline-none rounded-t-lg'
                                    onClick={() => handleToggle(index)}
                                >
                                    <span>{index + 1}. {item.question}</span>

                                    {activeIndex === index ?
                                        <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />
                                    }


                                </button>
                                {activeIndex === index && (
                                    <div className='p-4 bg-gray-200 text-black rounded-b-lg'>
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MemberShip;