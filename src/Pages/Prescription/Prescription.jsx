import React, { useEffect, useState } from 'react';
import PrescriptionPDF from './PDF';// Import the PDF component
import Swal from 'sweetalert2';
import axios from 'axios';

const Prescription = ({ selectedAppointment }) => {
    const [reports, setReports] = useState([]);

    const [formData, setFormData] = useState({
        name: selectedAppointment?.patientName || '',
        age: '',
        sex: '',
        address: '',
        phone: '',
        medicalHistory: '',
        presentingComplaint: '',
        physicalExamFindings: '',
        diagnosis: '',
        prescriptions: [],
        instructions: '',
        followUp: '',
        additionalNotes: ''
    });
    const [isFormVisible, setIsFormVisible] = useState(true); // State to control form visibility
    const [isLoading, setIsLoading] = useState(false);

    const [desireData, setDesireData] = useState();

    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/complete/getall/appoinment')
        .then(res =>  res.json())
        .then(data => {
            const y= data?.find((item) => item?.appointment_id == selectedAppointment?._id)
            setDesireData(y);
        })
    } ,[selectedAppointment])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePrescriptionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPrescriptions = [...formData.prescriptions];
        updatedPrescriptions[index][name] = value;
        setFormData({
            ...formData,
            prescriptions: updatedPrescriptions
        });
    };

    const addPrescription = () => {
        setFormData({
            ...formData,
            prescriptions: [...formData.prescriptions, {
                medicine: '',
                dosage: '',
                frequency: ''
            }]
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const newReport = {
    //         ...formData
    //     };
    //     setReports([newReport]); // Update reports with the new prescription
    //     setIsFormVisible(false); // Hide the form
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Show loading indicator
    
        try {
            // Prepare the data to send
            const updatedPrescription = {
                ...formData
            };

            console.log(updatedPrescription);
            let prescription = updatedPrescription
    
            // Perform the PUT request to update the prescription
            const response = await axios.put(
                `https://cure-hub-backend-gules.vercel.app/complete/update/prescription/${desireData?._id}`,
                {
                    prescription: updatedPrescription
                }
            );
    
            // Check if the update was successful
            if (response.status === 200) {
                Swal.fire({
                    text: 'Prescribed!',
                    icon: 'success',
                    background:'#006666',
                    color: 'white'
                })
                // If the update is successful, update the reports state
                setReports([updatedPrescription]);
                setIsFormVisible(false); // Hide the form
                setIsLoading(false); // Hide the loading indicator
            } else {
                throw new Error('Failed to update prescription');
            }
        } catch (error) {
            console.error('Error updating prescription:', error);
            setIsLoading(false); // Hide loading indicator in case of error
        }
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setIsLoading(true); // Show loading indicator

    //     setTimeout(() => {
    //         const newReport = {
    //             ...formData
    //         };
    //         setReports([newReport]); 
    //         setIsFormVisible(false); 
    //         setIsLoading(false); 
    //     }, 2000); 
    // };

    // console.log('From prescriptions ===> ');

    return (
        <div className="container mx-auto px-0 py-0">
            {isFormVisible ? (
                <form onSubmit={handleSubmit} className="mx-auto bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {/* Form Fields */}
                    <div className="gap-4">
                        <div className="mb-4 flex-1">
                            <input type="text" name="name" value={selectedAppointment?.patientName || formData.name} readOnly onChange={handleChange} className="form-input p-2 rounded-lg mt-1 block w-full bg-white" required />
                        </div>
                        <div className="flex gap-2">
                            <div className="mb-4 flex-1">
                                <input type="text" name="age" value={formData.age} onChange={handleChange} className="form-input p-2 rounded-lg mt-1 block w-full bg-white" required placeholder='age' />
                            </div>
                            <div className="mb-4 flex-1">
                                <input type="text" name="sex" value={formData.sex} onChange={handleChange} className="form-input p-2 rounded-lg mt-1 block w-full bg-white" required placeholder='sex' />
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <div className="mb-4 flex-1">
                            <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-input p-2 rounded-lg mt-1 block w-full bg-white" required placeholder='address' />
                        </div>
                        <div className="mb-4 flex-1">
                            <input type="number" name="phone" value={formData.phone} onChange={handleChange} className="form-input p-2 rounded-lg mt-1 block w-full bg-white" required placeholder='phone number' />
                        </div>
                    </div>

                    <div className="mb-4">
                        <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} className="form-textarea p-2 rounded-lg mt-1 block w-full bg-white" required placeholder='medical history' />
                    </div>
                    <div className="mb-4">
                        <textarea name="presentingComplaint" value={formData.presentingComplaint} onChange={handleChange} className="form-textarea p-2 rounded-lg mt-1 block w-full bg-white" required placeholder='presenting complaint' />
                    </div>
                    <div className="mb-4">
                        <textarea name="physicalExamFindings" value={formData.physicalExamFindings} onChange={handleChange} className="form-textarea p-2 rounded-lg mt-1 block w-full bg-white" required placeholder='physical exam findings' />
                    </div>
                    <div className="mb-4">
                        <textarea name="diagnosis" value={formData.diagnosis} onChange={handleChange} className="form-textarea p-2 rounded-lg mt-1 block w-full bg-white" required placeholder='Diagnosis' />
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2 text-gray-600">Medicine:</h3>
                        <div className='grid grid-cols-1'>
                            {formData.prescriptions.map((prescription, index) => (
                                <div key={index} className="border border-gray-600 p-2 rounded mb-2">
                                    <input type="text" name="medicine" value={prescription.medicine} onChange={(e) => handlePrescriptionChange(index, e)} className="form-input p-2 rounded-lg mt-1 block w-full bg-white" required placeholder='medicine' />
                                    <div className='flex gap-2 mt-2'>
                                        <input type="text" name="dosage" value={prescription.dosage} onChange={(e) => handlePrescriptionChange(index, e)} className="form-input p-2 rounded-lg mt-1 block w-full bg-white" required placeholder='Dosage' />
                                        <input type="text" name="frequency" value={prescription.frequency} onChange={(e) => handlePrescriptionChange(index, e)} className="form-input p-2 rounded-lg mt-1 block w-full bg-white" required placeholder='Frequency' />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addPrescription} className="bg-blue-500 hover:bg-blue-700 btn btn-sm border-none text-white font-bold py-2 px-4 rounded">Add Medicine</button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">
                            Instructions to Patient:
                            <textarea name="instructions" value={formData.instructions} onChange={handleChange} className="form-textarea p-2 rounded-lg mt-1 block w-full bg-white" required />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">
                            Follow-Up:
                            <textarea name="followUp" value={formData.followUp} onChange={handleChange} className="form-textarea p-2 rounded-lg mt-1 block w-full bg-white" required />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">
                            Additional Notes:
                            <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} className="form-textarea p-2 rounded-lg mt-1 block w-full bg-white" required />
                        </label>
                    </div>
                    <button type="submit" className="bg-green-700 hover:bg-green-500 text-white py-2 px-4 rounded">
                        {isLoading? 'Generating...' : 'Generate'}
                        </button>
                </form>
            ) : (
                <div className="prescription-reports mt-8">
                    {reports.map((report, index) => (
                       
                        <PrescriptionPDF key={index} report={report} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Prescription;
