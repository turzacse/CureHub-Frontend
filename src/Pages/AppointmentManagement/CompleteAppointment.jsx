
import React, { useState } from 'react';
import OngoingTable from './OngoingTable';

const CompleteAppointment = ({ allAppointment }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    // const parseDate = (dateString) => {
    //     const [day, month, year] = dateString?.split('/');
    //     return new Date(`${year}-${month}-${day}`);
    // };

    // const sortedAppointments = allAppointment?.slice()?.sort((a, b) => {
    //     return parseDate(a.appointedDate) - parseDate(b.appointedDate);
    // });

    const totalPages = Math.ceil(allAppointment?.length / itemsPerPage);

    const currentItems = allAppointment?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    console.log(allAppointment);

    return (
        <div className=''>
            <div className="md:mt-20 mt-10 overflow-x-auto text-[10px] md:text-[16px]">
                
                <table className="min-w-full  divide-y divide-gray-200">
                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                SL
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Appointment ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Doctor ID
                            </th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Booking Date
                            </th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Appointment FEE
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Payment Method
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-black divide-y divide-gray-200">
                        {currentItems?.map((appointment, index) => (
                            <tr key={appointment._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {/* {appointment?.patientName} */} 23-10-2024
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {/* {appointment?.appointment_id} */}
                                    {appointment?.appointment_id?.slice(0,4)}******{appointment?.appointment_id?.slice(20,24)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {/* {appointment?.doctor_id} */}
                                    {appointment?.doctor_id?.slice(0,4)}******{appointment?.doctor_id?.slice(20,24)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    TK{appointment?.appointmentFee}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment?.manualPayment ? 'Manual Pay' : 'Online Pay'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment?.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <nav className="block">
                    <ul className="flex pl-0 rounded list-none flex-wrap">
                        {Array.from({ length: totalPages }, (_, index) => {
                            if (totalPages <= 5 || index < 2 || index >= totalPages - 2 || Math.abs(index + 1 - currentPage) <= 1) {
                                return (
                                    <li key={index} className="page-item">
                                        <button
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`page-link relative block py-1.5 px-3 leading-tight text-gray-800 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                );
                            } else if (index === 2 || index === totalPages - 3) {
                                return <li key={index} className="page-item">...</li>;
                            } else {
                                return null;
                            }
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default CompleteAppointment;
