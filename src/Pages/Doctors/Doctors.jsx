import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import axios from 'axios';
import Swal from 'sweetalert2';
const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight or noon
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};



const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [image, setImage] = useState('https://i.ibb.co/HNwNbwh/doc.jpg');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAppointmentModal, setShowAppointmentModal] = useState(null);
    const [userCountry, setUserCountry] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    const today = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[today.getDay()];

    console.log('Today is:', dayName);

    useEffect(() => {
        fetch('Doctors.json')
            .then(res => res.json())
            .then(data => {
                const filteredDoctors = data.filter(item => item.offDay !== dayName);
                setDoctors(filteredDoctors);
            });
    }, []);

    useEffect(() => {
        axios.get('https://api.ipify.org/?format=json')
            .then(response => {
                const ipAddress = response.data.ip;
                return axios.get(`https://ipapi.co/${ipAddress}/json/`);
            })
            .then(response => {
                console.log(response.data.country_name);
                setUserCountry(response.data);
            })
            .catch(error => {
                console.error('Error fetching user country:', error);
                setUserCountry('Unknown');
            });
    }, []);

    console.log('country..........', userCountry);
    const getSlots = (startTime, endTime) => {
        const start = new Date();
        const end = new Date();
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        start.setHours(startHour, startMinute, 0, 0);
        end.setHours(endHour, endMinute, 0, 0);

        const slots = [];
        while (start < end) {
            const slotStart = new Date(start);
            const slotEnd = new Date(start.getTime() + 30 * 60000); // 30 minutes later
            if (slotEnd > end) break;
            slots.push(`${formatTime(slotStart.toTimeString().slice(0, 5))} - ${formatTime(slotEnd.toTimeString().slice(0, 5))}`);
            start.setTime(slotEnd.getTime());
        }
        return slots;
    };
    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const handlePrevDay = () => {
        setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
        setSelectedSlot(null); // Reset selected slot when date changes
    };

    const handleNextDay = () => {
        setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
        setSelectedSlot(null); // Reset selected slot when date changes
    };

    const handleSlotClick = (slot) => {
        Swal.fire({
            title: 'Confirm Appointment',
            // text: `Do you want to book the slot ${slot}?`,
            html: `<p>Do you want to book the slot ${slot} with ${showAppointmentModal.name} (${showAppointmentModal.department})?</p>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            background: '#004040',
            color: 'white'
        }).then((result) => {
            if (result.isConfirmed) {
                setSelectedSlot(slot);
            }
        });
    };
    const handleDetailsClick = (doctor) => {
        setSelectedDoctor(doctor);
        setShowDetailsModal(true);
    };

    const handleAppointmentClick = (doctor) => {
        // setSelectedDoctor(doctor);
        // setShowDetailsModal(false);
        setShowAppointmentModal(doctor);
        console.log('yessssssssssssssss')
    };

    const closeModal = () => {
        setShowDetailsModal(false);
        setShowAppointmentModal(false);
        setSelectedDoctor(null);
        setSelectedSlot(null);
    };


    return (
        <div className='text-white md:mx-20 mx-4 py-10'>
            <div className='text-center mb-10'>
                <h2 className='text-2xl font-bold text-[#acdf4e]'>Our Available Doctor for Today</h2>
                <p className='text-[12px] mt-2'>Make your appointment to your desire Doctor</p>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2'>
                {doctors.map((doctor) => (
                    <div className='bg-[#f3cbcb] text-black rounded-lg p-4' key={doctor._id}>
                        <img className='mx-auto rounded-full h-[100px] w-[100px]' src={image} alt="" />
                        <h2>{doctor?.name} || {doctor.department}</h2>
                        <p>
                            {doctor?.degree?.map((deg, index) => (
                                <span key={index}>{deg}{index < doctor.degree.length - 1 ? ', ' : ''}</span>
                            ))}
                        </p>
                        <div className='flex justify-between mt-2'>
                            <button onClick={() => handleDetailsClick(doctor)} className="bg-[#bd2121] text-white py-2 px-4 rounded-md mr-2 flex justify-center items-center gap-[5px]"><FaEye /> Details</button>
                            <button onClick={() => handleAppointmentClick(doctor)} className="bg-[#1a9e46] text-white py-2 px-4 rounded-md mr-2 flex justify-center items-center gap-[5px]"><AiOutlineSchedule /> Appoint</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Details Modal */}
            {selectedDoctor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
                    <div className="bg-[#199292] p-4 w-1/2 rounded-lg">
                        <div className='flex justify-between'>
                            <h3 className="text-xl font-bold mb-2">{selectedDoctor.name}</h3>
                            <button onClick={closeModal} className="text-4xl text-red-600"><IoMdCloseCircleOutline /></button>
                        </div>
                        <img src={image} alt={selectedDoctor.name} className="w-[200px] h-[200px] shadow-lg rounded-xl object-cover mb-4" />
                        <p>Department: {selectedDoctor.department}</p>
                        <p>Designation: {selectedDoctor.designation}</p>
                        <p>Degrees:
                            {selectedDoctor?.degree?.map((deg, index) => (
                                <span key={index}>{deg}{index < selectedDoctor.degree.length - 1 ? ', ' : ''}</span>
                            ))}
                        </p>
                        <p>Email: {selectedDoctor.email}</p>
                        <p>Phone: {selectedDoctor.phone}</p>
                        <p className='text-red-400'>Off Day: <del>{selectedDoctor.offDay}</del></p>
                        <p>Visit: {selectedDoctor.visit}</p>
                        <p>Available Time: {formatTime(selectedDoctor.start_time)} - {formatTime(selectedDoctor.end_time)}</p>
                    </div>
                </div>
            )}

            {/* Appointment Modal */}
            {showAppointmentModal && (
                // <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                //     <div className="bg-[#199292] p-4 md:w-1/2 mx-4 rounded-lg ">
                //         <div className='flex justify-between'>
                //             <h3 className="text-xl font-bold text-black mb-2">Appointment with {showAppointmentModal.name}</h3>
                //             <button onClick={closeModal} className="text-4xl text-red-600"><IoMdCloseCircleOutline /></button>
                //         </div>
                //         <form>
                //             <label className="block mb-2">
                //                 Name:
                //                 <input type="text" name="name" className="w-full border border-gray-300 rounded py-2 px-3" required />
                //             </label>
                //             <label className="block mb-2">
                //                 Email:
                //                 <input type="email" name="email" className="w-full border border-gray-300 rounded py-2 px-3" required />
                //             </label>
                //             <label className="block mb-2">
                //                 Phone:
                //                 <input type="tel" name="phone" className="w-full border border-gray-300 rounded py-2 px-3" required />
                //             </label>
                //             <label className="block mb-2">
                //                 Appointment Date:
                //                 <input type="date" name="date" className="w-full border border-gray-300 rounded py-2 px-3" required />
                //             </label>
                //             <button type="submit" className="bg-[#1a9e46] text-white py-2 px-4 rounded-md">Submit</button>
                //         </form>
                //     </div>
                // </div>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#199292] p-4 md:w-1/2 mx-4 rounded-lg ">
                        <div className='flex justify-between'>
                            <h3 className="text-xl font-bold text-black mb-2">Appointment with {showAppointmentModal.name}</h3>
                            <button onClick={closeModal} className="text-4xl text-red-600"><IoMdCloseCircleOutline /></button>
                        </div>
                        <form>
                            <label className="block mb-2">
                                Name:
                                <input type="text" name="name" className="w-full border border-gray-300 rounded py-2 px-3" required />
                            </label>
                            <label className="block mb-2">
                                Email:
                                <input type="email" name="email" className="w-full border border-gray-300 rounded py-2 px-3" required />
                            </label>
                            <label className="block mb-2">
                                Phone:
                                <input type="tel" name="phone" className="w-full border border-gray-300 rounded py-2 px-3" required />
                            </label>
                            <label className="block mb-2">
                                Appointment Date:
                                <input type="date" name="date" className="w-full border border-gray-300 rounded py-2 px-3" required />
                            </label>
                            <div className="mb-2">
                                
                                <div className="flex justify-between items-center mb-2">
                                    <p onClick={handlePrevDay} className="bg-gray-400 text-white py-1 px-3 rounded-md cursor-pointer">←</p>
                                    <p className="mb-2">Available Slots: {formatDate(currentDate)}</p>
                                    <p onClick={handleNextDay} className="bg-gray-400 text-white py-1 px-3 rounded-md cursor-pointer">→</p>
                                </div>

                                {getSlots(showAppointmentModal.start_time, showAppointmentModal.end_time).map((slot, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`text-[12px] py-1 px-2 rounded-md mr-2 mb-2 justify-center ${selectedSlot === slot ? 'bg-gray-400' : 'bg-[#1c1d1c] text-white'}`}
                                        onClick={() => handleSlotClick(slot)}
                                        disabled={selectedSlot === slot}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                            <button type="submit" className="bg-[#1a9e46] text-white py-2 px-4 rounded-md">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Doctors;
