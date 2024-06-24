import React, { useEffect, useState } from 'react';
import SeeAllDetails from '../SeeAllDetails';
import Headline from '../Headline';

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect( () => {
        fetch('Testimonial.json')
        .then(res => res.json())
        .then(data => {
            const shuffledQueries = shuffleArray(data);
            setTestimonials(shuffledQueries.slice(0, 5));
        });
    } ,[]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    // Fake data for testimonials
    // const testimonials = [
    //     {
    //         id: 1,
    //         name: 'John Doe',
    //         testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel erat eu velit semper luctus.'
    //     },
    //     {
    //         id: 2,
    //         name: 'Jane Smith',
    //         testimonial: 'Nulla facilisi. Fusce a quam eget justo volutpat euismod nec id mi.'
    //     },
    //     {
    //         id: 3,
    //         name: 'Alice Johnson',
    //         testimonial: 'Sed malesuada nisi id feugiat lacinia. Morbi tristique purus nec leo consequat, at molestie lacus suscipit.'
    //     }
    // ];

    return (
        <div className="mx-20 py-10">
            <Headline headline='Testimonial' />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="bg-[#1A6868] rounded-lg shadow-lg overflow-hidden text-white">
                        <div className="p-4">
                            <img className='rounded-full h-[80px] w-[80px] mx-auto' src="https://i.ibb.co/0rpPRJQ/siam23.jpg" alt="" />
                            <p className="">{testimonial.testimonial}</p>
                            <p className=" font-semibold mt-2">- {testimonial.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SeeAllDetails button='SEE ALL' routes='/testimonial' description='To explore more testimonial and stay with CureHub, please click on it' />
        </div>
    );
};

export default TestimonialsSection;
