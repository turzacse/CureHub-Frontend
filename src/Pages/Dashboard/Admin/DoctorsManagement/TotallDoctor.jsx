import React from 'react';
import Swal from 'sweetalert2';

const TotallDoctor = ({activeDoctors}) => {
    console.log(activeDoctors)

    const handleRemove = () => {
        Swal.fire({
            text: 'We are working on it',
            background: '#006666',
            color: 'white'
        })
    }

    const handleView = () => {
        Swal.fire({
            text: 'We are working on it',
            background: '#006666',
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
                            Doctor
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
                    {activeDoctors?.map((appointment, index) => (
                        <tr key={appointment._id}>
                            <td className="px-3 py-2 whitespace-nowrap">
                                {index + 1}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <img className='h-[50px] w-[50px] rounded-full' src={appointment?.doctor_img} alt="" />
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                {appointment?.name}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                {appointment?.designation}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                {appointment?.department}
                            </td>
                            <td className="px-3 text-red-600 font-bold py-2 whitespace-nowrap">
                                {appointment?.offDay}

                            </td>
                            <td className="px-3 flex items-center gap-2 py-2 whitespace-nowrap">
                                <button
                                    onClick={() => {
                                        handleView(appointment);
                                    }}
                                    className='btn btn-sm btn-warning'> Details
                                </button>
                                <button
                                    onClick={() => handleRemove(appointment?._id)}
                                    className='btn btn-sm bg-red-500 text-white hover:text-black'>Remove
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

export default TotallDoctor;