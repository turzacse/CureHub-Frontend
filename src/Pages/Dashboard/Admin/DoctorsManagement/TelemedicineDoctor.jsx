import React, { useContext } from 'react';
import { AuthContext } from '../../../../Provider/AuthContext';
import { FaExchangeAlt } from 'react-icons/fa';

const TelemedicineDoctor = () => {
    const {telemedicineDoctor} = useContext(AuthContext);
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
                            Image
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Doctors Name
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Designation
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Service
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white text-black divide-y divide-gray-200">
                    {telemedicineDoctor?.map((appointment, index) => (
                        <tr key={appointment._id}>
                            <td className="px-3 py-4 whitespace-nowrap">
                                {index + 1}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                                <img className='h-[50px] w-[50px] rounded-full' src={appointment?.doctor_img} alt="" />
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
                            <td className="px-3 flex items-center gap-2 py-4 whitespace-nowrap">
                                <FaExchangeAlt className='fkex items-center justify-center mt-5 cursor-pointer'/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default TelemedicineDoctor;