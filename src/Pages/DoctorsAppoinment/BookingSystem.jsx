// import React from 'react';

// const BookingSystem = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default BookingSystem;
import React from 'react';
import PageHeading from '../../Components/PageHeading/PageHeading';
import { NavLink } from 'react-router-dom';

const BookingSystem = () => {

    const data = [
        {
          title: "Convenient Scheduling",
          description: "Our easy-to-use online booking system allows you to schedule your medical appointments with just a few clicks. Choose from a variety of available time slots that fit your busy schedule, ensuring you receive prompt and convenient healthcare services."
        },
        {
          title: "User-Friendly Interface",
          description: "Navigate our intuitive interface designed for simplicity and efficiency. Easily browse through available appointment times, select your preferred healthcare provider, and confirm your booking in seconds, all from the comfort of your home or on the go."
        },
        {
          title: "Personalized Care",
          description: "Experience personalized healthcare tailored to your needs. Provide essential details such as your name, contact information, and reason for the visit to ensure our healthcare professionals are prepared to address your concerns during your appointment."
        },
        {
          title: "Confirmation and Reminders",
          description: "Receive instant confirmation of your appointment upon booking. Additionally, our system can send you reminders via email or SMS to help you stay organized and prepared for your upcoming visit."
        },
        {
          title: "Flexibility and Accessibility",
          description: "Enjoy the flexibility of scheduling appointments at your convenience. Whether you're a new patient or returning for follow-up care, our booking system accommodates your needs, providing access to healthcare services when and where you need them most."
        },
        {
          title: "Contact Us for Assistance",
          description: "Need help with scheduling or have questions about our services? Our dedicated support team is here to assist you. Contact us via phone or email, and we'll ensure your booking experience is seamless and stress-free."
        }
      ]
    return (
        <div className=' text-white container mx-auto py-2'>
            <PageHeading title='Easy Appointment Booking System' subtitle='Schedule Your Visit Effortlessly for Personalized Care' />
            
            <div className='my-10 mx-4 md:mx-10 space-y-5 text-justify'>
                <div className=' space-y-5 text-justify'>
                {
                    data.map((item, index) => <div key={index}>
                        <h2 className='font-bold text-[16px] md:text-[20px] mb-2'>{item.title}</h2>
                        <p>{item.description}</p>
                        
                    </div>)
                }
                </div>
                {/* <NavLink className='bg-warning mt-10 px-4 py-2'>Meet Our Expert Doctors & Explore Telemedicine</NavLink> */}
                <p></p> <br /> 
                 <NavLink
                 to='/doctors'
                 className='bg-[#34ABDA] rounded-lg mt-10 px-4 py-3'>Meet Our Expert Doctors & Explore</NavLink>

            </div>
            
        </div>
    );
};

export default BookingSystem;