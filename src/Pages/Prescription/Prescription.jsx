import React, { useState } from 'react';
import PrescriptionPDF from './PDF';
// import PrescriptionPDF from './PrescriptionPDF';

const Prescription = () => {
    const [reports, setReports] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReport = {
            ...formData
        };
        setReports([...reports, newReport]);
        setFormData({
            name: '',
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
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSubmit} className=" mx-auto bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Patient Prescription Form</h2>
                <div className="flex md:flex-row flex-col  gap-4">
                    <div className="mb-4  flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name:    
                        </label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input p-2 rounded-lg mt-1 block w-full" required />
                    </div>
                    <div className="mb-4  flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Age:
                            
                        </label>
                        <input type="text" name="age" value={formData.age} onChange={handleChange} className="form-input  p-2 rounded-lg mt-1 block w-full" required />
                    </div>
                    <div className="mb-4  flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Sex:
                            
                        </label>
                        <input type="text" name="sex" value={formData.sex} onChange={handleChange} className="form-input  p-2 rounded-lg mt-1 block w-full" required />
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-4'>
                <div className="mb-4 flex-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Address:
                        
                    </label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-input  p-2 rounded-lg mt-1 block w-full" required />
                </div>
                <div className="mb-4 flex-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone:
                        
                    </label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input  p-2 rounded-lg mt-1 block w-full" required />
                </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Medical History:
                        
                    </label>
                    <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} className="form-textarea  p-2 rounded-lg mt-1 block w-full" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Presenting Complaint:
                        
                    </label>
                    <textarea name="presentingComplaint" value={formData.presentingComplaint} onChange={handleChange} className="form-textarea  p-2 rounded-lg mt-1 block w-full" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Physical Exam Findings:
                       
                    </label>
                    <textarea name="physicalExamFindings" value={formData.physicalExamFindings} onChange={handleChange} className="form-textarea  p-2 rounded-lg mt-1 block w-full" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Diagnosis:
                        
                    </label>
                    <textarea name="diagnosis" value={formData.diagnosis} onChange={handleChange} className="form-textarea  p-2 rounded-lg mt-1 block w-full" required />
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Prescription:</h3>
                    <div className='grid md:grid-cols-2 grid-cols-1'>
                    {formData.prescriptions.map((prescription, index) => (
                        <div key={index} className="border border-gray-300 p-4 rounded mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Medicine:
                                
                            </label>
                            <input type="text" name="medicine" value={prescription.medicine} onChange={(e) => handlePrescriptionChange(index, e)} className="form-input  p-2 rounded-lg mt-1 block w-full" required />
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Dosage:
                                
                            </label>
                            <input type="text" name="dosage" value={prescription.dosage} onChange={(e) => handlePrescriptionChange(index, e)} className="form-input  p-2 rounded-lg mt-1 block w-full" required />
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Frequency:
                                
                            </label>
                            <input type="text" name="frequency" value={prescription.frequency} onChange={(e) => handlePrescriptionChange(index, e)} className="form-input  p-2 rounded-lg mt-1 block w-full" required />
                        </div>
                    ))}
                    </div>
                    <button type="button" onClick={addPrescription} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Medicine</button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Instructions to Patient:
                        <textarea name="instructions" value={formData.instructions} onChange={handleChange} className="form-textarea  p-2 rounded-lg mt-1 block w-full" required />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Follow-Up:
                        <textarea name="followUp" value={formData.followUp} onChange={handleChange} className="form-textarea  p-2 rounded-lg mt-1 block w-full" required />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Additional Notes:
                        <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} className="form-textarea  p-2 rounded-lg mt-1 block w-full" required />
                    </label>
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Generate Prescription</button>
            </form>
            <div className="prescription-reports mt-8">
                {reports?.map((report, index) => (
                    <PrescriptionPDF key={index} report={report} />
                ))}
            </div>
        </div>
    );
};

export default Prescription;

