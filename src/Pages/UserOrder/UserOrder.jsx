import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthContext";

const UserOrder = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {user} = useContext(AuthContext);

    // Fetch user order data from the API
    const fetchOrderHistory = async () => {
        try {
            const response = await axios.get(
                "https://cure-hub-backend-gules.vercel.app/payments/medicine"
            );
            const list = response.data.payments;
            const reversedList = list.reverse();
            const filteredData = reversedList?.filter((item) => item?.email === user?.email)
            setOrderHistory(filteredData);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch order history");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderHistory();
    }, []);

    if (loading) {
        return (
            <div className="w-[400px] mx-auto mt-24">
                <span className="loading loading-spinner text-primary"></span>
                <span className="loading loading-spinner text-secondary"></span>
                <span className="loading loading-spinner text-accent"></span>
                <span className="loading loading-spinner text-neutral"></span>
                <span className="loading loading-spinner text-info"></span>
                <span className="loading loading-spinner text-success"></span>
                <span className="loading loading-spinner text-warning"></span>
                <span className="loading loading-spinner text-error"></span>
            </div>
        );
    }

    if (error) {
        return <p className="text-center mt-6 text-red-600">{error}</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-yellow-800 mt-5 uppercase">
                MY Orders
            </h2>
            <div className="md:mt-5 mt-2 overflow-x-auto text-[10px] md:text-[16px]">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-600 text-white">
                        <tr className="text-left">
                            <th className="px-4 py-2">SL</th>
                            <th className="px-4 py-2">Transaction ID</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Medicines</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-300 text-black divide-y divide-gray-200">
                        {orderHistory.map((order, index) => (
                            <tr key={order._id} className="hover:bg-gray-100">
                                <td className="border border-gray-50 px-4 py-2">
                                    {index + 1}
                                </td>
                                <td className="border border-gray-50 px-4 py-2">
                                    {order.transactionID?.slice(0, 4)}****
                                    {order.transactionID?.slice(23, 30)}
                                </td>
                                <td className="border border-gray-50 px-4 py-2">
                                    {order.amount} TK
                                </td>
                                <td className="border border-gray-50 px-4 py-2 text-nowrap">
                                    {order.createdAt?.slice(0, 11)}
                                </td>
                                <td className="border border-gray-50 px-4 py-2 text-[12px]">
                                    <ul>
                                        {order.details.medicines.map(
                                            (medicine, i) => (
                                                <li
                                                    className="text-nowrap"
                                                    key={i}
                                                >
                                                    {medicine.name} (
                                                    {medicine.quantity})
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </td>
                                <td className="border border-gray-50 px-4 py-2 text-green-700 uppercase font-semibold">
                                    {order?.Status
                                        ? "Delivered"
                                        : "In Progress"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <thead className="bg-gray-600 text-white">
                        <tr className="text-left">
                            <th className="px-4 py-2 h-[50px]"></th>
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
};

export default UserOrder;
