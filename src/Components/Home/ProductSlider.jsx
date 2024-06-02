import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 4250,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    // Fake data for products
    const products = [
        {
            id: 1,
            title: 'Product 1',
            description: 'Description for product 1',
            image: 'https://via.placeholder.com/300x200.png?text=Product+1'
        },
        {
            id: 2,
            title: 'Product 2',
            description: 'Description for product 2',
            image: 'https://via.placeholder.com/300x200.png?text=Product+2'
        },
        {
            id: 3,
            title: 'Product 3',
            description: 'Description for product 3',
            image: 'https://via.placeholder.com/300x200.png?text=Product+3'
        }
    ];

    return (
        <div className="container mx-auto py-10 px-7 md:px-4">
            <Slider {...settings}>
                {products.map(product => (
                    <div key={product.id} className="p-4">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={product.image} alt={product.title} className="w-full h-48 sm:h-64 object-cover"/>
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                                <p className="text-gray-700">{product.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductSlider;
