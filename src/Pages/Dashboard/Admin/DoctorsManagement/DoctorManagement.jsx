// import React, { useEffect, useState } from 'react';
// import Headline from '../../../../Components/Headline';
// import { IoMdAddCircle } from 'react-icons/io';
// import DoctorForm from '../../../../Components/DoctorForm/DoctorForm';
// import '../../../../App.css'

// const DoctorManagement = () => {
//     const [doctors, setDoctors] = useState([]);
//     const [departments, setDepartments] = useState([]);
//     const [departmentDoctors, setDepartmentDoctors] = useState({});
//     const [isFormOpen, setIsFormOpen] = useState(false);

//     useEffect(() => {
//         fetch('https://cure-hub-backend-gules.vercel.app/doctors')
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

//     const handleFormSubmit = async (newDoctor) => {
//         try {
//             const response = await fetch('https://cure-hub-backend-gules.vercel.app/doctors', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newDoctor),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to add doctor');
//             }
//             else{
//                 alert('Success');
//             }

//             const addedDoctor = await response.json();
//             const updatedDoctors = [...doctors, addedDoctor];
//             setDoctors(updatedDoctors);

//             const departmentMap = updatedDoctors.reduce((acc, doctor) => {
//                 const department = doctor.department;
//                 if (!acc[department]) {
//                     acc[department] = [];
//                 }
//                 acc[department].push(doctor);
//                 return acc;
//             }, {});

//             setDepartmentDoctors(departmentMap);
//         } catch (error) {
//             alert('Error adding doctor:', error);
//             // Handle error appropriately in your UI, e.g., show a message to the user
//         }
//     };



//     return (
//         <div className='mx-4'>
//             {/* <Headline headline='Doctors'></Headline> */}
//             <div className='my-10  text-white flex md:flex-row flex-col justify-between gap-4'>
//                 <h2 className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% py-3 rounded-xl font-medium text-lg md:text-xl w-[200px] text-center'>Total Doctor : {doctors?.length}</h2>

//                 <h2 className='bg-gradient-to-r from-indigo-600 from-10% via-sky-600 via-30% to-emerald-600 to-90% py-3 rounded-xl font-medium text-lg md:text-xl w-[250px] text-center'>Total Departmnet : {Object.keys(departmentDoctors).length}</h2>

//                 <div className='bg-gradient-to-r from-indigo-600 from-10% via-sky-600 via-30% to-emerald-600 to-90% py-3 rounded-xl font-medium text-lg md:text-xl w-[250px] text-center cursor-pointer flex justify-center items-center gap-2' onClick={() => setIsFormOpen(true)}>
//                     <IoMdAddCircle />
//                     <span>Register a Doctor</span>
//                 </div>
//             </div>
//             <div className='grid md:grid-cols-4 grid-cols-2 mb-10 rounded-xl bg-[#c5b984] p-4'>
//                 {Object.keys(departmentDoctors).map(department => (
//                     <div key={department}>
//                         <h3 className='md:text-xl text-lg my-2 font-bold'>{department} ({departmentDoctors[department].length})</h3>
//                         <ul>
//                             {departmentDoctors[department]?.map(doctor => (
//                                 <div key={doctor._id}>
//                                     <li className='md:text-lg text-[14px] font-bold text-[#e05c3b]'>{doctor.name}</li>
//                                     <li className='md:text-sm text-[12px]'>{Array.isArray(doctor.degree) ? doctor.degree.join(' ') : doctor.degree}</li>
//                                 </div>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>

//             {isFormOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//                     <DoctorForm className='' onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DoctorManagement;


import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const DoctorManagement = () => {
    // State to manage the active tab
    const [activeTab, setActiveTab] = useState('doctors');
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [departmentDoctors, setDepartmentDoctors] = useState({});
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [requestedDoctor, setRequestedDoctor] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/doctors');
            console.log('res =>', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDoctors(data);
        } catch(error) {
            console.error('There was a problem with the fetch operation:', error);
            setDoctors([]);
        }
    }
    useEffect(() => {
        fetchData();
        window.scroll(0,0);
    }, []);

    useEffect(() => {
        const data = doctors?.filter((item) => item?.status == 'Pending');
        setRequestedDoctor(data);
    }, [doctors]);

    const handleRequestAccept = async (id) => {
        // Show confirmation dialog
        const confirm = await Swal.fire({
            // title: 'Are you sure?',
            text: `Are you sure? \n You are about to approve this doctor's request.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: `No`,
            background: '#006666',
            color: '#fff',
        });

        if (confirm.isConfirmed) {
            try {
                // Make the update request
                const response = await fetch(`https://cure-hub-backend-gules.vercel.app/doctors/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: 'Approved' }),
                });

                if (response.ok) {
                    
                    // Show success alert
                    Swal.fire({
                        // title: 'Approved!',
                        text: 'The doctor\'s request has been approved.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        background: '#006666',
                        color: '#fff',
                    });
                    fetchData();
                } else {
                    // Show error alert if the update failed
                    Swal.fire({
                        // title: 'Error!',
                        text: 'There was a problem approving the doctor\'s request.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        background: '#006666',
                        color: '#fff',
                    });
                }
            } catch (error) {
                // Handle any other errors
                Swal.fire({
                    // title: 'Error!',
                    text: 'An unexpected error occurred.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    background: '#006666',
                    color: '#fff',
                });
            }
        }
    };


    return (
        <div className="p-4">
            {/* Tab Buttons */}
            <div className="mt-10 grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mb-4 text-[12px] md:text-[16px] items-center">
                <button
                    className={`py-2 px-4 rounded ${activeTab === 'doctors' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setActiveTab('doctors')}
                >
                    Doctors
                </button>
                <button
                    className={`py-2 px-4 rounded ${activeTab === 'availableToday' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setActiveTab('availableToday')}
                >
                    Available Doctor By Today
                </button>
                <button
                    className={`py-2 px-4 rounded ${activeTab === 'telemedicineDoctor' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setActiveTab('telemedicineDoctor')}
                >
                    Telemedicine Doctor
                </button>
                <button
                    className={`py-2 px-4 rounded ${activeTab === 'pendingRequests' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setActiveTab('pendingRequests')}
                >
                    Pending Requests
                </button>

            </div>

            {/* Tab Content */}
            <div className='text-white'>
                {activeTab === 'doctors' && (
                    <div>
                        <h2 className="text-2xl font-bold">Doctors</h2>
                        <p className="mt-4">Description about all doctors goes here.</p>
                    </div>
                )}
                {activeTab === 'availableToday' && (
                    <div>
                        <h2 className="text-2xl font-bold">Available Doctor By Today</h2>
                        <p className="mt-4">Description about doctors available today goes here.</p>
                    </div>
                )}

                {activeTab === 'telemedicineDoctor' && (
                    <div>
                        <h2 className="text-2xl font-bold">Telemedicine Doctor</h2>
                        <p className="mt-4">Description about telemedicine doctors goes here.</p>
                    </div>
                )}

                {activeTab === 'pendingRequests' && (
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
                                            RQ Joining Date
                                        </th>
                                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Department
                                        </th>
                                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Telimedicine ?
                                        </th>
                                        <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-black divide-y divide-gray-200">
                                    {requestedDoctor?.map((appointment, index) => (
                                        <tr key={appointment._id}>
                                            <td className="px-3 py-4 whitespace-nowrap">
                                                {index + 1}
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap">
                                                {appointment?.name}
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap">
                                                {appointment?.joining_date}
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap">
                                                {appointment?.department}
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap">
                                                {appointment?.telemedicine ? 'Yes' : 'No'}

                                            </td>
                                            <td className="px-3 flex gap-2 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => {
                                                        setIsModalOpen(true);
                                                    }}
                                                    className='btn btn-sm btn-warning'> Details
                                                </button>
                                                <button
                                                    onClick={() => handleRequestAccept(appointment?._id)}
                                                    className='btn btn-sm btn-info'>Accecpt
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-gray-300  rounded-lg shadow-lg max-w-lg w-full">
                        <div className="px-4 py-5 sm:px-6 bg-gray-800 text-white">
                            <h3 className="text-lg leading-6 font-medium">
                                Dr. Fahim Montasir Turza
                            </h3>
                        </div>
                        <div className="px-6">
                            <p><strong>Patient Name:</strong> </p>
                            <p><strong>Requested Date:</strong> </p>
                            <p><strong>Phone:</strong> </p>

                        </div>
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                            className='btn btn-warning'>
                            close
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorManagement;
