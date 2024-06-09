import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, } from 'recharts';

const data = [
    { name: 'Total Users', value: 10 },
    { name: 'Total Medicine', value: 30 },
    { name: 'Total Category', value: 20 },
    { name: 'Total Queries', value: 25 },
    { name: 'Total Uses', value: 30 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A6D71C'];

const DefaultAdmin = () => {
    return (
        <div className='flex md:flex-row flex-col justify-center items-center mt-10'>
            <div style={{ width: '50%', height: 300 }}>
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
            <div style={{ width: '50%', height: 300 }}>
                <ResponsiveContainer>
                    <RadarChart data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <Radar name="Value" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} animationBegin={0} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DefaultAdmin;
