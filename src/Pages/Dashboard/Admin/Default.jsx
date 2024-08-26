// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
// import { Radar, RadarChart, PolarGrid, PolarAngleAxis, } from 'recharts';

// const data = [
//     { name: 'Total Users', value: 10 },
//     { name: 'Total Medicine', value: 30 },
//     { name: 'Total Category', value: 20 },
//     { name: 'Total Queries', value: 25 },
//     { name: 'Total Uses', value: 30 }
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A6D71C'];

// const DefaultAdmin = () => {
//     return (
//         <div className='flex md:flex-row flex-col justify-center items-center mt-10'>
//             <div style={{ width: '50%', height: 300 }}>
                
//                 <ResponsiveContainer>
//                     <PieChart>
//                         <Pie
//                             data={data}
//                             cx="50%"
//                             cy="50%"
//                             outerRadius={80}
//                             fill="#8884d8"
//                             label
//                             animationBegin={0}
//                         >
//                             {
//                                 data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
//                             }
//                         </Pie>
//                         <Legend />
//                     </PieChart>
//                 </ResponsiveContainer>
//             </div>
//             <div style={{ width: '50%', height: 300 }}>
//                 <ResponsiveContainer>
//                     <RadarChart data={data}>
//                         <PolarGrid />
//                         <PolarAngleAxis dataKey="name" />
//                         <Radar name="Value" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} animationBegin={0} />
//                     </RadarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default DefaultAdmin;


import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';

const data = [
    { name: 'Total Users', value: 10 },
    { name: 'Total Medicine', value: 30 },
    { name: 'Total Category', value: 20 },
    { name: 'Total Queries', value: 25 },
    { name: 'Total Uses', value: 30 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A6D71C'];

const monthlyData = [
    { month: 'January2024', patients: 30 },
    { month: 'February2024', patients: 40 },
    { month: 'March2024', patients: 45 },
    { month: 'April2024', patients: 65 },
    { month: 'May2024', patients: 58 },
    { month: 'June2024', patients: 72 },
    { month: 'July2024', patients: 83 },
    { month: 'August2024', patients: 48 },

    // You can add more data here as needed
];

const dailyData = [
    { day: '1 Aug', patients: 5 },
    { day: '2 Aug', patients: 8 },
    { day: '3 Aug', patients: 6 },
    { day: '4 Aug', patients: 7 },
    { day: '5 Aug', patients: 10 },
    { day: '6 Aug', patients: 4 },
    { day: '7 Aug', patients: 9 },
    { day: '8 Aug', patients: 12 },
    { day: '9 Aug', patients: 3 },
    { day: '10 Aug', patients: 15 },
    { day: '11 Aug', patients: 11 },
    { day: '12 Aug', patients: 6 },
    { day: '13 Aug', patients: 8 },
    { day: '14 Aug', patients: 10 },
    { day: '15 Aug', patients: 7 },
    // Add more daily data as needed
];

const DefaultAdmin = () => {
    return (
        <div className='flex flex-col justify-center items-center mt-10 '>
            <div className='flex md:flex-row flex-col justify-center items-center' style={{ width: '100%', height: 300 }}>
                <div style={{ width: '50%', height: '100%' }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                                animationBegin={0}
                            >
                                {
                                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                }
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ width: '50%', height: '100%' }}>
                    <ResponsiveContainer>
                        <RadarChart data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="name" />
                            <Radar name="Value" dataKey="value" stroke="#FF6347" fill="#FF6347" fillOpacity={0.6} animationBegin={0} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className='my-10 mb-10' style={{ width: '80%', height: 300, marginTop: '50px' }}>
                <h2 className='text-center text-xl font-medium text-black'>Monthly Patient Service Usage</h2>
                <ResponsiveContainer>
                    <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="month" stroke="#333" />
                        <YAxis stroke="#333" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="patients" stroke="#FF4500" strokeWidth={3} dot={{ fill: '#FF4500' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className='mb-20' style={{ width: '80%', height: 300, marginTop: '50px' }}>
                <h3 className='text-center text-xl font-semibold mb-4'>Daily Patient Service Usage (August 2024)</h3>
                <ResponsiveContainer>
                    <LineChart data={dailyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="day" stroke="#333" />
                        <YAxis stroke="#333" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="patients" stroke="#28a745" strokeWidth={3} dot={{ fill: '#28a745' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
        </div>
    );
};

export default DefaultAdmin;
