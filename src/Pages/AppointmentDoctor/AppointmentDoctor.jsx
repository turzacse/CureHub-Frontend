import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { AiOutlineDollar } from 'react-icons/ai';
import Prescription from '../Prescription/Prescription';
import Swal from 'sweetalert2';

const AppointmentDoctor = () => {
    const [appointmentData, setAppointmentData] = useState([]);
    const [allDoctor, setAllDoctor] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPayOpen, setIsPayOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [doctorFee, setDoctorFee] = useState();
    const [isMeetingChecked, setIsMeetingChecked] = useState(false);
    const [isManualChecked, setIsManualChecked] = useState(false);
    const { curehubUser, allCompleteAppointment } = useContext(AuthContext);

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
        setIsLoading(true);
        const response = allDoctor.find((doctor) => doctor.userID === curehubUser?._id);
        setDoctorFee(response?.visit);
        if (response) {
            fetch(`https://cure-hub-backend-gules.vercel.app/appoinment/doctor/${response._id}`)
                .then(res => res.json())
                .then(data => {
                    const sortedData = sortAppointments(data);
                    setAppointmentData(sortedData);
                    setIsLoading(false);
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

    const handlePrescriptionClick = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
    };

    const handlePrescriptionSubmit = (e) => {
        e.preventDefault();
        // Handle prescription form submission
        console.log('Prescription form submitted for:', selectedAppointment);
        handleModalClose();
    };

    const handlePay = (appointment) => {
        console.log('appointment from pay', appointment);
        setSelectedAppointment(appointment);
        setIsPayOpen(true);
    }
    const handlePayClose = () => {
        setIsPayOpen(false);
        setSelectedAppointment(null);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'meet') {
            setIsMeetingChecked(checked);
        } else if (name === 'manual') {
            setIsManualChecked(checked);
        }
    };

    const handleSubmit = async () => {
        const formData = {
        //   meeting: isMeetingChecked,
          manualPayment: isManualChecked,
          appointmentFee: doctorFee,
          appointment_id: selectedAppointment?._id,
          doctor_id: selectedAppointment?.doctor,
          patient_id: selectedAppointment?.patient,
          status: 'Not Prescribed',
          prescription: {},
        };
      
        console.log('Form Data:', formData);
       if(isMeetingChecked && isManualChecked){
        try {
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/complete/appoinment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        
            const result = await response.json();
            console.log('Success:', result);
            Swal.fire({
                text: `The patient's meeting is over, and the payment has been received.`,
                background: '#006666',
                color: 'white'
            })
            setIsPayOpen(false);
            // Handle the success response as needed
          } catch (error) {
            console.error('Error:', error);
            // Handle the error as needed
          }
       }
       else{
        Swal.fire({
            text: `Before proceeding, make sure the patient's meeting and payment are confirmed.`,
            background: '#006666',
            color: 'white'
        })
       }
      };
    if (isLoading) {
        return (
            <div className='absolute bottom-1/2 left-1/2 flex justify-center items-center'>
                <span className="loading loading-spinner text-primary"></span>
                <span className="loading loading-spinner text-secondary"></span>
                <span className="loading loading-spinner text-accent"></span>
                <span className="loading loading-spinner text-neutral"></span>
                <span className="loading loading-spinner text-info"></span>
                <span className="loading loading-spinner text-success"></span>
                <span className="loading loading-spinner text-warning"></span>
                <span className="loading loading-spinner text-error"></span>
            </div>
        )
    }

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
                                {
                                    allCompleteAppointment?.find((data) => data?.appointment_id == appointment?._id) ? <td className=''>
                                        <p className=" text-blue-800 font-semibold">Paied & Over</p> 
                                    
                                    </td>:<td className="px-6 text-2xl text-red-700 cursor-pointer py-4 whitespace-nowrap">
                                    <AiOutlineDollar onClick={() => {
                                        handlePay(appointment);
                                    }} /> <span className='text-[12px] text-black font-medium'>{doctorFee}TK</span>
                                </td>
                                }
                                
                                <td className="px-3 py-1 whitespace-nowrap">
                                    <button
                                        className='btn btn-sm btn-warning'
                                        onClick={() => handlePrescriptionClick(appointment)}
                                    >
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

            {/* Prescription Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-gray-300 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-hidden">
                        <div className="px-4 py-5 flex justify-between  sm:px-6 bg-gray-800 text-white">
                            <h3 className="text-lg leading-6 font-medium">
                                Prescription for {selectedAppointment?.patientName}
                            </h3>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                }}
                                className='btn btn-sm bg-red-600 border-none text-white hover:bg-red-400'>Close</button>
                        </div>
                        <div className="p-3 overflow-y-auto h-[calc(80vh-120px)]">
                            <Prescription selectedAppointment={selectedAppointment} />
                        </div>
                    </div>
                </div>
            )}

            {/* Pay modal  */}
            {isPayOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-gray-300 rounded-lg shadow-lg max-w-lg w-full max-h-[50vh] overflow-hidden">
                        <div className="px-4 py-5 flex justify-between  sm:px-6 bg-gray-800 text-white">
                            <h3 className="text-lg leading-6 font-medium">
                                Payment info for {selectedAppointment?.patientName}
                            </h3>
                            <button
                                onClick={() => {
                                    setIsPayOpen(false);
                                }}
                                className='btn btn-sm bg-red-600 border-none text-white hover:bg-red-400'>Close</button>
                        </div>
                        <div className="p-3 overflow-y-auto h-[calc(50vh-120px)]">
                            {/* <Prescription selectedAppointment={selectedAppointment} /> */}
                            <p className=''>
                                <span className="font-bold">Doctor's Fee</span> : {doctorFee}TK
                            </p>
                            <hr className='border-2 border-gray-800 my-2' />
                            <div>
                                <input
                                    type="checkbox"
                                    name="meet"
                                    id="meet"
                                    checked={isMeetingChecked}
                                    onChange={handleCheckboxChange}
                                />
                                Metting <br />
                                <input
                                    type="checkbox"
                                    name="manual"
                                    id="manual"
                                    checked={isManualChecked}
                                    onChange={handleCheckboxChange}
                                />
                                Manual payment <br />
                            </div>
                            <button className='btn mt-10 btn-sm btn-warning' onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
export default AppointmentDoctor;