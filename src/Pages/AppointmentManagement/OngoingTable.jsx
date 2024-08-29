// import React from 'react';

// const OngoingTable = ({ allAppointment }) => {
//     console.log(allAppointment);
//     const parseDate = (dateString) => {
//         const [day, month, year] = dateString.split('/');
//         return new Date(`${year}-${month}-${day}`);
//     };

//     // Sort appointments by `appointedDate` (assuming the date is in DD/MM/YYYY format)
//     const sortedAppointments = allAppointment?.slice().sort((a, b) => {
//         return parseDate(a.appointedDate) - parseDate(b.appointedDate);
//     });
//     return (
//         <div className=''>
//             <div className="md:mt-20 mt-10 overflow-x-auto text-[10px] md:text-[16px]">
//                 <table className="min-w-full  divide-y divide-gray-200">
//                     <thead className="bg-gray-600 text-white">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                                 SL
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                                 Patient Name
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                                 Doctor Name
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                                Booking Date
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                                 Appointment date
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                                 Time Slot 
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {sortedAppointments?.map((appointment, index) => (
//                             <tr key={appointment._id}>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     {index + 1}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     {appointment?.patientName}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                 {appointment?.doctorName}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     {appointment?.bookingDate}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     {appointment?.appointedDate}

//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     {appointment?.appointedTime}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default OngoingTable;



import React, { useState } from 'react';

const OngoingTable = ({ allAppointment }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    const sortedAppointments = allAppointment?.slice().sort((a, b) => {
        return parseDate(a.appointedDate) - parseDate(b.appointedDate);
    });

    const totalPages = Math.ceil(sortedAppointments.length / itemsPerPage);

    const currentItems = sortedAppointments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
                                Patient Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Doctor Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Booking Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Appointment date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Time Slot
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((appointment, index) => (
                            <tr key={appointment._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment?.patientName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment?.doctorName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment?.bookingDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment?.appointedDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment?.appointedTime}
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

export default OngoingTable;
