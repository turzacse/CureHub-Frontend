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
        onSubmit(formData);
        onClose();
        console.log(formData);
    };

    return (
        <div className="popup-form">
            <h2 className='font-bold text-xl mb-5 text-center '>CureHub's Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-between gap-2'>
                    <div className='flex-1'>
                        {/* <label>Name:</label> */}
                        <input type="text" placeholder='Name' name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className='flex-1'>
                        {/* <label>Degree:</label> */}
                        <input type="text" placeholder='Degree' name="degree" value={formData.degree} onChange={handleChange} required />
                    </div>
                </div>
                <div className='flex justify-between gap-2'>
                    <div className='flex-1'>
                        {/* <label>Department:</label> */}
                        {/* <input type="text" placeholder='Department' name="department" value={formData.department} onChange={handleChange} required /> */}
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
                        {/* <label>Designation:</label> */}
                        <input type="text" placeholder='Designation' name="designation" value={formData.designation} onChange={handleChange} required />
                    </div>
                    <div className='flex-1'>
                        {/* <label>Doctor's Code:</label> */}
                        <input type="text" placeholder={`Doctor's Code`} name="doctors_code" value={formData.doctors_code} onChange={handleChange} required />
                    </div>
                </div>

                <div className='flex justify-between gap-2'>
                    <div className='flex-1'>
                        {/* <label>Email:</label> */}
                        <input type="email" placeholder='Email' name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className='flex-1'>
                        {/* <label>Phone:</label> */}
                        <input type="text" placeholder='Phone' name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className='flex-1'>
                        {/* <label>Off Day:</label> */}
                        <input type="text" placeholder='Off Day' name="offDay" value={formData.offDay} onChange={handleChange} required />
                    </div>
                </div>
                <div className='flex justify-between gap-2'>
                    <div className='flex-1 flex gap-2 items-center'>
                        <label>Start Time</label>
                        <input type="time" placeholder='Start Time' name="start_time" value={formData.start_time} onChange={handleChange} required />
                    </div>
                    <div className='flex-1 flex gap-2 items-center'>
                    <label>End Time</label>
                        <input type="time" placeholder='End Time' name="end_time" value={formData.end_time} onChange={handleChange} required />
                    </div>
                     
                </div>
                <div className='flex justify-between gap-2'>
                    <div className='flex-1'>
                        {/* <label>Visit:</label> */}
                        {/* <input type="text" placeholder='Visit' name="visit" value={formData.visit} onChange={handleChange} required /> */}
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
                        {/* <label>Doctor Image URL:</label> */}
                        <input type="file" className='py-2' placeholder='Image' name="doctor_img" onChange={handleUpload} required />
                        <label className='font-normal text-sm'>Profile Image</label>
                    </div>
                    <div className='flex-1'>
                        {/* <label>Joining Date:</label> */}
                        <input type="date" placeholder='Joining Date' name="joining_date" value={formData.joining_date} onChange={handleChange} required />
                        <label className='font-normal text-sm'>Joining Date</label>
                    </div>
                </div>
                <div>
                    <button type="submit">Register</button>
                    <button type="button" onClick={onClose}>Close</button>
                </div>
            </form>
        </div>
    );
};

export default DoctorForm;
