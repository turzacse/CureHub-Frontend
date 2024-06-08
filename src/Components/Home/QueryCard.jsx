import React from 'react';

const QueryCard = ({ query, onClick }) => {
    return (
        <div className="bg-[#1A6868] rounded-lg shadow-lg overflow-hidden cursor-pointer" onClick={onClick}>
            <img className='h-[80px] w-[80px] mt-2 rounded-full shadow-2xl mb-2 flex items-center justify-center mx-auto border-[#A6D71C] border-4' src={query.photo} alt="" />
            <p className='text-white text-center md:mx-4 mt-4 mb-8'>{query.queries}</p>
        </div>
    );
};

export default QueryCard;
