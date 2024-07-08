// import React from 'react';

// const OurExpertise = () => {
//     const specialties = [
//         'General Medicine',
//         'Pediatrics',
//         'Gynecology',
//         'Dermatology',
//         'Psychiatry',
//         'Nutrition and Dietetics'
//     ];

//     return (
//         <div className=" py-10 bg-gray-400">
//             <div className="max-w-4xl mx-auto p-6 bg-gray-300 shadow-lg rounded-lg">
//                 <h2 className="text-3xl font-bold text-center mb-4">Our Expertise</h2>
//                 <p className="text-center mb-6">
//                     We have a diverse team of specialists ready to provide expert medical advice in various fields such as:
//                 </p>
//                 <ul className="list-disc list-inside space-y-2">
//                     {specialties.map((specialty, index) => (
//                         <li key={index} className="text-lg">
//                             {specialty}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default OurExpertise;







import React from 'react';

const OurExpertise = () => {
    const specialties = [
        'General Medicine',
        'Pediatrics',
        'Gynecology',
        'Dermatology',
        'Psychiatry',
        'Nutrition and Dietetics'
    ];

    return (
        <div className="py-12 bg-gray-400">
            <div className=" mx-auto p-8 ">
                <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Our Expertise</h2>
                <p className="text-center mb-8 text-lg text-gray-600">
                    Our team of specialists is dedicated to providing top-notch medical advice in a wide range of fields. Whether you need general medical consultation or specialized care, our experts are here to assist you.
                </p>
                <div className="flex flex-wrap justify-center space-x-4">
                    {specialties.map((specialty, index) => (
                        <div key={index} className="bg-gray-300 rounded-lg p-4 m-2 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <p className="text-xl font-semibold text-gray-700">{specialty}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurExpertise;
