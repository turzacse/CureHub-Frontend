import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { FaCheckCircle } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc';

const medicalDepartments = [
    "Anesthesiology",
    "Cardiology",
    "Dermatology",
    "Emergency Medicine",
    "Endocrinology",
    "Family Medicine",
    "Gastroenterology",
    "General Surgery",
    "Geriatrics",
    "Gynecology",
    "Hematology",
    "Infectious Diseases",
    "Internal Medicine",
    "Nephrology",
    "Neurology",
    "Neurosurgery",
    "Obstetrics and Gynecology (OB/GYN)",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Otolaryngology (ENT)",
    "Pediatrics",
    "Plastic Surgery",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Sports Medicine",
    "Thoracic Surgery",
    "Urology",
    "Vascular Surgery"
];

const visit = [300, 400, 500, 600, 700, 800, 1000, 1200, 1500, 2000];

const DefaultDoctor = () => {
    const { curehubUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: curehubUser?.username || '',
        degree: '',
        department: '',
        designation: '',
        doctors_code: '',
        email: curehubUser?.email || '',
        phone: '',
        offDay: '',
        start_time: '',
        end_time: '',
        visit: '',
        doctor_img: curehubUser?.photo|| '',
        joining_date: '',
        telemedicine: false, 
        userID: curehubUser?._id,
        status: 'Pending'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData,
            telemedicine: e.target.checked 
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            degree: formData.degree.split(',').map(deg => deg.trim())
        };

        try {
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/doctors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add doctor');
            }
            else{
                alert('Success');
            }
    
            // const addedDoctor = await response.json();
            // const updatedDoctors = [...doctors, addedDoctor];
            // setDoctors(updatedDoctors);
    
            // const departmentMap = updatedDoctors.reduce((acc, doctor) => {
            //     const department = doctor.department;
            //     if (!acc[department]) {
            //         acc[department] = [];
            //     }
            //     acc[department].push(doctor);
            //     return acc;
            // }, {});
    
            // setDepartmentDoctors(departmentMap);
        } catch (error) {
            alert('Error adding doctor:', error);
            // Handle error appropriately in your UI, e.g., show a message to the user
        }
        console.log('Form Data:', formData);
        // Perform API call to update doctor info here
    };

    return (
        <div className="my-10 mx-4 py-10 md:px-20 px-2 bg-gray-400 shadow-md rounded-md">
            <div className="flex items-center mb-6">
                <img src={curehubUser?.photo} alt="Doctor" className="w-24 h-24 rounded-lg" />
                <div className="ml-6">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold">{curehubUser?.username}</h2>
                        <div className="relative group">
                            <FcCancel className='text-3xl cursor-pointer' />
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-700 text-white text-sm rounded p-2 w-[250px]">
                                You haven't registered yet. Please fill out the information below to register.
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600">{curehubUser.email}</p>
                </div>
            </div>
            <form className='' onSubmit={handleSubmit}>
                <div className='flex flex-col justify-between'>
                    <label htmlFor="">Name</label>
                    <div className=''>
                        <input
                            type="text"
                            placeholder='Name'
                            className='p-2 w-full bg-gray-300 border border-gray-300 rounded'
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <label htmlFor="" className='mt-2'>Your Degree (Can be multiple)</label>
                    <div className=''>
                        <input
                            type="text"
                            className='p-2 w-full bg-gray-300 border border-gray-300 rounded'
                            placeholder='Degree'
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='flex flex-col justify-between mt-2 mb-2 gap-2'>
                    <div className='flex-1 mt-2'>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            className='py-2 border-2 bg-gray-300 w-full border-gray-300 rounded'
                        >
                            <option value="" disabled>Select Department</option>
                            {medicalDepartments.map(department => (
                                <option key={department} value={department}>
                                    {department}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex-1 my-2'>
                        <input
                            type="text"
                            className='p-2 w-full border bg-gray-300 border-gray-300 rounded'
                            placeholder='Designation'
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex-1'>
                        <input
                            type="text"
                            className='p-2 w-full border bg-gray-300 border-gray-300 rounded'
                            placeholder={`Doctor's Code`}
                            name="doctors_code"
                            value={formData.doctors_code}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className='flex flex-col mb-2 justify-between gap-2'>
                    <div className='flex-1 mt-2'>
                        <input
                            type="email"
                            className='p-2 w-full border bg-gray-300 border-gray-300 rounded'
                            placeholder='Email'
                            name="email"
                            readOnly
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex-1 my-2'>
                        <input
                            type="text"
                            className='p-2 w-full border bg-gray-300 border-gray-300 rounded'
                            placeholder='Phone'
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex-1'>
                        <input
                            type="text"
                            className='p-2 w-full border bg-gray-300 border-gray-300 rounded'
                            placeholder='Off Day'
                            name="offDay"
                            value={formData.offDay}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <label htmlFor="">Service Time</label>
                <div className='flex mb-2 justify-between gap-2'>
                    
                    <div className='flex-1 w-1/2 flex gap-2 items-center my-2'>
                        
                        <input
                            type="time"
                            className='p-2 border  bg-gray-300 border-gray-300 rounded'
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='text-center'>To</div>
                    <div className='flex-1 w-1/2 flex gap-2 items-center justify-end my-2'>
                        
                        <input
                            type="time"
                            className='p-2 border bg-gray-300 border-gray-300 rounded'
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='flex mb-2 justify-between gap-2'>
                    <div className='flex-1'>
                        <select
                            name="visit"
                            value={formData.visit}
                            onChange={handleChange}
                            required
                            className='py-2 border-2 w-full bg-gray-300 border-gray-300 rounded'
                        >
                            <option value="" disabled>Select Visit Type</option>
                            {visit.map(e => (
                                <option key={e} value={e}>
                                    {e}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex-1'>
                        <input
                            type="date"
                            className='p-2 w-full border bg-gray-300 border-gray-300 rounded'
                            name="joining_date"
                            value={formData.joining_date}
                            onChange={handleChange}
                            required
                        />
                        <label className='font-normal text-sm'>Joining Date</label>
                    </div>
               
                    </div>
                <div className='mb-4'>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className='mr-2'
                            name="telemedicine"
                            checked={formData.telemedicine}
                            onChange={handleCheckboxChange}
                        />
                        Offer Telemedicine Services
                    </label>
                </div>
                {/* <div className='mb-4'>
                    <label htmlFor="doctor_img" className="block mb-2">Upload Doctor Image</label>
                    <input
                        type="file"
                        name="doctor_img"
                        onChange={handleUpload}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-300"
                    />
                </div> */}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default DefaultDoctor;
