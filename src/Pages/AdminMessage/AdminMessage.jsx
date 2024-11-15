import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import Swal from 'sweetalert2';

const AdminMessage = () => {
    const [messages, setMessages] = useState();
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReplyBox, setIsReplyBox] = useState(false);
    const [replymsg, setReplymsg] = useState('');

    const fetchMessages = async () => {
        try {
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/contact-us');
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
        fetchMessages();
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
                axios.delete(`https://cure-hub-backend-gules.vercel.app/contact-us/${id}`)
                    .then(() => {
                        Swal.fire({
                            text: 'This message has been deleted successfully!',
                            icon: 'success',
                            background: '#006666',
                            color: 'white'
                        });
                        fetchMessages();
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

    // const handleReply = async (id) => {      
    //     try {
    //       const response = await fetch(`https://cure-hub-backend-gules.vercel.app/contact-us/${id}/reply`, {
    //         method: 'PUT',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ replymsg })
    //       });
      
    //       const result = await response.json();
      
    //       if (response.ok) {
    //         console.log('Reply added successfully:', result);
    //         fetchMessages();
    //         setIsReplyBox(false);
    //         setReplymsg('');
            
    //       } else {
    //         console.error('Error adding reply:', result.message);
    //       }
    //     } catch (error) {
    //       console.error('Request failed:', error);
    //     }
    //   };
      
    const handleReply = async (id) => {      
        try {
            const response = await fetch(`https://cure-hub-backend-gules.vercel.app/contact-us/${id}/reply`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ replymsg })
            });
    
            const result = await response.json();
    
            if (response.ok) {
                console.log('Reply added successfully:', result);
                fetchMessages();
    
                // Get current date in UTC and add 6 hours for Bangladesh time
                const now = new Date();
                now.setHours(now.getUTCHours() + 6);
    
                // Format the date as dd-mm-yyyy hh:mm:ss for Bangladesh time
                const formattedTime = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getFullYear()).slice(-2)}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
                // Update selectedMessage's reply array with the new reply and formatted time
                setSelectedMessage((prev) => ({
                    ...prev,
                    reply: [
                        ...(prev.reply || []),
                        { replymsg, time: formattedTime }
                    ]
                }));
                
                // Clear the reply input box
                setIsReplyBox(false);
                setReplymsg('');
            } else {
                console.error('Error adding reply:', result.message);
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };
    
    
    

    return (
        <div className='p-4'>
            <h2 className='text-xl font-bold text-yellow-800'>MESSAGES</h2>

            <section className='mt-10 overflow-x-auto text-[10px] md:text-[16px]'>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">SL</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date&Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Subject</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Message</th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-black divide-y divide-gray-200">
                        {messages?.map((message, index) => (
                            <tr key={message._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{message?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{message?.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{message?.createdAt}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{message?.subject}</td>
                                {/* <td className="px-6 py-4 whitespace-nowrap">
                                    {message?.message?.length > 23 ? <span>{message?.message?.slice(0, 20)}....</span> : <span>{message?.message}</span>}
                                </td> */}
                                <td className="px-6 py-4 whitespace-nowrap uppercase">
                                    {message?.reply?.length > 0 ? 'replied' : 'Not replied'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className='flex gap-2'>
                                        <button className='btn btn-sm btn-success' onClick={() => handleView(message)}>View</button>
                                        <button onClick={() => handleDelete(message?._id)} className='btn btn-sm btn-warning'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            
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
                        {
                            isReplyBox &&
                            <div className='relative'>
                                <input
                                    className='bg-gray-300 text-gray-700 px-2 py-1 mt-4 rounded-lg w-full pr-10'
                                    type="text"
                                    onChange={handleInputChange}
                                />
                                <button
                                onClick={() => {
                                    handleReply(selectedMessage?._id)
                                }}
                                className='absolute right-1 top-5 text-2xl text-gray-800'>
                                    <IoSend />
                                </button>
                            </div>
                            
                        }
                        <div className='flex justify-between mt-4'>
                            {
                                !isReplyBox ? <button
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                                onClick={() => {
                                    setIsReplyBox(true);
                                }}
                            >
                                Reply
                            </button> :
                            <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={() => {
                                setIsReplyBox(false);
                            }}
                        >
                            Not Now
                        </button>
                            }
                            <button
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMessage;
