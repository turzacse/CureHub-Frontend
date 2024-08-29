import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import axios from 'axios';
import Swal from 'sweetalert2';
import Heading from '../../Components/PageHeading/Heading';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContext';
const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight or noon
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const getDayName = (dayIndex) => {
    switch (dayIndex) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return '';
    }
};

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [image, setImage] = useState('https://i.ibb.co/HNwNbwh/doc.jpg');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAppointmentModal, setShowAppointmentModal] = useState(null);
    const [appointDoctor, setAppointDoctor] = useState();
    const [userCountry, setUserCountry] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('')
    const [currentDate, setCurrentDate] = useState(new Date());
    const {user, curehubUser} = useContext(AuthContext);
    console.log('user ==>', curehubUser);
    const navigate = useNavigate();
    // const [appoinmentDay, setAppoinmentDay] = useState(new Date());
    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    const today = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[today.getDay()];

    // console.log('Today is:', dayName);

    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/doctors')
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

    // console.log('country..........', userCountry);
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


    const getFormattedDateAndDay = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const day = date.getDay();
        const appointmentDay = getDayName(day);

        return { formattedDate, appointmentDay };
    };

    const dateFormate = (date) => {

    }

    const { formattedDate, appointmentDay } = getFormattedDateAndDay(currentDate);
    // console.log('data....', formattedDate, appointmentDay);

    // console.log(appoinmentDay);

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
        setAppointDoctor(doctor);
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

    const handlePhoneChange = (e) => {
        setPhoneNumber(e.target.value);
    };
    const handleBooking = async (e) => {
        e.preventDefault();
    
        const bookingDetails = {
            doctor: appointDoctor?._id,
            patient: curehubUser?._id,
            doctorName: appointDoctor?.name,
            patientName: curehubUser?.username || 'Unknown',
            appointedTime: selectedSlot,
            appointedDate: formattedDate,
            bookingDate: today?.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            patientPhone: phoneNumber,
        };
    
        try {
            const response = await axios.post('https://cure-hub-backend-gules.vercel.app/appoinment', bookingDetails);
            console.log('Booking info:', bookingDetails);
            console.log('API Response:', response.data);
    
            setShowAppointmentModal(false);
        } catch (error) {
            console.error('Error sending booking details:', error);
        }
    };
    

    console.log('doctor =>', appointDoctor);
    return (
        <div className='text-white  mx-auto'>
            <Heading title="Dedicated Team of Doctors" subtitle="Discover Expertise, Compassion, and Personalized Care" />

            <div className='lg:container lg:mx-auto  mx-4 py-10 '>
            <h2 className="text-2xl  text-center text-white font-bold mb-10">Meet Our Trusted Doctors, Available Every Day to Care for You!</h2>

                <div className='grid  lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2'>
                    {doctors.map((doctor) => (
                        <div className='bg-gray-300 text-black rounded-lg p-4' key={doctor._id}>
                            <img className='mx-auto rounded-full h-[100px] w-[100px]' src={doctor?.doctor_img} alt="" />
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
                            <img src={selectedDoctor?.doctor_img} alt={selectedDoctor.name} className="w-[200px] h-[200px] shadow-lg rounded-xl object-cover mb-4" />
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
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-[#199292] p-4 md:w-1/2 mx-4 rounded-lg ">
                            <div className='flex justify-between'>
                                <h3 className="text-xl font-bold text-black mb-2">Appointment with {showAppointmentModal.name}</h3>
                                <button onClick={closeModal} className="text-3xl "><IoMdCloseCircleOutline /></button>
                            </div>
                            <form>
                                <div className='flex gap-1'>
                                    <label className="block flex-1 mb-2">
                                        Name:
                                        <input
                                        value={curehubUser?.username}
                                        readOnly
                                        type="text" name="name" className="w-full border border-gray-300 text-black rounded py-2 px-3" required />
                                    </label>
                                    <label className="block mb-2 flex-1">
                                        Email:
                                        <input
                                        value={curehubUser?.email}
                                        readOnly
                                        type="email" name="email" className="w-full border text-black border-gray-300 rounded py-2 px-3" required />
                                    </label>
                                </div>
                                <div className='flex gap-1'>
                                    <label className="block mb-2 flex-1">
                                        Phone:
                                        <input
                                        onChange={handlePhoneChange}
                                        type="number" name="phone" className="w-full border text-black border-gray-300 rounded py-2 px-3" required />
                                    </label>
                                    <label className="block mb-2 flex-1">
                                        Appointment Date:
                                        <input
                                        value={formattedDate}
                                        readOnly name="date" className="w-full border border-gray-300 rounded py-2 px-3 text-black" required />
                                    </label>
                                </div>
                                <div className="mb-2">

                                    <div className="flex justify-between items-center mb-2">
                                        <p onClick={handlePrevDay} className="bg-gray-500 text-white py-1 px-3 rounded-md cursor-pointer">←</p>
                                        <p className="mb-2">Available Slots: {formattedDate}</p>
                                        <p onClick={handleNextDay} className="bg-gray-500 text-white py-1 px-3 rounded-md cursor-pointer">→</p>
                                    </div>
                                    {showAppointmentModal.offDay === appointmentDay ? (
                                        <div className="text-center font-medium text-red-700">
                                            Doctor is Unavailable for this day
                                        </div>
                                    ) : (
                                        getSlots(showAppointmentModal.start_time, showAppointmentModal.end_time).map((slot, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className={`text-[12px] py-1 px-2 rounded-md mr-2 mb-2 justify-center ${selectedSlot === slot ? 'bg-gray-400' : 'bg-[#1c1d1c] text-white'}`}
                                                onClick={() => handleSlotClick(slot)}
                                                disabled={selectedSlot === slot}
                                            >
                                                {slot}
                                            </button>
                                        ))
                                    )}

                                </div>
                                <button
                                    onClick={handleBooking}
                                    type="submit" className="bg-warning text-black py-2 px-4 rounded-md">Appointment</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <section className="mt-10 bg-gradient-to-r from-teal-400 to-blue-500 text-white py-16 text-center rounded-t-xl ">
                <div className='lg:container lg:mx-auto mx-4'>
                <h2 className="md:text-4xl text-2xl font-bold mb-2">Unlock Premium Health Benefits</h2>
                <p className="md:mb-5 mb-2 text-[12px]">
                    Join CureHub's Membership for Exclusive Access to Top Healthcare Services, Special Discounts, and Personalized Care.
                </p>
                <div className="flex flex-col text-[12px] md:text-[16px] ">
                    <p>Become a Member Today and Enjoy Comprehensive Health Benefits!</p>
                    <p>Get Your Membership Now and Stay Ahead in Your Health Journey with CureHub!</p>
                </div>
                <button
                    onClick={() => {
                        navigate('/membership-plan')
                    }}
                    className="bg-white mt-8 text-teal-500 font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-gray-100 transition duration-300">
                    Membership
                </button>
                </div>
            </section>
        </div>
    );
};

export default Doctors;
