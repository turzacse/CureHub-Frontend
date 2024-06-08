import React, { useEffect, useState } from 'react';
import Headline from '../../Components/Headline';
import QueryCard from '../../Components/Home/QueryCard';

const AllQuery = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {

        fetch('https://cure-hub-backend-gules.vercel.app/queries')
            .then(res => res.json())
            .then(data => setQueries(data))
    }, []);
    return (
        <div className='mx-20 py-5 pb-10'>
            <div>
                <Headline headline='All Queries' />
                <div className=" ">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                    {queries.map(query => (
                        <QueryCard key={query._id} query={query} onClick={() => handleQueryClick(query._id)} />
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
};

export default AllQuery;