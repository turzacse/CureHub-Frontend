import React, { useEffect, useState } from 'react';

const AllUser = () => {
    const [allUser, setAllUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://cure-hub-backend-gules.vercel.app/users')
            .then(res => res.json())
            .then((data) => {
                const users = data?.filter((item) => item?.role === 'user');
                setAllUser(users);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen md:p-8 mt-10 md:mt-5 p-4 overflow-hidden">
            {/* <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h1 className="md:text-2xl font-extrabold text-center text-gray-800">
                    User Management Dashboard
                </h1>
                <p className="md:text-lg text-[12px] text-center text-gray-600 md:mt-2">
                    Overview of all registered users in the system
                </p>
            </div> */}
            <h2 className='text-black mb-5 font-semibold text-2xl'>USERS</h2>
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
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white rounded-lg shadow-lg">
                                    <thead className='text-[12px] md:text-[16px]'>
                                        <tr className="bg-gray-700 text-white">
                                            <th className="py-3 md:px-6 px-1 text-left">SL</th>
                                            <th className="py-3 md:px-6 px-3 text-left">Name</th>
                                            <th className="py-3 md:px-6 px-3 text-left">Email</th>
                                            <th className="py-3 md:px-6 px-3 text-left">Joinned By</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-[12px] md:text-[16px]'>
                                        {allUser.map((user, index) => (
                                            <tr key={index} className="hover:bg-gray-100 text-black">
                                                <td className="py-3 md:px-6 px-1 border-b">{index + 1}</td>
                                                <td className="py-3 md:px-6 px-3 border-b">{user?.username || "N/A"}</td>
                                                <td className="py-3 md:px-6 px-3 border-b">{user?.email}</td>
                                                <td className="py-3 md:px-6 px-3 border-b capitalize">12-08-2024</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
