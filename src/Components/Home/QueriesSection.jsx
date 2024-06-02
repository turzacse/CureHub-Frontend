import React from 'react';
import QueryCard from './QueryCard';

const QueriesSection = () => {
    // Fake data for recent queries
    const recentQueries = [
        {
            id: 1,
            user: {
                name: 'User 1',
                profilePicture: 'https://via.placeholder.com/150',
            },
            description: 'Query description 1'
        },
        {
            id: 2,
            user: {
                name: 'User 2',
                profilePicture: 'https://via.placeholder.com/150',
            },
            description: 'Query description 2'
        },
        {
            id: 3,
            user: {
                name: 'User 3',
                profilePicture: 'https://via.placeholder.com/150',
            },
            description: 'Query description 3'
        },
        {
            id: 4,
            user: {
                name: 'User 1',
                profilePicture: 'https://via.placeholder.com/150',
            },
            description: 'Query description 1'
        },
        {
            id: 5,
            user: {
                name: 'User 2',
                profilePicture: 'https://via.placeholder.com/150',
            },
            description: 'Query description 2'
        },
        {
            id: 2,
            user: {
                name: 'User 2',
                profilePicture: 'https://via.placeholder.com/150',
            },
            description: 'Query description 2'
        },
    ];

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6">Recent Queries</h2>
            <div className="overflow-hidden">
                <div className="grid grid-cols-5 gap-4">
                    {recentQueries.slice(0,5).map(query => (
                        <QueryCard key={query.id} query={query} onClick={() => handleQueryClick(query.id)} />
                    ))}
                </div>
            </div>
            <div className="mt-4 text-center">
                <a href="/all-queries" className="text-blue-500 hover:underline">See All</a>
            </div>
        </div>
    );
};

const handleQueryClick = (queryId) => {
    // Redirect to query details page
    console.log(`Redirect to query details page for query ${queryId}`);
    // Example navigation using React Router:
    // history.push(`/query/${queryId}`);
};

export default QueriesSection;
