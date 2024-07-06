import React from 'react';
import Heading from '../../Components/PageHeading/Heading';
import img1 from '../../assets/Image/Service/1.png'
import img3 from '../../assets/Image/Service/3.png'
import img4 from '../../assets/Image/Service/4.png'
import img5 from '../../assets/Image/Service/5.png'
import img6 from '../../assets/Image/Service/6.png'
import img7 from '../../assets/Image/Service/7.png'

const services = [
    {
        title: "Online Medicine Purchase",
        description: "Browse and purchase a wide variety of medicines from the comfort of your home. Our platform offers a user-friendly interface to search for and order prescription and over-the-counter medicines with ease.",
        details: "Fast delivery, authentic medicines, competitive prices.",
        photo: img6
    },
    {
        title: "Doctor Appointments",
        description: "Easily book appointments with experienced doctors for in-person consultations. Our extensive network of healthcare professionals ensures that you can find the right doctor for your needs.",
        details: "Convenient booking system, reminder notifications, access to specialists in various fields.",
        photo: img1,
    },
    {
        title: "Telemedicine Services",
        description: "Consult with doctors remotely via video calls. Our telemedicine services allow you to receive medical advice, prescriptions, and follow-up consultations without leaving your home.",
        details: "Secure video calls, easy scheduling, access to top doctors.",
        photo: img5,
    },
    {
        title: "Medical Analysis",
        description: "Upload your medical reports and receive detailed analysis from our expert doctors. Our analysis services help you understand your health better and provide actionable insights.",
        details: "Accurate analysis, personalized recommendations, comprehensive health reports.",
        photo: img7
    },
    {
        title: "Patient History Management",
        description: "Keep track of your medical history in one place. Our platform allows you to store and manage your health records securely, making it easier to share with doctors and healthcare providers.",
        details: "Secure storage, easy access, detailed medical records.",
        photo: img3,
    },
    {
        title: "Appointment Guidelines",
        description: "Get clear and detailed guidelines on how to prepare for your appointments, what to expect during consultations, and post-appointment care instructions.",
        details: "Preparation tips, consultation process, aftercare advice.",
        photo: img1,
    },
    {
        title: "Telemedicine Appointments",
        description: "Book and manage your telemedicine appointments with ease. Our system ensures smooth scheduling, timely reminders, and seamless video consultations with your chosen doctors.",
        details: "User-friendly booking system, timely reminders, seamless video consultations.",
        photo: img5
    },
    {
        title: "Medical and Health Products",
        description: "Purchase a variety of health-related products, including medical devices, health supplements, and personal care items, all available on our platform.",
        details: "Wide selection, high-quality products, competitive prices.",
        photo: img4
    }
];

const ServiceCard = ({ service }) => {
    return (
        //
        <div className='bg-[#2E92A4] w-[300px] shadow-md rounded-lg'>
            <img className='w-full h-[200px] mx-auto rounded-t-lg shadow-sm' src={service.photo} alt="" />
            <div className='px-6 py-4'>
            <h3 className='text-lg text-white font-semibold'>{service.title}</h3>
            {/* <p className='text-white text-justify mb-4'>{service.description}</p> */}
            {/* <button className='text-blue-500 hover:underline'>Learn More</button> */}
            </div>
        </div>
    );
};

const Service = () => {
    return (
        <div>
            <Heading title='Our Comprehensive Services' subtitle='Explore the Wide Range of Medical and Healthcare Services We Offer to Ensure Your Well-being' />
            <div className='container mx-auto py-10'>
                <div className='grid mx-20 justify-center  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>
                {/* <img src={img1} alt="" /> */}
            </div>
        </div>
    );
};

export default Service;