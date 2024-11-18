import React, { useContext, useEffect, useState } from 'react';
import Headline from '../../../Components/Headline';
import { AuthContext } from '../../../Provider/AuthContext';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoEyeSharp } from 'react-icons/io5';
import { MdAutoDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';


const image_hosting = '39cd3de230380fc39b116f0d1af689bd';
const image_hosting_key = `https://api.imgbb.com/1/upload?key=${image_hosting}`;

const Medicines = () => {

    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [Category, setCategory] = useState([]);
    const { user, allMedicine, getAllMedicine, setAllMedicine } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        generic: '',
        description: '',
        category: 'Medicine',
        company: 'Square Pharmaceuticals Ltd.',
        unit: '',
        price: '',
        discount: '',
        seller: 'curehub@gmai.com',
        photo: '',
    });

    const clearFormData = () => {
        setFormData({
            name: '',
            generic: '',
            description: '',
            category: 'Medicine',
            company: 'Square Pharmaceuticals Ltd.',
            unit: '',
            price: '',
            discount: '',
            seller: 'curehub@gmai.com',
            photo: '',
        });
    };
    console.log(formData);
    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/category')
            .then(res => res.json())
            .then(data => setCategory(data))
    }, [])
    console.log(Category)

    const handleUpload = async (event) => {
        const selectedFile = event.target.files[0];
        try {
            const uploadData = new FormData();
            uploadData.append("image", selectedFile);

            const response = await axios.post(image_hosting_key, uploadData);

            if (response.status === 200) {
                const imageUrl = response.data.data.url;
                setFormData((prevState) => ({ ...prevState, photo: imageUrl }));
                console.log("Image uploaded successfully:", imageUrl);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://cure-hub-backend-gules.vercel.app/medicine', formData);
            console.log(response.data);
            const newmedicine = response?.data;
            // Update medicineData with the new medicine
            // setAllMedicine((prevData) => [...prevData, newmedicine]);

            getAllMedicine();

            setOpenAdd(false);
            clearFormData();  // Clear the form data after submission
            Swal.fire({
                title: 'Success!',
                text: 'Medicine added successfully!',
                background: '#008080',
                confirmButtonText: 'OK',
                icon: 'success',
                color: 'white'
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectMedicine = (medicine) => {
        // Add medicine to cart logic
        console.log('Selected medicine:', medicine);
    };


    const handleViewDetails = (medicine) => {
        setSelectedMedicine(medicine);
    };

    const handleCloseModal = () => {
        setSelectedMedicine(null);
    };

    const handleModal = () => {
        setSelectedMedicine(null);
        setOpenAdd(false);
    }
    const handleAdd = () => {
        setOpenAdd(true);
    }

    const handleDelete = async (medicine) => {
        try {
            // Show confirmation popup
            const result = await Swal.fire({
                title: "Are you sure?",
                text: `You won't be able to revert this!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!",
                background: '#006666',
                color: 'white'
            });
    
            if (result.isConfirmed) {
                // Proceed with deletion
                const response = await fetch(`https://cure-hub-backend-gules.vercel.app/medicine/${medicine._id}`, {
                    method: "DELETE",
                });
    
                if (response.ok) {
                    // Success message
                    Swal.fire({
                        // "Deleted!", "The medicine has been deleted.", "success"
                        title: 'Deleted!',
                        text: 'The medicine has been deleted.',
                        icon: 'success',
                        background: '#006666',
                        color: 'white'
                    });
                    getAllMedicine(); // Refresh the medicine list
                } else {
                    // Show error if API fails
                    const errorMessage = await response.text();
                    // Swal.fire("Error!", `Failed to delete medicine: ${errorMessage}`, "error");
                    Swal.fire({
                        title: 'Eror!',
                        text: `Failed to delete medicine: ${errorMessage}`,
                        icon: 'error',
                        background: '#006666',
                        color: 'white'
                    });
                }
            } else {
                // Canceled action
                // Swal.fire("Cancelled", "Your medicine data is safe :)", "info");
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Your medicine data is safe :)',
                    icon: 'info',
                    background: '#006666',
                    color: 'white'
                });
            }
        } catch (error) {
            console.error("Error deleting medicine:", error);
            Swal.fire("Error!", "An unexpected error occurred.", "error");
        }
    };
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate the total number of pages
    const totalPages = Math.ceil(allMedicine?.length / itemsPerPage);

    // Get the current items for the page
    const currentItems = allMedicine?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto pb-10 px-4 sm:px-6 lg:px-8 pt-20">
            {/* <h2 className="text-3xl font-bold mb-6 text-center">Shop</h2> */}
            {/* <Headline headline={'Medicine'} /> */}
            <div className='text-white flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                <div className='mb-4 sm:mb-0'>
                    {/* <h2><span className='text-[#ebee48] font-bold'>Seller Name :</span> {user?.displayName} </h2> */}
                    <p className='text-gray-700 text-xl font-bold'>Total Number of Medicine : {allMedicine?.length}</p>
                </div>
                <button
                    onClick={handleAdd}
                    className='bg-[#2ab6c0] w-full sm:w-[140px] py-2 rounded-lg shadow-lg text-black'
                >Add Medicine</button>
            </div>
            <div className="overflow-x-auto mt-4 bg-gray-300 rounded-lg">
                <table className="w-full ">
                    <thead className='bg-gray-600 h-[60px] text-white'>
                        <tr>
                        <th className='px-2 py-2 text-left'>SL/No</th>
                            <th className='px-2 py-2 text-left'>Image</th>
                            <th className='px-2 py-2 text-left'>Name</th>
                            <th className='px-2 py-2 text-left'>Generic Name</th>
                            <th className='px-2 py-2 text-left'>Category</th>
                            <th className='px-2 py-2 text-left'>Company</th>
                            <th className='px-2 py-2 text-left'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='p-4' >
                        {currentItems?.map((medicine, index) => (
                            <tr key={medicine.id} className=' p-4'>
                                <td className=' py-2 px-4'>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td className=' py-2 px-2'>
                                    <img className='w-[50px] h-[50px] rounded-full' src={medicine.photo} alt="" />
                                </td>
                                <td className=' py-2 px-2'>{medicine.name}</td>
                                <td className='py-2 px-2'>{medicine.generic}</td>
                                <td className='py-2 px-2'>{medicine.category}</td>
                                <td className='py-2 px-2'>{medicine.company}</td>
                                <td className='py-2 px-2 flex justify-center items-center'>
                                    <button onClick={() => handleViewDetails(medicine)} className=" text-[#279b9b] text-2xl py-2 px-2 rounded-md"><IoEyeSharp /></button>

                                    <button onClick={() => handleViewDetails(medicine)} className=" text-[#8f8d1b] text-2xl py-2 px-2 rounded-md"><FaEdit /></button>

                                    <button onClick={() => handleDelete(medicine)} className=" text-[#d71c1c] text-2xl py-2 px-2 rounded-md"><MdAutoDelete /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <thead className='bg-gray-600 h-[60px] text-white'>
                        <tr>
                        <th className='px-2 py-2 text-left'></th>
                            <th className='px-2 py-2 text-left'></th>
                            <th className='px-2 py-2 text-left'></th>
                            <th className='px-2 py-2 text-left'></th>
                            <th className='px-2 py-2 text-left'></th>
                            <th className='px-2 py-2 text-left'></th>
                            <th className='px-2 py-2 text-left'></th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="flex lg:bottom-10 lg:left-1/2 justify-center mt-4">
                <nav className="block">
                    <ul className="flex pl-0 rounded list-none flex-wrap">
                        {Array.from({ length: totalPages }, (_, index) => {
                            if (totalPages <= 5 || index < 2 || index >= totalPages - 2 || Math.abs(index + 1 - currentPage) <= 1) {
                                return (
                                    <li key={index} className="page-item">
                                        <button
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`page-link relative block py-1.5 px-3 leading-tight text-gray-800  ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                );
                            } else if (index === 2 || index === totalPages - 3) {
                                return <li key={index} className="page-item"> .  .  . </li>;
                            } else {
                                return null;
                            }
                        })}
                    </ul>
                </nav>
            </div>

            {selectedMedicine && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg relative w-full max-w-md mx-auto">
                        <button onClick={handleCloseModal} className="absolute top-2 right-2 p-2">&times;</button>
                        <h3 className="text-xl font-bold mb-2">{selectedMedicine.name}</h3>
                        <img src={selectedMedicine.photo} alt={selectedMedicine.name} className=" object-cover mb-4 h-[200px] w-[250px] mx-auto" />
                        <p>Company: {selectedMedicine.company}</p>
                        <p className="text-gray-700 font-bold">Price: {selectedMedicine.price}</p>
                        {/* <button
                            className='bg-[#ee3e3e] mt-2 p-2 rounded-lg px-4 text-white w-full sm:w-auto mx-auto'
                            onClick={handleModal}
                        >Close</button> */}
                    </div>
                </div>
            )}

            {
                openAdd && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-[#289e9e] p-4 rounded-lg px-6 w-full max-w-lg mx-auto relative">
                            <h2 className='mb-4 text-white text-xl font-bold'>Seller: {'CureHub'}</h2>
                            <form onSubmit={handleSubmit} className="">
                                <div className="mb-4 relative flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder='Medicine Name'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none bg-[#348391] focus:border-blue-500 text-white" />
                                    <input
                                        type="text"
                                        id="generic"
                                        name="generic"
                                        value={formData.generic}
                                        onChange={handleChange}
                                        placeholder='generic name'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-[#348391] text-white" />
                                </div>
                                <div className="mb-4 relative">
                                    <input
                                        type="file"
                                        id="photo"
                                        name="photo"
                                        accept="image/*"
                                        onChange={handleUpload}
                                        placeholder='Photo'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-[#348391] text-white" />
                                </div>
                                <div className="mb-4 relative">
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder='Description'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-[#348391] text-white"
                                    />
                                </div>
                                <div className="mb-4 relative flex flex-row gap-2">
                                    <div className='flex-1'>
                                        <label>Category</label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            placeholder='Category'
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-[#348391] text-white">
                                            {
                                                Category.map((item) => <option
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </option>)
                                            }
                                        </select>
                                    </div>
                                    <div className='flex-1'>
                                        <label>Company</label>
                                        <select
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder='Company'
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-[#348391] text-white">
                                            <option value="Square Pharmaceuticals Ltd.">Square Pharmaceuticals Ltd.</option>
                                            <option value="Beximco Pharmaceuticals Ltd.">Beximco Pharmaceuticals Ltd.</option>
                                            <option value="Incepta Pharmaceuticals Ltd.">Incepta Pharmaceuticals Ltd.</option>
                                            <option value="Renata Limited">Renata Limited</option>
                                            <option value="ACME Laboratories Ltd.">ACME Laboratories Ltd.</option>
                                            <option value="Eskayef Pharmaceuticals Ltd. (SK+F)">Eskayef Pharmaceuticals Ltd. (SK+F)</option>
                                            <option value="Aristopharma Ltd.">Aristopharma Ltd.</option>
                                            <option value="ACI Limited">ACI Limited</option>
                                            <option value="Opsonin Pharma Ltd.">Opsonin Pharma Ltd.</option>
                                            <option value="General Pharmaceuticals Ltd. (GPL)">General Pharmaceuticals Ltd. (GPL)</option>
                                            <option value="Pfizer Inc">Pfizer Inc</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-4 relative flex flex-row gap-2">
                                    <input
                                        type="number"
                                        id="unit"
                                        name="unit"
                                        value={formData.unit}
                                        onChange={handleChange}
                                        placeholder='Mass Unit'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-[#348391] text-white" />
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder='Per Unit Price'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-[#348391] text-white" />
                                    <input
                                        type="number"
                                        id="discount"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        placeholder='Discount'
                                        // defaultValue='0'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-[#348391] text-white" />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-[#b9900b] text-white py-2 mt-4 flex items-center justify-center px-5 rounded-md hover:bg-green-800 w-full sm:w-auto">Add
                                </button>
                            </form>
                            <button
                                className='bg-[#ee3e3e] mt-2 p-2 rounded-lg px-4 text-white w-full sm:w-auto mx-auto absolute right-4 bottom-4'
                                onClick={handleModal}
                            >Close</button>
                        </div>
                    </div>
                )
            }
        </div>

    );
};

export default Medicines;