import React, { useEffect } from 'react';
// import 'swiper/swiper-bundle.css'; // Import Swiper styles
import Swiper from 'swiper'; // Import Swiper bundle with all modules

const DiscountProducts = () => {
    useEffect(() => {
        // Initialize Swiper when the component mounts
        const swiper = new Swiper('.swiper-container', {
            // Swiper options here
            spaceBetween: 20,
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        // Clean up Swiper instance when the component unmounts
        return () => {
            swiper.destroy();
        };
    }, []); // Empty dependency array ensures this effect runs only once

    // Fake data for discount products
    const discountProducts = [
        {
            id: 1,
            title: 'Product 1',
            description: 'Description for product 1',
            image: 'https://via.placeholder.com/300x200.png?text=Product+1',
            discount: 10 // 10% discount
        },
        {
            id: 2,
            title: 'Product 2',
            description: 'Description for product 2',
            image: 'https://via.placeholder.com/300x200.png?text=Product+2',
            discount: 20 // 20% discount
        },
        {
            id: 3,
            title: 'Product 3',
            description: 'Description for product 3',
            image: 'https://via.placeholder.com/300x200.png?text=Product+3',
            discount: 15 // 15% discount
        }
    ];

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6">Discount Products</h2>
            <div className="swiper-container">
                <div className="swiper-wrapper flex">
                    {discountProducts.map(product => (
                        <div key={product.id} className="swiper-slide">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={product.image} alt={product.title} className="w-full h-64 object-cover"/>
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                                    <p className="text-gray-700">{product.description}</p>
                                    <p className="text-red-500 font-bold mt-2">{product.discount}% Discount</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
        </div>
    );
};

export default DiscountProducts;
