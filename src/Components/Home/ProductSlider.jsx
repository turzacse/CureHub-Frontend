import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/Image/1.png'
import img2 from '../../assets/Image/2.png'
import img3 from '../../assets/Image/3.png'

const ProductSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 100,
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
            title: 'Health careing',
            description: 'Description for product 1',
            image: img1
        },
        {
            id: 2,
            title: 'Campaign',
            description: 'Description for product 2',
            image: img2
        },
        {
            id: 3,
            title: 'Pharmacy',
            description: 'Description for product 3',
            image: img3
        }
    ];

    return (
        <div className=" md:mx-20 mx-2 py-10 px-7 md:px-4">
            <Slider {...settings}>
                {products.map(product => (
                    <div key={product.id} className="p-4">
                        <div className="bg-[#41b3b3] rounded-lg shadow-xl overflow-hidden">
                            <img src={product.image} alt={product.title} className="md:w-full md:h-[500px] object-cover"/>
                            <div className="p-6 text-white">
                                <h2 className="md:text-xl font-bold mb-2">{product.title}</h2>
                                <p className="">{product.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductSlider;
