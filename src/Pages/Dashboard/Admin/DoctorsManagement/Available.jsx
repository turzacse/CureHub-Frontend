import React from 'react';
import Swal from 'sweetalert2';

const Available = ({todaysDoctor}) => {
    console.log(todaysDoctor)

    const handleRemove = () => {
        Swal.fire({
            text: 'We are working on it',
            background: 'gray',
            color: 'white'
        })
    }

    const handleView = () => {
        Swal.fire({
            text: 'We are working on it',
            background: 'gray',
            color: 'white'
        })
    }

    return (
        <div>
        <div className="md:mt-20 mt-10 overflow-x-auto text-[10px] md:text-[16px]">
            <table className="min-w-full  divide-y divide-gray-200">
                <thead className="bg-gray-600 text-white">
                    <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            SL
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Doctors Name
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Designation
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Department
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Off Day
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white text-black divide-y divide-gray-200">
                    {todaysDoctor?.map((appointment, index) => (
                        <tr key={appointment._id}>
                            <td className="px-3 py-4 whitespace-nowrap">
                                {index + 1}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                                {appointment?.name}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                                {appointment?.designation}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                                {appointment?.department}
                            </td>
                            <td className="px-3 text-red-600 font-bold py-4 whitespace-nowrap">
                                {appointment?.offDay}

                            </td>
                            <td className="px-3 flex gap-2 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => {
                                        handleView(appointment);
                                    }}
                                    className='btn btn-sm btn-warning'> Details
                                </button>
                                <button
                                    onClick={() => handleRemove(appointment?._id)}
                                    className='btn btn-sm btn-info'>Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default Available;