import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthContext';
import { NavLink, useLocation } from 'react-router-dom';
import Heading from '../../../Components/PageHeading/Heading';
import { FaRegEye } from 'react-icons/fa';
import CTADoctor from '../../Home/CTA2';
import MedicineAdCTA from '../../Home/CTA3';
import OfferSection from '../../Home/OfferSection';
import VideoCall from '../../../Components/VideoCall/VideoCall';



const Defaultuser = () => {
    const { user } = useContext(AuthContext);
    const [currentuser, setCurrentUser] = useState();
    const [isOffersModalVisible, setOffersModalVisible] = useState(false);
    const [telemedicineBooking, setTelemedicineBooking] = useState();
    const [file, setFile] = useState(null);
    const {usersAppoitment} = useContext(AuthContext);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle file upload logic here
        console.log('File uploaded:', file);
        closeModal();
    };

    const location = useLocation();
    const handleViewOffersClick = () => {
        setOffersModalVisible(true);
    };

    const handleCloseOffersModal = () => {
        setOffersModalVisible(false);
    };

    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                const cureHubUser = data?.find((item) => item?.email === user?.email);
                setCurrentUser(cureHubUser);
            })
    }, []);

    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/telemedicine-appoinment')
            .then(res => res.json())
            .then(data => {
                const booking = data?.filter((item) => item?.cureHubUser == currentuser?._id);
                setTelemedicineBooking(booking);
            })
    }, [currentuser]);


    const OffersModal = ({ isVisible, onClose }) => {
        if (!isVisible) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-gray-400 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4">Upload Your Medical Records</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Choose a file</label>
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                accept="image/*"
                                onChange={handleFileChange}
                                placeholder='Upload your file'
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded-md"
                            >
                                Upload
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        );
    };


    return (
        <div>
            <Heading title='Dashboard' subtitle='Manage your appointments, health records, and more.' ></Heading>
            <div className="">

                <section className='text-white'>
                    <div className='my-10 lg:container lg:mx-auto mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 '>
                        <div className=' bg-gradient-to-r from-[#7870c0] to-[#5449bb] h-[200px] rounded-lg shandow flex flex-col justify-center items-center'>

                            <h2 className='text-xl font-bold'>MemeberShip</h2>
                            <p className='text-lg font-semibold'>No Plan Yet</p>
                            <p></p>
                        </div>
                        <div className='bg-gradient-to-r from-teal-400 to-blue-500 h-[200px] rounded-lg shandow flex flex-col justify-center items-center'>

                            <h2 className='text-xl font-bold'>Appointment / Telemedicine</h2>
                            <p className='text-lg font-semibold'>{usersAppoitment?.length} / 1</p>
                        </div>
                        <div className='bg-gradient-to-r from-orange-400 to-yellow-500 h-[200px] rounded-lg shandow flex flex-col justify-center items-center'>

                            <h2 className='text-xl font-bold'>Cart</h2>
                            <p className='text-lg font-semibold'>5</p>

                        </div>
                        <div className='bg-gradient-to-r from-pink-400 to-red-400 h-[200px] rounded-lg shandow flex flex-col justify-center items-center'>

                            <h2 className='text-xl font-bold'>Due Payment</h2>
                            <p className='text-lg font-semibold'>2</p>

                        </div>
                    </div>
                </section>
                
                
                
                <div className="flex justify-center my-8">
                    <NavLink
                        to='/membership-plan'
                        className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 focus:outline-none">
                        Choose Your Membership Plan
                    </NavLink>
                </div>

                <div className="bg-gray-100 p-6 mt-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Upload Your Medical Records</h2>
                    <p className="text-gray-700 mb-6">
                        Upload your medical records and our experts will analyze them to provide you with valuable feedback.
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                setOffersModalVisible(true);
                            }}
                            className="bg-green-600 text-white px-6 py-3 rounded-md shadow hover:bg-green-700 focus:outline-none">
                            Upload Medical Records
                        </button>
                        <OffersModal isVisible={isOffersModalVisible} onClose={handleCloseOffersModal} />
                    </div>
                </div>
                {/* <VideoCall/> */}

                {/* <section>
                    <CTADoctor/>
                    <OfferSection/>
                    <MedicineAdCTA/>
                    
                </section> */}
            </div>
        </div>
    );
};

export default Defaultuser;