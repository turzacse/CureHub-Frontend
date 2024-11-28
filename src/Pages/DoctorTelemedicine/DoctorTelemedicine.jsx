



import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import { CiNoWaitingSign } from "react-icons/ci";
import { IoSendSharp } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { GoEyeClosed } from "react-icons/go";

const DoctorTelemedicine = () => {
    const { curehubUser, allDoctors } = useContext(AuthContext);
    const [doctorsTele, setDoctorTele] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [errorMessage, setErrorMessage] = useState('')
    const [formData, setFormData] = useState({
        meetLink: "",
        confirmMeetLink: "",
    });
    const [selectedAppointment, setSelectedAppointment] = useState();
    const [isComplete, setIsComplete] = useState(false);
    const [ongoingTelemedicine, setOngoingTelemedicine] = useState([]);
    const [completeTelemedicine, setCompleteTelemedicine] = useState([]);
    const [tableData, setTableData] = useState([]);

    const fetchData = async (id) => {
        if (curehubUser) {
            const response = await axios.get(
                `https://cure-hub-backend-gules.vercel.app/telemedicine-appointment/doctor/${id}`
            );
            setDoctorTele(response?.data);
            const appointment = response?.data;
            const data1 = appointment?.filter((item) => item?.status === 'Completed')

            setCompleteTelemedicine(data1);

            const data2 = appointment?.filter((item) => item?.status !== 'Completed')

            setOngoingTelemedicine(data2);
            setTableData(data2)
        }
    };

    useEffect(() => {
        const data = allDoctors?.find((item) => item?.userID === curehubUser?._id);
        fetchData(data?._id);
    }, [allDoctors, curehubUser]);

    const handleSetMeeting = (appointment) => {
        setIsModalOpen(true); // Open the modal
        setSelectedAppointment(appointment);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { meetLink, confirmMeetLink } = formData;
        const meetLinkPattern = /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;

        // Validation: Check if meetLink matches confirmMeetLink
        if (meetLink !== confirmMeetLink) {
            setErrorMessage("Meet Link and Confirm Meet Link do not match!");
            return;
        }

        // Validation: Check if meetLink matches the required pattern
        if (!meetLinkPattern.test(meetLink)) {
            setErrorMessage(
                "Invalid Meet Link! Please provide a valid Google Meet link in the format 'https://meet.google.com/xxx-xxxx-xxx'."
            );
            return;
        }

        // If validation passes, proceed to update via PUT request
        try {
            Swal.fire({
                title: "Updating...",
                text: "Please wait while we update the meeting link.",
                icon: "info",
                background: "#006666",
                color: "#ffffff",
                showConfirmButton: false,
                timer: 2000,
            });

            const response = await axios.put(
                `https://cure-hub-backend-gules.vercel.app/telemedicine-appointment/meet/${selectedAppointment?._id}`,
                { meetLink }
            );

            if (response.status === 200) {
                fetchData();
                Swal.fire({
                    title: "Success!",
                    text: "Meeting link updated successfully.",
                    icon: "success",
                    background: "#006666",
                    color: "#ffffff",
                });
                console.log("Form Data:", formData);
                setIsModalOpen(false);
                setSelectedAppointment(null)
                setFormData({ meetLink: "", confirmMeetLink: "" });
                setErrorMessage(""); // Clear any previous error messages
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update meeting link. Please try again.",
                    icon: "error",
                    background: "#006666",
                    color: "#ffffff",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "An error occurred while updating the meeting link. Please try again.",
                icon: "error",
                background: "#006666",
                color: "#ffffff",
            });
            console.error("Error updating meeting link:", error);
        }
    };

    const handleComplete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Telemedicine Appointment will be marked as completed!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'dark', // Confirm button background color
            cancelButtonColor: '#d33', // Cancel button background color
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            background: '#006666', // Modal background color
            color: 'white', // Text color
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.put(
                        `https://cure-hub-backend-gules.vercel.app/telemedicine-appointment/complete/${id}`
                    );

                    // Show success message if the API call succeeds
                    Swal.fire({
                        title: 'Success!',
                        text: 'The Telemedicine Appointment has been marked as completed.',
                        icon: 'success',
                        confirmButtonColor: '#006666',
                        background: '#006666',
                        color: 'white',
                    });
                    fetchData();
                } catch (error) {
                    // Show error message if the API call fails
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong. Please try again later.',
                        icon: 'error',
                        confirmButtonColor: '#006666',
                        background: '#006666',
                        color: 'white',
                    });
                    console.error('Error completing the appointment:', error);
                }
            }
        });
    };

    const handleFilter = () => {
        setIsComplete(!isComplete);

    }

    useEffect(() => {
        if (isComplete) {
            setTableData(completeTelemedicine);
        }
        else {
            setTableData(ongoingTelemedicine);
        }
    }, [completeTelemedicine, ongoingTelemedicine, isComplete])

    console.log(completeTelemedicine, ongoingTelemedicine, tableData);

    return (
        <div className="p-4">
            <div className="flex items-center mt-5 justify-between">
                <h2 className="text-xl font-bold text-yellow-800  uppercase">
                    Telemedicine Appointment
                </h2>

                <button
                    onClick={() => {
                        handleFilter();
                    }}
                    className="btn bg-[#3B82F6] hover:bg-[#2b66c5] btn-sm w-[120px] text-white border-none uppercase">
                    {
                        isComplete ? 'Ongoing' : 'Complete'
                    }
                </button>
            </div>

            <section className="md:mt-5 mt-2 overflow-x-auto text-[10px] md:text-[16px]">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                SL
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Date&Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Meeting
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>


                    <tbody className="bg-gray-300 text-black divide-y divide-gray-200">
                        {tableData?.map((appointment, index) => (
                            <tr key={appointment._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment?.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment?.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {appointment?.date} <br />{" "}
                                    {appointment?.appointments[0]?.appointmentTime}{" "}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap uppercase">
                                    {appointment?.status}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex gap-2">
                                        {
                                            appointment?.meetLink ? <NavLink
                                                to={`${appointment?.meetLink}`}
                                                className="btn btn-sm btn-warning text-gray-600 uppercase"
                                                target="_blank"
                                                rel="noopener noreferrer" external links
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const meetingWindow = window.open(appointment?.meetLink, "_blank");
                                                    if (!meetingWindow) {
                                                        alert("Please allow popups for this website to open the meeting link.");
                                                    }
                                                }}
                                            >
                                                Join Meeting
                                            </NavLink>

                                                :
                                                (
                                                    appointment?.status == 'Completed' ? <button
                                                        className="btn btn-sm btn-success text-gray-100 uppercase">
                                                        <FaCircleCheck />
                                                    </button>
                                                        :
                                                        <button
                                                            className="btn btn-sm btn-success text-gray-200 uppercase"
                                                            onClick={() => handleSetMeeting(appointment)}
                                                        >
                                                            Set Meeting
                                                        </button>
                                                )
                                        }
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    {
                                        !appointment?.meetLink ?
                                            (
                                                appointment?.status == 'Completed' ?
                                                    <button
                                                        className="btn btn-sm btn-info  text-gray-100 uppercase">
                                                        <FaCircleCheck />
                                                    </button> :
                                                    <button
                                                        disabled
                                                        className="btn btn-sm btn-info  text-gray-100 uppercase">
                                                        <GoEyeClosed />
                                                    </button>
                                            )

                                            :
                                            <button
                                                onClick={() => {
                                                    handleComplete(appointment?._id)
                                                }}
                                                className="btn btn-sm btn-success text-gray-100 uppercase">
                                                <FaCircleCheck />
                                            </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>


                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                            <th className="px-6 py-3 h-[40px] text-left text-xs font-medium uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                </table>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-[90%] md:w-[400px]">
                        <h3 className="text-lg font-bold mb-4 text-center uppercase text-gray-700">
                            Set Meeting
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">
                                    Meet Link
                                </label>
                                <input
                                    type="text"
                                    name="meetLink"
                                    value={formData.meetLink}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 bg-gray-300 rounded-md"
                                    placeholder="Enter Meet Link"
                                    required
                                />
                            </div>
                            <div className="mb-0">
                                <label className="block text-sm font-medium mb-2">
                                    Confirm Meet Link
                                </label>
                                <input
                                    type="text"
                                    name="confirmMeetLink"
                                    value={formData.confirmMeetLink}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 bg-gray-300 rounded-md"
                                    placeholder="Confirm Meet Link"
                                    required
                                />
                            </div>
                            {errorMessage && <p className="text-red-600 text-[12px]">{errorMessage}</p>}
                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorTelemedicine;
