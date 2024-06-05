import React from 'react';

const CategoryCard = ({ category }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={category.photo} alt={category.name} className="w-full h-48 object-cover"/>
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                {/* <p className="text-gray-700">Medicines: {category.medicineCount}</p> */}
            </div>
        </div>
    );
};

export default CategoryCard;
