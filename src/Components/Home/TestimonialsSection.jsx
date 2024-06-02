import React from 'react';

const TestimonialsSection = () => {
    // Fake data for testimonials
    const testimonials = [
        {
            id: 1,
            name: 'John Doe',
            testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel erat eu velit semper luctus.'
        },
        {
            id: 2,
            name: 'Jane Smith',
            testimonial: 'Nulla facilisi. Fusce a quam eget justo volutpat euismod nec id mi.'
        },
        {
            id: 3,
            name: 'Alice Johnson',
            testimonial: 'Sed malesuada nisi id feugiat lacinia. Morbi tristique purus nec leo consequat, at molestie lacus suscipit.'
        }
    ];

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-4">
                            <p className="text-gray-700">{testimonial.testimonial}</p>
                            <p className="text-gray-900 font-semibold mt-2">- {testimonial.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsSection;
