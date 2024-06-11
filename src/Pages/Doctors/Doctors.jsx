import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
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
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);

    useEffect(() => {
        fetch('Doctors.json')
            .then(res => res.json())
            .then(data => setDoctors(data));
    }, []);

    const handleDetailsClick = (doctor) => {
        setSelectedDoctor(doctor);
        setShowDetailsModal(true);
    };

    const handleAppointmentClick = (doctor) => {
        setSelectedDoctor(doctor);
        setShowAppointmentModal(true);
    };

    const closeModal = () => {
        setShowDetailsModal(false);
        setShowAppointmentModal(false);
        setSelectedDoctor(null);
    };
    

    return (
        <div className='text-white md:mx-20 mx-4 py-10'>
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
                    <div className="bg-white p-4 w-1/2 rounded-lg">
                        <div className='flex justify-between'>
                            <h3 className="text-xl font-bold mb-2">{selectedDoctor.name}</h3>
                            <button onClick={closeModal} className="text-4xl text-red-600"><IoMdCloseCircleOutline /></button>
                        </div>
                        <img src={image} alt={selectedDoctor.name} className="w-64 h-64 object-cover mb-4" />
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
            {/* {selectedDoctor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 w-1/2 rounded-lg">
                        <div className='flex justify-between'>
                            <h3 className="text-xl font-bold mb-2">Appointment with {selectedDoctor.name}</h3>
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
                            <button type="submit" className="bg-[#1a9e46] text-white py-2 px-4 rounded-md">Submit</button>
                        </form>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default Doctors;
