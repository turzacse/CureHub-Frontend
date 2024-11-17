import React, { useEffect, useState } from 'react';
import Heading from '../../Components/PageHeading/Heading';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';

const faqData = [
    {
        question: "What is CureHub?",
        answer: "CureHub is a comprehensive healthcare platform where users can purchase medicines, book doctor appointments, access telemedicine services, and receive medical analysis, all in one place."
    },
    {
        question: "How do I sign up for an account?",
        answer: "You can sign up by clicking on the 'Sign Up' button on the top right corner of the homepage. Fill in the required details and verify your email to activate your account."
    },
    {
        question: "How can I buy medicines online?",
        answer: "After logging in, browse our online medicine store, add the required medicines to your cart, and proceed to checkout. Your medicines will be delivered to your doorstep."
    },
    {
        question: "How do I book a doctor appointment?",
        answer: "Navigate to the 'Book Appointment' section, select your preferred doctor and available time slot, and confirm your booking. You will receive a confirmation email with the appointment details."
    },
    {
        question: "What telemedicine services do you offer?",
        answer: "CureHub offers video consultations with experienced doctors. You can book a telemedicine appointment through our platform and consult with a doctor from the comfort of your home."
    },
    {
        question: "Can I get a medical analysis through CureHub?",
        answer: "Yes, CureHub provides medical analysis services. You can upload your medical reports on our platform, and our doctors will review them and provide a detailed analysis."
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept various payment methods, including credit/debit cards, net banking, and digital wallets. All transactions are secure and encrypted."
    },
    {
        question: "How do I contact customer support?",
        answer: "You can contact our customer support team by clicking on the 'Contact Us' link in the footer. We are available 24/7 to assist you with any queries or issues."
    },
    {
        question: "Can I cancel or reschedule an appointment?",
        answer: "Yes, you can cancel or reschedule your appointment through your account dashboard. Please note that cancellation and rescheduling policies may vary based on the doctor's availability."
    },
    {
        question: "Is my personal information secure on CureHub?",
        answer: "Yes, we prioritize your privacy and security. All your personal information is encrypted and stored securely. We comply with data protection regulations to ensure your data is safe."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    useEffect(() => {
        window.scroll(0,0);
    } ,[])

    return (
        <div>
            <Heading title='FAQ' subtitle='Find Answers to Common Questions About Our Services' />
            <div className='container mx-auto p-4'>
                {faqData.map((item, index) => (
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
                            <div className='p-4 bg-gray-200 rounded-b-lg'>
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
                <div className='text-white uppercase my-10'>
                    <p>Do you want to know more? Plese Click the bellow. </p>
                    {/* <button className='bg-[#3394A6] py-2 px-4 rounded-lg mt-4'></button> */}
                    <button className="bg-[#3394A6] py-2 px-4 rounded-lg mt-4" onClick={() => document.getElementById('my_modal_3').showModal()}>SEND MEASSAGE</button>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box bg-gray-50 text-black">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-600 ">✕</button>
                                <h3 className="font-bold text-lg mb-4">Send your message</h3>
                                {/* <input type="text" placeholder="Your Message" className="input input-bordered w-full max-w-xs" /> */}
                                <textarea
                                
                                type="text" placeholder="Your Message" className="input input-bordered w-full bg-gray-300 py-2 text-black h-[100px]">

                                </textarea>
                                <br />
                                <button type='submit' className='bg-[#3394A6] rounded-lg mt-4 btn-sm text-white'>SEND</button>

                            </form>
                            
                            {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
