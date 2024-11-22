import React from 'react';
import img from '../../assets/Image/banner.png'

const Heading = ({title, subtitle}) => {
    return (
        <div>
            <div
                className="hero lg:h-[200px]"
                style={{
                    backgroundImage: `url(${img})`,
                }}>
                <div className="hero-overlay text-black bg-opacity-30"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="w-full py-5 text-gray-800">
                        <h1 className="md:text-4xl uppercase text-xl font-bold mb-2">{title}</h1>
                        <p className="md:text-lg text-[12px]">
                            {subtitle}
                        </p>
                        {/* <button className="btn btn-primary">Get Started</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Heading;