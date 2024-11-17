import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import OngoingTable from './OngoingTable';
import TeleMedicineTable from './TeleMedicineTable';
import Canceled from './Canceled';
import CompleteAppointment from './CompleteAppointment';

const AppointmentManagement = () => {
    const {
        allCancelAppointment,
        allAppointment,
        allTelemedicineAppointment,
        allCompleteAppointment
    } = useContext(AuthContext);

    // State to manage the active tab
    const [activeTab, setActiveTab] = useState('totalAppointments');

    // Data for the pie chart
    const pieChartData = [
        { name: 'Ongoing', value: allAppointment?.length || 0 },
        { name: 'Cancelled', value: allCancelAppointment?.length || 0 },
        { name: 'Telemedicine', value: allTelemedicineAppointment?.length || 0 },
        { name: 'Completed', value: allCompleteAppointment?.length || 0 },
    ];

    console.log(allCancelAppointment);

    // Define colors for pie chart slices
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Custom label renderer for pie chart
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
        const radius = outerRadius - 10;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize={20}
                fontWeight={500}
            >
                {`${name}: ${value}`}
            </text>
        );
    };

    return (
        <div className="p-4 ">
            {/* Tab Buttons */}
            <div className="mt-10 md:mt-10 grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mb-4 text-[12px] md:text-[16px] items-center">
                <button
                    className={`py-2 px-4 rounded ${activeTab === 'totalAppointments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setActiveTab('totalAppointments')}
                >
                    Appointments
                </button>
                <button
                    className={`py-2 px-4 rounded ${activeTab === 'allAppointments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setActiveTab('allAppointments')}
                >
                    Ongoing
                </button>
                <button
                    className={`py-2 px-4 rounded ${activeTab === 'telemedicineAppointments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setActiveTab('telemedicineAppointments')}
                >
                    Telemedicine
                </button>
                <button
                    className={`py-2 px-4 rounded ${activeTab === 'cancelledAppointments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setActiveTab('cancelledAppointments')}
                >
                    Cancelled
                </button>
                <button
                    className={`py-2 px-4 rounded ${activeTab === 'completedAppointments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setActiveTab('completedAppointments')}
                >
                    Completed
                </button>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'totalAppointments' && (
                    <div>
                        <h2 className='text-xl font-bold text-[#006666]'>
                            Upcoming Appointment (General, Telemdicine) : {allTelemedicineAppointment?.length + allAppointment?.length} ({allAppointment?.length}, {allTelemedicineAppointment?.length})
                        </h2>
                        <div className="mt-10 flex items-center justify-center">
                            <PieChart className='py-5' width={600} height={300}>
                                <Pie
                                    data={pieChartData}
                                    // cx={300}
                                    // cy={150}
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    </div>
                )}
                {activeTab === 'allAppointments' && (
                    <div>
                        <OngoingTable allAppointment={allAppointment} />
                    </div>
                )}
                {activeTab === 'cancelledAppointments' && (
                    <div>
                        <Canceled allCancelAppointment={allCancelAppointment}/>
                        {/* <div className="md:mt-20 mt-10 overflow-x-auto text-[10px] md:text-[16px]">
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
                                            Booking Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Cancel Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Telimedicine ?
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {allCancelAppointment?.map((appointment, index) => (
                                        <tr key={appointment._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {index + 1}
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
                                                {appointment?.appointmentType == 'Telemedicine' ? 'Yes' : 'No'}

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> */}
                    </div>
                )}
                {activeTab === 'telemedicineAppointments' && (
                    <TeleMedicineTable allTelemedicineAppointment={allTelemedicineAppointment} />
                )}
                {activeTab === 'completedAppointments' && (
                    <CompleteAppointment allAppointment={allCompleteAppointment} />
                    // <div>
                    //     <h2 className='text-2xl font-bold text-warning'>
                    //         Completed Appointments ({allCompleteAppointment?.length})
                    //     </h2>
                    // </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentManagement;

