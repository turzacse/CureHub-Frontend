import React from 'react';

const QueryCard = ({ query, onClick }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer" onClick={onClick}>
            <img src={query.user.profilePicture} alt={query.user.name} className="w-full h-48 object-cover"/>
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{query.user.name}</h3>
                <p className="text-gray-700">{query.description}</p>
            </div>
        </div>
    );
};

export default QueryCard;
