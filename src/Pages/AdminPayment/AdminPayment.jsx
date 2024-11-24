import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import Swal from 'sweetalert2';

const AdminPayment = () => {
    const [messages, setMessages] = useState();
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReplyBox, setIsReplyBox] = useState(false);
    const [replymsg, setReplymsg] = useState('');

    const getAllPayments = async () => {
        try {
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/payments');
            if (response.ok) {
                const data = await response.json();
                setMessages(data?.reverse());
            } else {
                console.error("Failed to fetch messages. Status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        getAllPayments();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            text: 'Are you sure you want to delete this message?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            background: '#006666',
            color: 'white'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://cure-hub-backend-gules.vercel.app/payments/delete/${id}`)
                    .then(() => {
                        Swal.fire({
                            text: 'This message has been deleted successfully!',
                            icon: 'success',
                            background: '#006666',
                            color: 'white'
                        });
                        getAllPayments();
                    })
                    .catch(error => console.error("Error deleting message:", error));
            }
        });
    };

    const handleView = (message) => {
        setSelectedMessage(message);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMessage(null);
        setIsReplyBox(false);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setReplymsg(value);
        console.log(value);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate the total number of pages
    const totalPages = Math.ceil(messages?.length / itemsPerPage);

    // Get the current items for the page
    const currentItems = messages?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='p-4'>
            <h2 className='text-xl font-bold text-yellow-800 mt-5 uppercase'>Payment</h2>

            <section className='md:mt-5 mt-2 overflow-x-auto text-[10px] md:text-[16px]'>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">SL</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date&Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment for</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Message</th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ammount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-300 text-black divide-y divide-gray-200">
                        {currentItems?.map((message, index) => (
                            <tr key={message._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{message?.transactionID.slice(0,4)}*****{message?.transactionID.slice(23,27)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{message?.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{message?.createdAt}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{message?.type}</td>
                                {/* <td className="px-6 py-4 whitespace-nowrap">
                                    {message?.message?.length > 23 ? <span>{message?.message?.slice(0, 20)}....</span> : <span>{message?.message}</span>}
                                </td> */}
                                <td className="px-6 py-4 whitespace-nowrap uppercase">
                                    {message?.amount} TK
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className='flex gap-2'>
                                        {/* <button className='btn btn-sm btn-success text-gray-200' onClick={() => handleView(message)}>View</button> */}
                                        <button onClick={() => handleDelete(message?._id)} className='btn btn-sm btn-warning text-gray-600'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                            {/* <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider">Message</th> */}
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                </table>
            </section>

            <div className="flex lg:bottom-10 lg:left-1/2 justify-center mt-4">
                <nav className="block">
                    <ul className="flex pl-0 rounded list-none flex-wrap">
                        {Array.from({ length: totalPages }, (_, index) => {
                            if (totalPages <= 5 || index < 2 || index >= totalPages - 2 || Math.abs(index + 1 - currentPage) <= 1) {
                                return (
                                    <li key={index} className="page-item">
                                        <button
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`page-link relative block py-1.5 px-3 leading-tight text-gray-800  ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                );
                            } else if (index === 2 || index === totalPages - 3) {
                                return <li key={index} className="page-item"> .  .  . </li>;
                            } else {
                                return null;
                            }
                        })}
                    </ul>
                </nav>
            </div>



            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-[#175858] w-[400px] p-6 rounded-lg shadow-lg text-white text-center">
                        <h2 className="text-xl font-bold text-center mb-4">Message Details</h2>
                        <p> {selectedMessage?.name} || {selectedMessage?.email}</p>
                        <p><strong>Sending Time:</strong> {selectedMessage?.createdAt}</p>
                        <p><strong>Subject:</strong> {selectedMessage?.subject}</p>
                        <textarea
                            readOnly
                            value={selectedMessage?.message}
                            cols={4}
                            className='bg-gray-300 text-gray-700 p-2 mt-4 rounded-lg w-full'
                        >
                        </textarea>

                        {
                            selectedMessage?.reply?.length > 0 && <div>
                                <strong className='text-yellow-600 flex mt-4 mb-2'>Support Reply</strong>
                                {
                                    selectedMessage?.reply?.map((item, index) =>
                                        <div>
                                            <p className='flex justify-start text-left'>
                                                {item?.replymsg}
                                            </p>
                                            <p className='flex justify-end text-[12px] text-black'>{item?.time}</p>
                                        </div>
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPayment;
