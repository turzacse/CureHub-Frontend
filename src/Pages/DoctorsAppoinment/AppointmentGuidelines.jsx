import React from 'react';
import PageHeading from '../../Components/PageHeading/PageHeading';
import Heading from '../../Components/PageHeading/Heading';

const AppointmentGuidelines = () => {
    const data = [
        {
            title: 'Appointment Options',
            description: 'You can schedule appointments both online through our website or offline by contacting our office directly.'
        },
        {
            title: 'What to Bring',
            list: [
                'Bring a valid ID and your insurance card (if applicable).',
                'Any relevant medical records or test results related to your appointment.'
            ]
        },
        {
            title: 'Arrival Time',
            list: [
                'Please arrive at least 15 minutes before your scheduled appointment.',
                'This allows time for check-in, paperwork, and any necessary updates to your information.'
            ]
        },
        {
            title: 'Preparing for Specific Appointments',
            list: [
                'General Visits: Be ready to discuss your current health concerns and any symptoms you are experiencing.',
                `Specialist Appointments: Follow any preparation instructions provided by the specialist's office (e.g., fasting before a blood test).`
            ]
        },
        {
            title: 'Cancellation Policy',
            list: [
                'Notify us at least 24 hours in advance if you need to cancel or reschedule your appointment.',
                `Late cancellations may result in a fee.`
            ]
        },
        {
            title: 'Location and Parking',
            list: [
                'Our medical center is located at 39/B Mymensingh.',
                'Parking is available in our outfield for your convenience.'
            ]
        },
        {
            title: 'Accessibility',
            list: [
                'Our facilities are wheelchair accessible.',
                'Please inform us of any special accommodations you may need when scheduling your appointment.'
            ]
        },
        
    ]
    return (
        <div className='  mx-auto pb-2'>
            <Heading title='Appointment Guidelines' subtitle='Essential Info to Ensure a Smooth & Efficient Appointment' />
            
            <div className='my-10 lg:container lg:mx-auto mx-4 text-white  space-y-5'>
                {
                    data.map((item, index) => <div key={index}>
                        <h2 className='font-bold text-[16px] md:text-[20px] mb-2'>{item.title}</h2>
                        <p>{item.description}</p>
                        <ul>
                            {
                                item.list?.map((i,j) => <li key={j}>{i}</li>)
                            }
                        </ul>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AppointmentGuidelines;