import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard'; // Adjust the import path as needed
import Headline from '../Headline';

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    useEffect( () => {
        fetch('https://cure-hub-backend-gules.vercel.app/category')
        .then(res => res.json())
        .then(data => setCategories(data))
    } ,[])

    return (
        <div className=" md:mx-20 mx-4 py-10">
            {/* <h2 className="text-3xl font-bold mb-6">Categories</h2> */}
            <Headline headline='Categories' />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {categories?.map(category => (
                    <div key={category.id} onClick={() => handleCategoryClick(category.id)}>
                        <CategoryCard category={category} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const handleCategoryClick = (categoryId) => {
    // Navigate to category details page
    console.log(`Navigate to category ${categoryId}`);
    // Example navigation using React Router:
    // history.push(`/category/${categoryId}`);
};

export default CategorySection;
