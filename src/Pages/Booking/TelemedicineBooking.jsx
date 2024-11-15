
import React, { useContext, useEffect, useState } from 'react';
import CTAtele from '../TeleMedicine/CTASection';
import Heading from '../../Components/PageHeading/Heading';
import Guideline from './Guideline';
import { AuthContext } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import CTASection from './CTASection';

const TelemedicineBooking = () => {
    const {user, curehubUser} = useContext(AuthContext);

    console.log(curehubUser);

    useEffect( () => {
        window.scroll(0,0);
    } ,[])
    const [formData, setFormData] = useState({
        // cureHubUser: currentuser?._id,
        name: '' || user?.displayName,
        email: '' || curehubUser?.email,
        phone: '',
        specialty: '',
        date: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, cureHubUser: curehubUser?._id, [name]: value });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/telemedicine-appoinment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Assuming formData is defined somewhere in your component
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Appointment submitted successfully:', data);
    
            // Show success SweetAlert
            Swal.fire({
                title: 'Success!',
                text: 'Appointment submitted successfully. \n \n You can show your Appointment details on your Account.',
                icon: 'success',
                confirmButtonColor: '#006666',
                background: '#004040',
                color: 'white'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Navigate after the confirm button is clicked
                    navigate('/dashboard/patient-appointment');
                }
            });
    
            // Optionally handle success feedback to the user or further actions
        } catch (error) {
            console.error('Error submitting appointment:', error.message);
    
            // Show error SweetAlert
            Swal.fire({
                title: 'Error!',
                text: 'Failed to submit appointment. Please try again later.',
                icon: 'error',
                confirmButtonColor: '#006666',
            });
    
            // Optionally handle error feedback to the user
        }
    };

    return (
        <div className="min-h-screen bg-gray-400">
            <Heading
                title='Book Your Appointment'
                subtitle='Get expert medical advice from the comfort of your home'
            />

            <main className="py-10 lg:container lg:mx-auto mx-4">
                <div className="flex md:flex-row flex-col gap-4">
                    <div className='md:w-1/3 w-full'>
                        <Guideline/>
                    </div>
                    <div className=" md:w-2/3 w-full mx-auto bg-gray-300 p-8 rounded-lg">
                    <h2 className="md:text-2xl font-bold mb-4">Appointment Form || Cure<span className='text-red-500'>Hub</span></h2>
                    <form onSubmit={handleSubmit} className="space-y-6 text-gray-50">
                        <div className="flex gap-2 md:flex-row flex-col">
                            <div className='flex-1'>
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || user?.displayName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                />
                            </div>
                            <div className='flex-1'>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email || curehubUser?.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 md:flex-row flex-col">
                            <div className='flex-1'>
                                <label className="block text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone || user?.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                />
                            </div>
                            <div className='flex-1'>
                                <label className="block text-gray-700">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700">Specialty</label>
                            <select
                                name="specialty"
                                value={formData.specialty}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            >
                                <option value="">Select Specialty</option>
                                <option value="General Medicine">General Medicine</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Gynecology">Gynecology</option>
                                <option value="Dermatology">Dermatology</option>
                                <option value="Psychiatry">Psychiatry</option>
                                <option value="Nutrition and Dietetics">Nutrition and Dietetics</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                rows="4"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-md  transition duration-300 ease-in-out"
                        >
                            Book Appointment
                        </button>
                    </form>
                    </div>
                </div>
            </main>

            {/* <CTAtele /> */}
        </div>
    );
};

export default TelemedicineBooking;
