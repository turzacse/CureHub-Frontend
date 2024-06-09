import React, { useEffect, useState } from 'react';
// import 'swiper/swiper-bundle.css'; // Import Swiper styles
import Swiper from 'swiper'; // Import Swiper bundle with all modules
import Headline from '../Headline';

const DiscountProducts = () => {
    const [disCount, setDisCount] = useState([]);

    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/medicine')
            .then(res => res.json())
            .then(data => {
                const discountedItems = data.filter(item => parseFloat(item.discount) > 0);
                // Check if the new data is different from the current state
                if (JSON.stringify(discountedItems) !== JSON.stringify(disCount)) {
                    setDisCount(discountedItems);
                }
            });
    }, [disCount]);

    console.log("discount", disCount);
    // useEffect(() => {
    //     // Initialize Swiper when the component mounts
    //     const swiper = new Swiper('.swiper-container', {
    //         // Swiper options here
    //         spaceBetween: 20,
    //         slidesPerView: 'auto',
    //         navigation: {
    //             nextEl: '.swiper-button-next',
    //             prevEl: '.swiper-button-prev',
    //         },
    //     });

    //     // Clean up Swiper instance when the component unmounts
    //     return () => {
    //         swiper.destroy();
    //     };
    // }, []); // Empty dependency array ensures this effect runs only once


    return (
        <div className="md:mx-20 mx-4 py-10">
            <Headline headline='Our Discount Products' />
            <div className="">
                <div className="grid md:grid-cols-4 grid-cols-2  md:gap-3 gap-1">
                    {disCount?.slice(3,7)?.map(product => (
                        <div key={product.id} className="">
                            <div className="bg-[#c6e227e1] md:h-[400px] h-[300px] rounded-lg shadow-lg overflow-hidden h-ful">
                                <img src={product.photo} alt={product.name} className="md:w-[200px] w-[100px] mx-auto md:h-[200px] h-[100px] object-cover rounded-full mt-4" />
                                <div className="md:p-4 p-2">
                                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                                    <p className="text-gray-700 md:text-[14px] text-[12px] ">{product.description}</p>
                                    <div className='flex justify-between items-center'>
                                        <p className="text-red-500 font-bold mt-2 md:text-[14px] text-[12px]">{product.discount}% Discount</p>
                                        <div className='flex gap-2 md:text-[14px] text-[12px]'>
                                            Price: 
                                            <del className='text-gray-400'>{product.price}</del>
                                            <p className="">
                                                {product.price - (product.price * product.discount) / 100}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className="swiper-button-prev">Back</div>
                <div className="swiper-button-next">Next</div> */}
            </div>
        </div>
    );
};

export default DiscountProducts;
