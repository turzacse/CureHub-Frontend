import React, { useEffect, useState } from 'react';
import Headline from '../Headline';

const PopularCategoriesSection = () => {

    const [popularCategories, setPopularCategories] = useState([]);

    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/category')
            .then(res => res.json())
            .then(data => {
                const shuffledQueries = shuffleArray(data);
                setPopularCategories(shuffledQueries.slice(0, 3));
            });
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // console.log(queries);

    const handleQueryClick = (id) => {
        // Handle the query click event
        // console.log(`Query ${id} clicked`);
    };

    return (
        <div className="mx-4 md:mx-20 py-10">
            <Headline className='mb-5' headline='Our Popular Category' />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularCategories.map(category => (
                    <div key={category._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={category.photo} alt={category.name} className="w-full h-48 object-cover"/>
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                            {/* <p className="text-gray-700">{category.numMedicines} Medicines</p> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCategoriesSection;
