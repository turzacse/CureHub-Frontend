// import React from 'react';

// const Canceled = ({allCancelAppointment}) => {
//     return (
//         <div className="md:mt-20 mt-10 overflow-x-auto text-[10px] md:text-[16px]">
//             <table className="min-w-full  divide-y divide-gray-200">
//                 <thead className="bg-gray-600 text-white">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                             SL
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                             Patient Name
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                             Booking Date
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                             Cancel Date
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                             Telimedicine ?
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                     {allCancelAppointment?.map((appointment, index) => (
//                         <tr key={appointment._id}>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 {index + 1}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 {appointment?.appointment?.patientName || appointment?.appointment?.name}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 {appointment?.appointment?.bookingDate || 'Telemedicine'}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 {appointment.cancelDate.split('T')[0]}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 {appointment?.appointmentType == 'Telemedicine' ? 'Yes' : 'No'}

//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Canceled;

import React, { useState } from 'react';

const Canceled = ({ allCancelAppointment }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate the total number of pages
    const totalPages = Math.ceil(allCancelAppointment.length / itemsPerPage);

    // Get the current items for the page
    const currentItems = allCancelAppointment.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section>
        <div className="md:mt-20 mt-10 overflow-x-auto text-[10px] md:text-[16px]">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-600 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            SL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Patient Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Booking Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Cancel Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Telemedicine?
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-300 text-black divide-y divide-gray-200">
                    {currentItems.map((appointment, index) => (
                        <tr key={appointment._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {appointment?.appointment?.patientName || appointment?.appointment?.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {appointment?.appointment?.bookingDate || 'Telemedicine'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {appointment.cancelDate.split('T')[0]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {appointment?.appointmentType === 'Telemedicine' ? 'Yes' : 'No'}
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
                                return <li key={index} className="page-item">...</li>;
                            } else {
                                return null;
                            }
                        })}
                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default Canceled;

