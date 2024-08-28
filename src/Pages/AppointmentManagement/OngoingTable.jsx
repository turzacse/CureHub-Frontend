import React from 'react';

const OngoingTable = ({ allAppointment }) => {
    console.log(allAppointment);
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    // Sort appointments by `appointedDate` (assuming the date is in DD/MM/YYYY format)
    const sortedAppointments = allAppointment?.slice().sort((a, b) => {
        return parseDate(a.appointedDate) - parseDate(b.appointedDate);
    });
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
                        {sortedAppointments?.map((appointment, index) => (
                            <tr key={appointment._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {index + 1}
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
        </div>
    );
};

export default OngoingTable;