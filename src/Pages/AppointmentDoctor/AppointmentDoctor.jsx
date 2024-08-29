import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { AiOutlineDollar } from 'react-icons/ai';

const AppointmentDoctor = () => {
    const [appointmentData, setAppointmentData] = useState([]);
    const [allDoctor, setAllDoctor] = useState([]);
    const { curehubUser } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const sortAppointments = (appointments) => {
        return appointments.sort((a, b) => {
            const [dayA, monthA, yearA] = a.appointedDate.split('/').map(Number);
            const [dayB, monthB, yearB] = b.appointedDate.split('/').map(Number);
            const dateA = new Date(yearA, monthA - 1, dayA);
            const dateB = new Date(yearB, monthB - 1, dayB);

            if (dateA.getTime() !== dateB.getTime()) {
                return dateA - dateB;
            }
            const parseTime = (time) => {
                const [timeString, modifier] = time.split(' ');
                let [hours, minutes] = timeString.split(':').map(Number);
                if (modifier === 'PM' && hours < 12) {
                    hours += 12;
                }
                if (modifier === 'AM' && hours === 12) {
                    hours = 0;
                }
                return new Date(1970, 0, 1, hours, minutes);
            };
            const timeA = parseTime(a.appointedTime.split(' - ')[0]);
            const timeB = parseTime(b.appointedTime.split(' - ')[0]);
            return timeA - timeB;
        });
    };

    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/doctors')
            .then(res => res.json())
            .then(data => setAllDoctor(data));
    }, []);
    useEffect(() => {
        const response = allDoctor.find((doctor) => doctor.userID === curehubUser?._id);
        if (response) {
            fetch(`https://cure-hub-backend-gules.vercel.app/appoinment/doctor/${response._id}`)
                .then(res => res.json())
                .then(data => {
                    const sortedData = sortAppointments(data);
                    setAppointmentData(sortedData);
                });
        }
    }, [allDoctor, curehubUser]);

    const totalPages = Math.ceil(appointmentData.length / itemsPerPage);

    const currentItems = appointmentData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="md:mt-20 mt-10 mx-4 ">
            
            <div className="overflow-x-auto text-[10px] md:text-[16px]">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                SL
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Patient Info
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Payment
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Prescribe
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((appointment, index) => (
                            <tr key={appointment._id}>
                                <td className="px-3 py-1 whitespace-nowrap">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td className="px-6 text-[12px] py-4 whitespace-nowrap">
                                    Name: {appointment?.patientName} <br />
                                    Date: {appointment?.appointedDate} <br />
                                    Time: {appointment?.appointedTime}
                                </td>
                                <td className="px-6 text-2xl text-red-700 cursor-pointer py-4 whitespace-nowrap">
                                    <AiOutlineDollar />
                                </td>
                                <td className="px-3 py-1 whitespace-nowrap">
                                    <button className='btn btn-sm btn-warning'>
                                        Prescription
                                    </button>
                                </td>
                                <td className="px-3 py-1 whitespace-nowrap">
                                    <button className='btn btn-sm btn-info'>
                                        Complete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
        </div>
    );
};

export default AppointmentDoctor;
