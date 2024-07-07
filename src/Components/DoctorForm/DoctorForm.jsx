import React, { useState } from 'react';
import '../../App.css'
import axios from 'axios';

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

const image_hosting = '39cd3de230380fc39b116f0d1af689bd';
const image_hosting_key = `https://api.imgbb.com/1/upload?key=${image_hosting}`;

const DoctorForm = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        degree: '',
        department: '',
        designation: '',
        doctors_code: '',
        email: '',
        phone: '',
        offDay: '',
        start_time: '',
        end_time: '',
        visit: '',
        doctor_img: '',
        joining_date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpload = async (event) => {
        const selectedFile = event.target.files[0];
        try {
            const uploadData = new FormData();
            uploadData.append("image", selectedFile);

            const response = await axios.post(image_hosting_key, uploadData);

            if (response.status === 200) {
                const imageUrl = response.data.data.url;
                setFormData((prevState) => ({ ...prevState, doctor_img: imageUrl }));
                console.log("Image uploaded successfully:", imageUrl);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            degree: formData.degree.split(',').map(deg => deg.trim())
        };
        onSubmit(dataToSubmit);
        onClose();
        console.log(dataToSubmit);
    };

    return (
        <div className="popup-form bg-[#199292] p-8">
            <h2 className='font-bold text-xl mb-5 text-center '>CureHub's Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-between gap-2'>
                    <div className='w-1/2 py-1'>
                        <input 
                        type="text" 
                        placeholder='Name' 
                        className='p-2'
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} required />
                    </div>
                    <div className='flex-1 py-1'>
                        <input type="text" className='p-2' placeholder='Degree' name="degree" value={formData.degree} onChange={handleChange} required />
                    </div>
                </div>
                <div className='flex justify-between my-1 mb-2 gap-2'>
                    <div className='flex-1'>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            className='py-2 border-2'
                        >
                            <option value="" disabled>Select Department</option>
                            {medicalDepartments.map(department => (
                                <option key={department} value={department}>
                                    {department}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex-1'>
                        <input type="text" className='p-2' placeholder='Designation' name="designation" value={formData.designation} onChange={handleChange} required />
                    </div>
                    <div className='flex-1'>
                        <input type="text" className='p-2' placeholder={`Doctor's Code`} name="doctors_code" value={formData.doctors_code} onChange={handleChange} required />
                    </div>
                </div>

                <div className='flex mb-2 justify-between gap-2'>
                    <div className='flex-1'>
                        <input type="email" className='p-2' placeholder='Email' name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className='flex-1'>
                        <input type="text" className='p-2' placeholder='Phone' name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className='flex-1'>
                        <input type="text" className='p-2' placeholder='Off Day' name="offDay" value={formData.offDay} onChange={handleChange} required />
                    </div>
                </div>
                <div className='flex mb-2 justify-between gap-2'>
                    <div className='flex-1 flex gap-2 items-center'>
                        <label>Start Time</label>
                        <input type="time" className='p-2' placeholder='Start Time' name="start_time" value={formData.start_time} onChange={handleChange} required />
                    </div>
                    <div className='flex-1 flex gap-2 items-center'>
                    <label>End Time</label>
                        <input type="time" className='p-2' placeholder='End Time' name="end_time" value={formData.end_time} onChange={handleChange} required />
                    </div>
                     
                </div>
                <div className='flex mb-2 justify-between gap-2'>
                    <div className='flex-1'>
                        <select
                            name="visit"
                            value={formData.visit}
                            onChange={handleChange}
                            required
                            className='py-2 border-2 w-full'
                        >
                            <option value="" disabled>Visit</option>
                            {visit.map(e => (
                                <option key={e} value={e}>
                                    {e}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex-1'>
                        <input type="file" className='py-2 bg-gray-300 px-2' placeholder='Image' name="doctor_img" onChange={handleUpload} />
                        <label className='font-normal text-sm'>Profile Image</label>
                    </div>
                    <div className='flex-1'>
                        <input type="date" className='p-2' placeholder='Joining Date' name="joining_date" value={formData.joining_date} onChange={handleChange} required />
                        <label className='font-normal text-sm'>Joining Date</label>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <button
                    // onClick={handleRegister}
                    className='px-4 w-[100px] py-2 bg-blue-500 rounded-lg text-white' type="submit">Register</button>
                    
                </div>
            </form>
            <button className=' mt-4 w-[100px] px-4 py-2 bg-red-500 rounded-lg text-white'  type="button" onClick={onClose}>Close</button>
        </div>
    );
};

export default DoctorForm;
