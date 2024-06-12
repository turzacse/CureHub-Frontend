// import React, { useEffect, useState } from 'react';
// import Headline from '../../../../Components/Headline';
// import { IoMdAddCircle } from 'react-icons/io';

// const DoctorManagement = () => {
//     const [doctors, setDoctors] = useState([]);
//     const [departments, setDepartments] = useState([]);
//     const [departmentDoctors, setDepartmentDoctors] = useState({});

//     useEffect(() => {
//         fetch('/Doctors.json')
//             .then(res => res.json())
//             .then(data => {
//                 setDoctors(data);

//                 // Create a mapping of departments to doctors
//                 const departmentMap = data.reduce((acc, doctor) => {
//                     const department = doctor.department;
//                     if (!acc[department]) {
//                         acc[department] = [];
//                     }
//                     acc[department].push(doctor);
//                     return acc;
//                 }, {});

//                 setDepartmentDoctors(departmentMap);
//             })
//             .catch(error => {
//                 console.error('There was a problem with the fetch operation:', error);
//             });
//     }, []);

//     console.log(Object.keys(departmentDoctors).length);
//     return (
//         <div>
//             <Headline headline='Doctors'></Headline>
//             <div className='my-10 text-white flex gap-4'>
//                 <h2 className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% py-3 rounded-xl font-medium text-lg md:text-xl w-[200px] text-center'>Total Doctor : {doctors?.length}</h2>

//                 <h2 className='bg-gradient-to-r from-indigo-600 from-10% via-sky-600 via-30% to-emerald-600 to-90% py-3 rounded-xl font-medium text-lg md:text-xl w-[250px] text-center'>Total Departmnet : {Object.keys(departmentDoctors).length}</h2>

//                 <div className='bg-gradient-to-r from-indigo-600 from-10% via-sky-600 via-30% to-emerald-600 to-90% py-3 rounded-xl font-medium text-lg md:text-xl w-[250px] text-center cursor-pointer flex justify-center items-center gap-2'>
//                     <IoMdAddCircle /> 
//                     <span>Register a Doctor</span> 
//                 </div>
//             </div>
//             <div className='grid grid-cols-4 mb-10 rounded-xl bg-[#c5b984] p-4'>
//                 {Object.keys(departmentDoctors).map(department => (
//                     <div key={department}>
//                         <h3 className='text-xl my-2 font-bold'>{department}</h3>
//                         <ul>
//                             {departmentDoctors[department].map(doctor => (
//                                 <div key={doctor._id}>
//                                 <li className='text-lg font-bold text-[#e05c3b]'>{doctor.name}</li>
//                                 <li className='text-sm' >{doctor.degree.join(' ')}</li>
//                                 </div>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table bg-[#65acac] md:table-sm table-xs table-pin-rows table-pin-cols">
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <td>Name</td>
//                             <td>Department</td>
//                             <td>Joining Date</td>
//                             <td>Off Day</td>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             doctors?.map((data) => <tr key={data._id}>
//                                 <th>{1}</th>
//                                 <td>{data.name}</td>
//                                 <td>{data.department}</td>
//                                 <td>{data.joiningdate || ('12-12-12')}</td>
//                                 <td>{data.offDay}</td>
//                             </tr>)
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default DoctorManagement;


import React, { useEffect, useState } from 'react';
import Headline from '../../../../Components/Headline';
import { IoMdAddCircle } from 'react-icons/io';
import DoctorForm from '../../../../Components/DoctorForm/DoctorForm';
import '../../../../App.css'
// import DoctorForm from './DoctorForm';

const DoctorManagement = () => {
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [departmentDoctors, setDepartmentDoctors] = useState({});
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        fetch('/Doctors.json')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);

                // Create a mapping of departments to doctors
                const departmentMap = data.reduce((acc, doctor) => {
                    const department = doctor.department;
                    if (!acc[department]) {
                        acc[department] = [];
                    }
                    acc[department].push(doctor);
                    return acc;
                }, {});

                setDepartmentDoctors(departmentMap);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const handleFormSubmit = (newDoctor) => {
        const updatedDoctors = [...doctors, newDoctor];
        setDoctors(updatedDoctors);

        const departmentMap = updatedDoctors.reduce((acc, doctor) => {
            const department = doctor.department;
            if (!acc[department]) {
                acc[department] = [];
            }
            acc[department].push(doctor);
            return acc;
        }, {});

        setDepartmentDoctors(departmentMap);
    };

    return (
        <div>
            <Headline headline='Doctors'></Headline>
            <div className='my-10 text-white flex md:flex-row flex-col gap-4'>
                <h2 className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% py-3 rounded-xl font-medium text-lg md:text-xl w-[200px] text-center'>Total Doctor : {doctors?.length}</h2>

                <h2 className='bg-gradient-to-r from-indigo-600 from-10% via-sky-600 via-30% to-emerald-600 to-90% py-3 rounded-xl font-medium text-lg md:text-xl w-[250px] text-center'>Total Departmnet : {Object.keys(departmentDoctors).length}</h2>

                <div className='bg-gradient-to-r from-indigo-600 from-10% via-sky-600 via-30% to-emerald-600 to-90% py-3 rounded-xl font-medium text-lg md:text-xl w-[250px] text-center cursor-pointer flex justify-center items-center gap-2' onClick={() => setIsFormOpen(true)}>
                    <IoMdAddCircle /> 
                    <span>Register a Doctor</span> 
                </div>
            </div>
            <div className='grid md:grid-cols-4 grid-cols-2 mb-10 rounded-xl bg-[#c5b984] p-4'>
                {Object.keys(departmentDoctors).map(department => (
                    <div key={department}>
                        <h3 className='text-xl my-2 font-bold'>{department}</h3>
                        <ul>
                            {departmentDoctors[department].map(doctor => (
                                <div key={doctor._id}>
                                    <li className='text-lg font-bold text-[#e05c3b]'>{doctor.name}</li>
                                    <li className='text-sm'>{doctor.degree.join(' ')}</li>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="overflow-x-auto">
                <table className="table bg-[#65acac] md:table-sm table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <th></th>
                            <td>Name</td>
                            <td>Department</td>
                            <td>Joining Date</td>
                            <td>Off Day</td>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors?.map((data, index) => (
                            <tr key={data._id}>
                                <th>{index + 1}</th>
                                <td>{data.name}</td>
                                <td>{data.department}</td>
                                <td>{data.joining_date || '12-12-12'}</td>
                                <td>{data.offDay}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isFormOpen && (
                <div className="popup-overlay">
                    <DoctorForm onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />
                </div>
            )}
        </div>
    );
};

export default DoctorManagement;
