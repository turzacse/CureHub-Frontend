import React from 'react';

const FeaturedProductsSection = () => {
    // Fake data for featured products
    const featuredProducts = [
        {
            id: 1,
            name: 'Product 1',
            image: 'https://via.placeholder.com/150',
            price: '$10.99',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 2,
            name: 'Product 2',
            image: 'https://via.placeholder.com/150',
            price: '$15.99',
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 3,
            name: 'Product 3',
            image: 'https://via.placeholder.com/150',
            price: '$20.99',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
    ];

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-gray-700">{product.description}</p>
                            <p className="text-gray-900 font-semibold mt-2">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProductsSection;
