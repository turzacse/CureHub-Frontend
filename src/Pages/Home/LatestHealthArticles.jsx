import React from 'react';
import img1 from '../../assets/Icon/h1.png'
import img2 from '../../assets/Icon/h2.png'
import img3 from '../../assets/Icon/h3.png'
import img4 from '../../assets/Icon/h4.png'
import { Navigate, NavLink } from 'react-router-dom';

const articles = [
    {
        title: '10 Tips for a Healthier Lifestyle',
        description: 'Discover simple yet effective tips to improve your daily health routine.',
        image: img1,
        link: '#'
    },
    {
        title: 'Understanding Telemedicine: Benefits and Challenges',
        description: 'Learn how telemedicine is changing the landscape of healthcare.',
        image: img2,
        link: '#'
    },
    {
        title: 'Managing Chronic Diseases with Technology',
        description: 'Explore how technology can help manage chronic conditions effectively.',
        image: img3,
        link: '#'
    },
    {
        title: 'The Importance of Regular Health Checkups',
        description: 'Find out why regular health checkups are crucial for long-term wellness.',
        image: img4,
        link: '#'
    }
];

const LatestHealthArticles = () => {
    return (
        <section className="md:container md:mx-auto mx-4 md:py-12 py-4 text-center">
            <h2 className="md:text-2xl font-bold md:mb-4 text-white">Stay Informed with Our Latest Health Articles</h2>
            <p className="md:text-lg text-xs md:mb-8 mb-4 text-white">Explore our collection of health articles, tips, and news.</p>
            <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-4 md:gap-8 gap-4">
                {articles.map((article, index) => (
                    <div key={index} className="bg-gray-300 p-6 rounded-lg shadow-md">
                        <img src={article.image} alt={article.title} className="w-[140px] h-[140px] object-cover mb-4 rounded-full mx-auto " />
                        <h3 className="md:text-lg font-semibold mb-2 text-left">{article.title}</h3>
                        <p className="text-gray-700 text-[12px] md:text-[16px] text-left md:mb-4">{article.description}</p>
                        {/* <a href={article.link} className="text-teal-500 font-semibold hover:underline">Read More</a> */}
                    </div>
                ))}
                
            </div>
            <div className='flex justify-center md:mt-10 mt-5'>
                <NavLink to='/blog'
                className='bg-yellow-500 hover:bg-yellow-700 text-gray-800 font-semibold py-2 px-4 rounded shadow-lg transition duration-300 text[12px] md:text-[16px]'>
                    Explore to Read
                </NavLink>
                {/* bg-[#0D9488] */}
                </div>
        </section>
    );
};

export default LatestHealthArticles;
