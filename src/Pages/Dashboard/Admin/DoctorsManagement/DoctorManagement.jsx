import React, { useEffect, useState } from 'react';
import Headline from '../../../../Components/Headline';
import { IoMdAddCircle } from 'react-icons/io';
import DoctorForm from '../../../../Components/DoctorForm/DoctorForm';
import '../../../../App.css'

const DoctorManagement = () => {
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [departmentDoctors, setDepartmentDoctors] = useState({});
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/doctors')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);

                // Create a mapping of departments to doctors
                const departmentMap = data.reduce((acc, doctor) => {
                    const department = doctor.department;
                    if (!acc[department]) {
                        acc[department] = [];
                    }
                    acc[department].push(doctor);
                    return acc;
                }, {});

                setDepartmentDoctors(departmentMap);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const handleFormSubmit = async (newDoctor) => {
        try {
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/doctors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDoctor),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add doctor');
            }
            else{
                alert('Success');
            }
    
            const addedDoctor = await response.json();
            const updatedDoctors = [...doctors, addedDoctor];
            setDoctors(updatedDoctors);
    
            const departmentMap = updatedDoctors.reduce((acc, doctor) => {
                const department = doctor.department;
                if (!acc[department]) {
                    acc[department] = [];
                }
                acc[department].push(doctor);
                return acc;
            }, {});
    
            setDepartmentDoctors(departmentMap);
        } catch (error) {
            alert('Error adding doctor:', error);
            // Handle error appropriately in your UI, e.g., show a message to the user
        }
    };
    


    return (
        <div className='mx-4'>
            {/* <Headline headline='Doctors'></Headline> */}
            <div className='my-10  text-white flex md:flex-row flex-col justify-between gap-4'>
                <h2 className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% py-3 rounded-xl font-medium text-lg md:text-xl w-[200px] text-center'>Total Doctor : {doctors?.length}</h2>

                <h2 className='bg-gradient-to-r from-indigo-600 from-10% via-sky-600 via-30% to-emerald-600 to-90% py-3 rounded-xl font-medium text-lg md:text-xl w-[250px] text-center'>Total Departmnet : {Object.keys(departmentDoctors).length}</h2>

                <div className='bg-gradient-to-r from-indigo-600 from-10% via-sky-600 via-30% to-emerald-600 to-90% py-3 rounded-xl font-medium text-lg md:text-xl w-[250px] text-center cursor-pointer flex justify-center items-center gap-2' onClick={() => setIsFormOpen(true)}>
                    <IoMdAddCircle />
                    <span>Register a Doctor</span>
                </div>
            </div>
            <div className='grid md:grid-cols-4 grid-cols-2 mb-10 rounded-xl bg-[#c5b984] p-4'>
                {Object.keys(departmentDoctors).map(department => (
                    <div key={department}>
                        <h3 className='md:text-xl text-lg my-2 font-bold'>{department} ({departmentDoctors[department].length})</h3>
                        <ul>
                            {departmentDoctors[department]?.map(doctor => (
                                <div key={doctor._id}>
                                    <li className='md:text-lg text-[14px] font-bold text-[#e05c3b]'>{doctor.name}</li>
                                    <li className='md:text-sm text-[12px]'>{Array.isArray(doctor.degree) ? doctor.degree.join(' ') : doctor.degree}</li>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <DoctorForm className='' onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />
                </div>
            )}
        </div>
    );
};

export default DoctorManagement;
