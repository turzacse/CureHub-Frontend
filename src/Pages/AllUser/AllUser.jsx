import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { MdAutoDelete } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';

const AllUser = () => {
    const [allUser, setAllUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://cure-hub-backend-gules.vercel.app/users')
            .then(res => res.json())
            .then((data) => {
                const users = data?.filter((item) => item?.role !== 'doctor');
                setAllUser(users);
                setIsLoading(false);
            });
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate the total number of pages
    const totalPages = Math.ceil(allUser.length / itemsPerPage);

    // Get the current items for the page
    const currentItems = allUser.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    console.log(allUser);

    return (
        <div className="min-h-screen p-4 overflow-hidden">
            {/* <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h1 className="md:text-2xl font-extrabold text-center text-gray-800">
                    User Management Dashboard
                </h1>
                <p className="md:text-lg text-[12px] text-center text-gray-600 md:mt-2">
                    Overview of all registered users in the system
                </p>
            </div> */}
            <h2 className='text-xl font-bold text-yellow-800 mt-5 md:mb-5 mb-2'>USERS</h2>
            {
                isLoading ? <div className="flex justify-center items-center">
                    <span className="loading loading-spinner text-primary"></span>
                    <span className="loading loading-spinner text-secondary"></span>
                    <span className="loading loading-spinner text-accent"></span>
                    <span className="loading loading-spinner text-neutral"></span>
                    <span className="loading loading-spinner text-info"></span>
                    <span className="loading loading-spinner text-success"></span>
                    <span className="loading loading-spinner text-warning"></span>
                    <span className="loading loading-spinner text-error"></span>
                </div>
                    :
                    <div>
                        {allUser.length > 0 ? (
                            <div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-gray-300 rounded-lg shadow-lg">
                                        <thead className='text-[12px] md:text-[16px]'>
                                            <tr className="bg-gray-700 text-white">
                                                <th className="py-3 md:px-6 px-1 text-left">SL</th>
                                                <th className="py-3 md:px-6 px-3 text-left">Image</th>
                                                <th className="py-3 md:px-6 px-3 text-left">Name</th>
                                                <th className="py-3 md:px-6 px-3 text-left">Email</th>
                                                <th className="py-3 md:px-6 px-3 text-left">Role</th>
                                                <th className="py-3 md:px-6 px-3 text-left">Joinned By</th>
                                                <th className="py-3 md:px-6 px-3 text-left">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-[12px] md:text-[16px]'>
                                            {currentItems?.map((user, index) => (
                                                <tr key={index} className="hover:bg-gray-400 text-black">
                                                    <td className="py-3 md:px-6 px-1 border-b"> {(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                    <td className="py-3 md:px-6 px-3 border-b">
                                                        <img className='h-[50px] w-[50px] rounded-full' src={user?.photo} alt="" />
                                                        {/* {user?.photo || "N/A"} */}
                                                    </td>
                                                    <td className="py-3 md:px-6 px-3 border-b">{user?.username || "N/A"}</td>
                                                    <td className="py-3 md:px-6 px-3 border-b">{user?.email}</td>
                                                    <td className="py-3 md:px-6 px-3 border-b">{user?.role}</td>
                                                    <td className="py-3 md:px-6 px-3 border-b capitalize">12-08-2024</td>
                                                    <td className="py-[39px] md:px-6 px-3 border-b capitalize flex gap-3 items-center">
                                                        <RiAdminFill
                                                            className='text-blue-700 text-xl'
                                                            onClick={() => {

                                                            }} />

                                                        <FaEye className='text-[#427779] text-xl' />

                                                        <MdAutoDelete className='text-red-700 text-xl' />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>



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
                            </div>
                        ) : (
                            <div className="text-center text-lg text-gray-600">
                                No users found.
                            </div>
                        )}
                    </div>
            }

        </div>
    );
};

export default AllUser;
