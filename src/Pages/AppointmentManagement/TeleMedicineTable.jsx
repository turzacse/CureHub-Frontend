import React, { useState } from 'react';

const TeleMedicineTable = ({ allTelemedicineAppointment }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        doctor: '',
    });

    const handleAssignClick = (appointment) => {
        setSelectedAppointment(appointment);
        setFormData({
            date: '',
            time: '',
            doctor: '',
        });
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted with data:', formData);
        handleModalClose();
    };

    return (
        <div>
            <div className="md:mt-20 mt-10 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                SL
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Patient Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Requested Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {allTelemedicineAppointment?.map((appointment, index) => (
                            <tr key={appointment._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment?.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment.phone}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        className='btn btn-sm btn-warning'
                                        onClick={() => handleAssignClick(appointment)}
                                    >
                                        Assign
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-gray-300  rounded-lg shadow-lg max-w-lg w-full">
                        <div className="px-4 py-5 sm:px-6 bg-gray-800 text-white">
                            <h3 className="text-lg leading-6 font-medium">
                                Assign Telemedicine Appointment
                            </h3>
                        </div>
                        <div className="px-6">
                            <p><strong>Patient Name:</strong> {selectedAppointment?.name}</p>
                            <p><strong>Requested Date:</strong> {selectedAppointment?.date}</p>
                            <p><strong>Phone:</strong> {selectedAppointment?.phone}</p>
                            {/* Add more details here as needed */}
                        </div>
                        <form className='p-6' onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                    Set Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={selectedAppointment?.date ||formData.date}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                                    Set Time
                                </label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                                    Select Doctor
                                </label>
                                <select
                                    id="doctor"
                                    name="doctor"
                                    value={formData.doctor}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                    required
                                >
                                    <option value="">Select a doctor</option>
                                    {/* Add doctor options here */}
                                    <option value="doctor1">Dr. Siam</option>
                                    <option value="doctor2">Dr. Maria</option>
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="bg-red-600 text-white py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeleMedicineTable;
