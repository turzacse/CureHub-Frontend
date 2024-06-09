import React, { useEffect, useState } from 'react';
import Headline from '../../../Components/Headline';
import Swal from 'sweetalert2';

const Question = () => {
    const [queries, setQueries] = useState([]);
    const [response, setResponse] = useState("");
    const [selectedQuery, setSelectedQuery] = useState(null);

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/queries');
            if (!response.ok) {
                throw new Error('Failed to fetch queries');
            }
            const data = await response.json();
            setQueries(data);
        } catch (error) {
            console.error('Error fetching queries:', error);
        }
    };

    const handleResponseChange = (e) => {
        setResponse(e.target.value);
    };

    const handleQueryClick = (query) => {
        setSelectedQuery(query);
    };

    const handleCancel = () => {
        setSelectedQuery(null); // Close the popup
        setResponse(""); // Clear response field
    };

    const handleQueryResponse = async () => {
        try {
            const response = await fetch(`https://cure-hub-backend-gules.vercel.app/queries/${selectedQuery._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ response }),
            });
            if (!response.ok) {
                throw new Error('Failed to update query');
            }
            const data = await response.json();
            const updatedQueries = queries.map(query => {
                if (query._id === selectedQuery._id) {
                    return { ...query, response, answered: true };
                }
                return query;
            });
            setQueries(updatedQueries);
            Swal.fire({
                icon: 'success',
                title: 'Response submitted successfully',
                showConfirmButton: false,
                timer: 1500
            });
            setSelectedQuery(null); // Close the popup
            setResponse(""); // Clear response field
        } catch (error) {
            console.error('Error updating query:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to update query',
            });
        }
    };

    return (
        <div className='mx-20 py-5 pb-10'>
            <Headline headline='All Queries' />
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                {queries.map(query => (
                    <button className='bg-white rounded-xl shadow-xl' key={query._id} onClick={() => handleQueryClick(query)}>
                        <img className='h-[80px] w-[80px] mt-2 rounded-full shadow-2xl mb-2 flex items-center justify-center mx-auto border-[#A6D71C] border-4' src={query.photo} alt="" />
                        <p className='text-center md:mx-4 mt-4 mb-8'>{query.queries}</p>
                    </button>
                ))}
            </div>
            {/* Popup or Modal for responding to queries */}
            {selectedQuery && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#1A6868] p-8 rounded-lg">
                        <h2 className="text-lg text-[#e5f83d] font-semibold mb-4">Respond to Query</h2>
                        <p className="text-white mb-4">{selectedQuery.queries}</p>
                        <textarea className="w-full h-32 border border-gray-300 rounded-md p-2 mb-4" value={response} onChange={handleResponseChange}></textarea>
                        <div className='flex justify-between'>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleQueryResponse}>Submit</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Question;
