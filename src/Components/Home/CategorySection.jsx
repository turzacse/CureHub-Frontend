import React from 'react';
import CategoryCard from './CategoryCard'; // Adjust the import path as needed

const CategorySection = () => {
    // Fake data for categories
    const categories = [
        {
            id: 1,
            name: 'Category 1',
            image: 'https://via.placeholder.com/300x200.png?text=Category+1',
            medicineCount: 20
        },
        {
            id: 2,
            name: 'Category 2',
            image: 'https://via.placeholder.com/300x200.png?text=Category+2',
            medicineCount: 15
        },
        {
            id: 3,
            name: 'Category 3',
            image: 'https://via.placeholder.com/300x200.png?text=Category+3',
            medicineCount: 10
        },
        {
            id: 4,
            name: 'Category 4',
            image: 'https://via.placeholder.com/300x200.png?text=Category+4',
            medicineCount: 25
        },
        {
            id: 5,
            name: 'Category 5',
            image: 'https://via.placeholder.com/300x200.png?text=Category+5',
            medicineCount: 30
        },
        {
            id: 6,
            name: 'Category 6',
            image: 'https://via.placeholder.com/300x200.png?text=Category+6',
            medicineCount: 18
        }
    ];

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6">Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {categories.map(category => (
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
