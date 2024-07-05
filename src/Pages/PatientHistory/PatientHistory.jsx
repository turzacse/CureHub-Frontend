import React from 'react';
import Heading from '../../Components/PageHeading/Heading';
import { GrSecure } from 'react-icons/gr';
import { SlCamrecorder } from 'react-icons/sl';
import { FaHandshakeSimple } from 'react-icons/fa6';

const testimonials = [
    {
        quote: "CureHub has made it so easy to keep track of my medical records. I feel secure knowing my data is protected.",
        name: "John Doe"
    },
    {
        quote: "The patient history management system is user-friendly and helps me access my records anytime I need them.",
        name: "Jane Smith"
    }
];

const PatientHistory = () => {
    return (
        <div>
            <Heading title='Patient History Management' subtitle='Securely Store and Access Your Complete Medical Records in One Convenient Place' />
            <div className='container mx-auto p-4 text-white'>

                <section className='my-10'>
                    {/* <h2 className='text-2xl font-semibold mb-4 '>Introduction</h2> */}
                    <p className='text-justify'>Managing your medical history is crucial for your healthcare, as it provides a comprehensive overview of your health journey, allowing healthcare providers to make informed decisions about your care. CureHub offers a secure platform designed to store and access your complete medical records with ease, ensuring that you always have the information you need at your fingertips. Our system allows you to upload and organize various types of medical documents, including prescriptions, lab results, imaging reports, and doctor's notes, all in one convenient location. With CureHub, you can easily track your medical history, monitor your health progress, and share your records with healthcare providers to receive personalized care. Our platform's advanced encryption and security measures ensure that your personal health information remains private and protected. By managing your medical history on CureHub, you take an active role in your healthcare, leading to better health outcomes and peace of mind.</p>
                </section>

                <section className='mb-8'>
                    <h2 className='text-2xl font-semibold mb-4'>Features of Patient History Management</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        <div className='p-4 flex gap-6 justify-center items-center bg-[#2E92A4] shadow-md rounded-md'>
                            <GrSecure className='text-[50px] text-orange-300 ' />
                            <div>
                                <h3 className='text-xl font-semibold mb-2'>Secure Storage</h3>
                                <p className='text-justify'  >Your data is encrypted and securely stored on our platform.</p>
                            </div>
                        </div>
                        <div className='p-4 bg-[#2E92A4] shadow-md rounded-md flex gap-6 justify-center items-center'>
                            <FaHandshakeSimple className='text-[50px] text-orange-300 ' />
                            <div>
                                <h3 className='text-xl font-semibold mb-2'>Easy Access</h3>
                                <p className='text-justify' >Access your medical records anytime, anywhere with ease.</p>
                            </div>
                        </div>
                        <div className='p-4 bg-[#2E92A4] shadow-md rounded-md flex gap-6 justify-center items-center'>
                            <SlCamrecorder className='text-[50px] text-orange-300 ' />
                            <div>
                                <h3 className='text-xl font-semibold mb-2'>Detailed Records</h3>
                                <p className='text-justify' >Store detailed records including prescriptions, lab results, and visit notes.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='mb-8'>
                    <h2 className='text-2xl font-semibold mb-4'>How It Works</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        <div className='p-4 bg-[#2E92A4] shadow-md rounded-md'>
                            <h3 className='text-xl font-semibold mb-2'>Step 1: Sign Up / Log In</h3>
                            <p>Create an account or log in to get started.</p>
                        </div>
                        <div className='p-4 bg-[#2E92A4] shadow-md rounded-md'>
                            <h3 className='text-xl font-semibold mb-2'>Step 2: Upload Medical Records</h3>
                            <p>Upload your medical reports securely.</p>
                        </div>
                        <div className='p-4 bg-[#2E92A4] shadow-md rounded-md'>
                            <h3 className='text-xl font-semibold mb-2'>Step 3: Organize Records</h3>
                            <p>Organize your records for easy access.</p>
                        </div>
                        <div className='p-4 bg-[#2E92A4] shadow-md rounded-md'>
                            <h3 className='text-xl font-semibold mb-2'>Step 4: Access and Share Records</h3>
                            <p>Access your records anytime and share with healthcare providers.</p>
                        </div>
                    </div>
                </section>

                <section className='mb-8'>
                    <h2 className='text-2xl font-semibold mb-4'>Security and Privacy</h2>
                    <p>Your data security is our top priority. We use encryption and comply with data protection regulations to ensure your personal information is safe.</p>
                </section>

                <section className='mb-8'>
                    <h2 className='text-2xl font-semibold mb-4'>Testimonials</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className='p-4 bg-[#2E92A4] shadow-md rounded-md'>
                                <p>"{testimonial.quote}"</p>
                                <p className='mt-2 font-semibold'>- {testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className='mb-8'>
                    <h2 className='text-2xl font-semibold mb-4'>Get Started</h2>
                    <p>Take control of your health records today. Click the button below to manage your patient history with CureHub.</p>
                    <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>Manage Your History Now</button>
                </section>

            </div>
        </div>
    );
};

export default PatientHistory;
