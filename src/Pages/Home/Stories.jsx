import React from 'react';
import img from '../../assets/Icon/patientt.png'

const successStories = [
    {
        title: 'Improved Health Management for John Doe',
        before: 'John struggled to keep track of his medications and missed several doctor appointments due to his busy schedule.',
        after: 'With CureHub, John now easily manages his medications and schedules appointments seamlessly, resulting in better health and fewer missed check-ups.',
        metrics: [
            'Medication adherence increased by 40%',
            'Appointment attendance improved by 50%',
        ],
        image: img,
        alt: 'John Doe',
    },
    {
        title: 'Enhanced Access to Healthcare for Jane Smith',
        before: 'Jane lived in a rural area with limited access to healthcare professionals and often had to travel long distances for medical consultations.',
        after: 'Using CureHub\'s telemedicine services, Jane now consults with top specialists from the comfort of her home, saving time and travel expenses.',
        metrics: [
            'Travel time reduced by 70%',
            'Access to specialist consultations increased by 60%',
        ],
        image: img,
        alt: 'Jane Smith',
    },
    {
        title: 'Comprehensive Care for Sarah Lee',
        before: 'Sarah faced difficulties in managing her chronic condition due to fragmented medical records and lack of coordinated care.',
        after: 'CureHub\'s integrated patient history management system allowed Sarah to consolidate her medical records, leading to better-coordinated care and improved health outcomes.',
        metrics: [
            'Health complication incidents reduced by 30%',
            'Patient satisfaction increased by 45%',
        ],
        image: img,
        alt: 'Sarah Lee',
    },
];

const SuccessStories = () => {
    return (
        <section className="py-16 lg:container lg:mx-auto mx-4 ">
            <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Real Stories, Real Impact</h2>
            <p className="text-lg  mb-8">See How CureHub is Transforming Lives</p>
            </div>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {successStories.map((story, index) => (
                        <div key={index} className="bg-gray-300 shadow-md rounded-lg overflow-hidden">
                            <img src={story.image} alt={story.alt} className="w-[200px] mx-auto mt-5 h-[200px] object-cover" />
                            <div className="p-6">
                                <h3 className="text-lg h-[45px] font-bold mb-2">{story.title}</h3>
                                <p className="text-gray-700 mb-2"><strong>Before:</strong> {story.before}</p>
                                <p className="text-gray-700 mb-2"><strong>After:</strong> {story.after}</p>
                                <ul className="text-gray-700 mb-4">
                                    {story.metrics.map((metric, index) => (
                                        <li key={index}>{metric}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;
