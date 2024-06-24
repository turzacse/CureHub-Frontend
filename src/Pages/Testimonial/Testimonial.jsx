import React, { useEffect, useState } from 'react';
import Headline from '../../Components/Headline';

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect( () => {
        fetch('Testimonial.json')
        .then(res => res.json())
        .then(data => setTestimonials(data));
    } ,[]);


    return (
        <div className="mx-20 py-10">
            <Headline headline='Testimonial' />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            {/* <SeeAllDetails button='SEE ALL' routes='/testimonial' description='To explore more queries & get the queries answer, please click on it' /> */}
        </div>
    );
};

export default Testimonial;