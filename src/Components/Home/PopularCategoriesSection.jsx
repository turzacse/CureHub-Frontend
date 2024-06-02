import React from 'react';

const PopularCategoriesSection = () => {
    // Fake data for popular categories
    const popularCategories = [
        {
            id: 1,
            name: 'Pain Relief',
            image: 'https://via.placeholder.com/150',
            numMedicines: 120
        },
        {
            id: 2,
            name: 'Cold & Flu',
            image: 'https://via.placeholder.com/150',
            numMedicines: 90
        },
        {
            id: 3,
            name: 'Vitamins & Supplements',
            image: 'https://via.placeholder.com/150',
            numMedicines: 200
        }
    ];

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6">Popular Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularCategories.map(category => (
                    <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={category.image} alt={category.name} className="w-full h-48 object-cover"/>
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                            <p className="text-gray-700">{category.numMedicines} Medicines</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCategoriesSection;
