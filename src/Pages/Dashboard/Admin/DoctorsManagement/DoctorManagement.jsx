import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import TotallDoctor from './TotallDoctor';
import { AuthContext } from '../../../../Provider/AuthContext';
import TelemedicineDoctor from './TelemedicineDoctor';
import Available from './Available';

const DoctorManagement = () => {
    // State to manage the active tab
    const [activeTab, setActiveTab] = useState('doctors');
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [departmentDoctors, setDepartmentDoctors] = useState({});
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [requestedDoctor, setRequestedDoctor] = useState();
    const [activeDoctors, setActiveDoctors] = useState();
    const [todaysDoctor, setTodaysDoctor] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {telemedicineDoctor} = useContext(AuthContext);
    const [selectedData, setSelectedData] = useState();

    const today = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[today.getDay()];

    console.log(dayName, today , ' <== Day');

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
        const active = doctors?.filter((item) => item?.status == 'Approved');
        setActiveDoctors(active);
        const todays = doctors?.filter((item) => item?.offDay !== dayName);
        setTodaysDoctor(todays);
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
                    setIsModalOpen(false)
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
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 text-[8px] md:text-[16px] items-center">
                <button
                    className={`py-2 px-4 rounded ${activeTab === 'doctors' ? 'bg-blue-500 text-white' : 'bg-yellow-300 text-black'}`}
                    onClick={() => setActiveTab('doctors')}
                >
                    Doctors <span className='text-white rounded-full p-1 px-[10px] bg-green-500 text-sm font-medium shadow-2xl'>{activeDoctors?.length > 0 ? activeDoctors?.length : ''}</span>
                </button>
                <button
                    className={`py-2 px-4 rounded ${activeTab === 'availableToday' ? 'bg-blue-500 text-white' : 'bg-yellow-300 text-black'}`}
                    onClick={() => setActiveTab('availableToday')}
                >
                    Today's Doctor <span className='text-white rounded-full p-1 px-[10px] bg-sky-400 text-sm font-medium shadow-2xl'>{todaysDoctor?.length > 0 ? todaysDoctor?.length : ''}</span>
                </button>
                <button
                    className={`py-2 px-4 rounded ${activeTab === 'telemedicineDoctor' ? 'bg-blue-500 text-white' : 'bg-yellow-300 text-black'}`}
                    onClick={() => setActiveTab('telemedicineDoctor')}
                >
                    Telemedicine Doctor <span className='text-white rounded-full p-1 px-[10px] bg-indigo-800 text-sm font-medium shadow-2xl'>{telemedicineDoctor?.length > 0 ? telemedicineDoctor?.length : ''}</span>
                </button>
                <button
                    className={`py-2 px-4 rounded ${activeTab === 'pendingRequests' ? 'bg-blue-500 text-white' : 'bg-yellow-300 text-black'}`}
                    onClick={() => setActiveTab('pendingRequests')}
                >
                    Pending Requests {
                        requestedDoctor?.length ? <span className='text-white rounded-full p-1 px-[10px] bg-red-500 text-sm font-medium shadow-2xl'>{requestedDoctor?.length}</span> : <span className='text-white rounded-full p-1 px-[10px] bg-red-500 text-sm font-medium shadow-2xl'>{requestedDoctor?.length}</span>
                    } 
                </button>

            </div>

            {/* Tab Content */}
            <div className='text-white'>
                {activeTab === 'doctors' && (
                    <TotallDoctor activeDoctors={activeDoctors}/>
                )}
                {activeTab === 'availableToday' && (
                    <div>
                        <Available todaysDoctor={todaysDoctor}/>
                    </div>
                )}

                {activeTab === 'telemedicineDoctor' && (
                    <div>
                        <TelemedicineDoctor/>
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
                                            Doctor
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
                                {
                                    requestedDoctor?.length === 0 ? <tbody className='bg-gray-300 text-black divide-y divide-gray-200'>
                                    <tr>
                                        <td className='text-center py-2' colSpan="7">
                                            No pending request
                                        </td>
                                    </tr>
                                </tbody> :
                                    <tbody className="bg-gray-300 text-black divide-y divide-gray-200">
                                    {requestedDoctor?.map((appointment, index) => (
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
                                                {appointment?.joining_date}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                {appointment?.department}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                {appointment?.telemedicine ? 'Yes' : 'No'}

                                            </td>
                                            <td className="px-3 flex gap-2 py-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => {
                                                        setIsModalOpen(true);
                                                        setSelectedData(appointment)
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
                                }
                                
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
                               {selectedData?.name}
                            </h3>
                        </div>
                        <div className="px-6 py-4">
                            <p><strong>Designation:</strong> {selectedData?.designation} </p>
                            <p><strong>Department:</strong> {selectedData?.department} </p>
                            <p><strong>Requested Joining Date:</strong> {selectedData?.joining_date} </p>
                            <p><strong>Service Time:</strong> {selectedData?.start_time} to {selectedData?.end_time}</p>
                            <p><strong>Appointment Fee:</strong> {selectedData?.visit} TK</p>

                        </div>
                        <div className='m-4 flex justify-between'>
                        <button
                            onClick={() => handleRequestAccept(selectedData?._id)}
                            className='btn btn-warning'>
                            Accecpt Request
                        </button>
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                            className='btn btn-info'>
                            close
                        </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorManagement;
