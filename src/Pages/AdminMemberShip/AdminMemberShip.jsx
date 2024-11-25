import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminMembership = () => {
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch Membership Data
    const fetchMemberships = async () => {
        try {
            const response = await axios.get(
                "https://cure-hub-backend-gules.vercel.app/users"
            );
            const allUsers = response.data;
            const memberUsers = allUsers.filter(user => user.membership); // Filter users with membership
            setMemberships(memberUsers);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch membership data");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMemberships();
    }, []);

    // Render Table Rows
    const renderTableRows = () =>
        memberships.map((member, index) => (
            <tr
                key={member._id}
                className="border-b "
            >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                    <img
                        src={member.photo}
                        alt={member.username}
                        className="w-10 h-10 rounded-full"
                    />
                </td>
                <td className="px-6 py-4">{member.username}</td>
                <td className="px-6 py-4">{member.email}</td>
                <td className="px-6 py-4">{member.plan}</td>
                <td className="px-6 py-4">
                    {member.membershipDetails.startDate}
                </td>
                <td className="px-6 py-4">{member.membershipDetails.endDate}</td>
            </tr>
        ));

    return (
        <div className="p-4">
            <h2 className='text-xl font-bold text-yellow-800 mt-5'>MEMBERSHIP</h2>
            {loading ? (
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto md:mt-5 mt-2">
                    <table className="w-full text-sm text-left ">
                        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-white">
                            <tr>
                                <th className="px-6 py-3">SL</th>
                                <th className="px-6 py-3">Photo</th>
                                <th className="px-6 py-3">Username</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Plan</th>
                                <th className="px-6 py-3">Start Date</th>
                                <th className="px-6 py-3">End Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-300">{renderTableRows()}</tbody>

                        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-white">
                            <tr>
                                <th className="px-6 py-3 h-[50px]"></th>
                                <th className="px-6 py-3"></th>
                                <th className="px-6 py-3"></th>
                                <th className="px-6 py-3"></th>
                                <th className="px-6 py-3"></th>
                                <th className="px-6 py-3"></th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminMembership;
