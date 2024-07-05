import React from 'react';
import Heading from '../../Components/PageHeading/Heading';

const services = [
    {
        title: "Online Medicine Purchase",
        description: "Browse and purchase a wide variety of medicines from the comfort of your home. Our platform offers a user-friendly interface to search for and order prescription and over-the-counter medicines with ease.",
        details: "Fast delivery, authentic medicines, competitive prices."
    },
    {
        title: "Doctor Appointments",
        description: "Easily book appointments with experienced doctors for in-person consultations. Our extensive network of healthcare professionals ensures that you can find the right doctor for your needs.",
        details: "Convenient booking system, reminder notifications, access to specialists in various fields."
    },
    {
        title: "Telemedicine Services",
        description: "Consult with doctors remotely via video calls. Our telemedicine services allow you to receive medical advice, prescriptions, and follow-up consultations without leaving your home.",
        details: "Secure video calls, easy scheduling, access to top doctors."
    },
    {
        title: "Medical Analysis",
        description: "Upload your medical reports and receive detailed analysis from our expert doctors. Our analysis services help you understand your health better and provide actionable insights.",
        details: "Accurate analysis, personalized recommendations, comprehensive health reports."
    },
    {
        title: "Patient History Management",
        description: "Keep track of your medical history in one place. Our platform allows you to store and manage your health records securely, making it easier to share with doctors and healthcare providers.",
        details: "Secure storage, easy access, detailed medical records."
    },
    {
        title: "Appointment Guidelines",
        description: "Get clear and detailed guidelines on how to prepare for your appointments, what to expect during consultations, and post-appointment care instructions.",
        details: "Preparation tips, consultation process, aftercare advice."
    },
    {
        title: "Telemedicine Appointments",
        description: "Book and manage your telemedicine appointments with ease. Our system ensures smooth scheduling, timely reminders, and seamless video consultations with your chosen doctors.",
        details: "User-friendly booking system, timely reminders, seamless video consultations."
    },
    {
        title: "Medical and Health Products",
        description: "Purchase a variety of health-related products, including medical devices, health supplements, and personal care items, all available on our platform.",
        details: "Wide selection, high-quality products, competitive prices."
    }
];

const ServiceCard = ({ service }) => {
    return (
        <div className='p-6 bg-[#2E92A4] shadow-md rounded-md'>
            <h3 className='text-xl font-semibold mb-2'>{service.title}</h3>
            <p className='text-white text-justify mb-4'>{service.description}</p>
            {/* <button className='text-blue-500 hover:underline'>Learn More</button> */}
        </div>
    );
};

const Service = () => {
    return (
        <div>
            <Heading title='Our Comprehensive Services' subtitle='Explore the Wide Range of Medical and Healthcare Services We Offer to Ensure Your Well-being' />
            <div className='container mx-auto py-10'>
                <div className='grid justify-center mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Service;