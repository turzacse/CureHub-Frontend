import React, { useEffect, useState } from 'react';
import QueryCard from './QueryCard';
import Headline from '../Headline';
import { NavLink } from 'react-router-dom';
import './Query.css'
import SeeAllDetails from '../SeeAllDetails';
import avatart from '../../assets/Image/avatar.jpg';


const QueriesSection = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch('https://cure-hub-backend-gules.vercel.app/queries')
                .then(res => res.json())
                .then(data => {
                    const shuffledQueries = shuffleArray(data);
                    setQueries(shuffledQueries.slice(0, 4));
                });
        };
    
        // Fetch data initially
        fetchData();
    
        // Fetch data every 10 seconds
        const intervalId = setInterval(fetchData, 2000);
    
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    

    const shuffleArray = (array) => {
        // Fisher-Yates (aka Knuth) Shuffle Algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    console.log(queries);

    const handleQueryClick = (id) => {
        // Handle the query click event
        console.log(`Query ${id} clicked`);
    };

    return (
        <div className="md:mx-20 mx-4 py-10 relative">
            <Headline className='mb-5' headline='Recent  Queries' />
            <div className=" ">
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    {queries.map(query => (
                        <QueryCard key={query._id} query={query} onClick={() => handleQueryClick(query._id)} />
                    ))}
                </div>
            </div>
            <SeeAllDetails button='SEE ALL' routes='/query' description='To explore more queries & get the queries answer, please click on it' />
        </div>
    );
};

export default QueriesSection;
