import React, { useContext, useEffect, useState } from 'react';
import Headline from '../../../Components/Headline';
import { AuthContext } from '../../../Provider/AuthContext';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoEyeSharp } from 'react-icons/io5';


const image_hosting = '39cd3de230380fc39b116f0d1af689bd';
const image_hosting_key = `https://api.imgbb.com/1/upload?key=${image_hosting}`;

const Medicines = () => {

    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [medicineData, setMedicineData] = useState([]);
    const [Category, setCategory] = useState([]);
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        generic: '',
        description: '',
        category: '',
        company: '',
        unit: '',
        price: '',
        discount: '0',
        seller: user?.email,
        photo: '',
    });

    const clearFormData = () => {
        setFormData({
            name: '',
            generic: '',
            description: '',
            category: '',
            company: '',
            unit: '',
            price: '',
            discount: '0',
            seller: user?.email,
            photo: '',
        });
    };
    console.log(formData);

    useEffect( () => {
        fetch('https://cure-hub-backend-gules.vercel.app/medicine')
        .then(res => res.json())
        .then(data => setMedicineData(data.filter((item) => item?.seller === user.email)))
    } ,[])
    useEffect( () => {
        fetch('https://cure-hub-backend-gules.vercel.app/category')
        .then(res => res.json())
        .then(data => setCategory(data))
    } ,[])
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
            setMedicineData((prevData) => [...prevData, newmedicine]);
    
            setOpenAdd(false);
            clearFormData();  // Clear the form data after submission
            Swal.fire({
                title: 'Success!',
                text: 'Medicine added successfully!',
                background: '#008080',
                confirmButtonText: 'OK',
                icon: 'success',
            });
        }
        catch(error){
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
   
    return (
        <div className="container mx-auto pb-10 px-4 sm:px-6 lg:px-8">
            {/* <h2 className="text-3xl font-bold mb-6 text-center">Shop</h2> */}
            <Headline headline={'Medicine'} />
            <div className='text-white flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                <div className='mb-4 sm:mb-0'>
                    <h2><span className='text-[#ebee48] font-bold'>Seller Name :</span> {user?.displayName} </h2>
                    <p>Total Medicine : {medicineData.length}</p>
                </div>
                <button
                    onClick={handleAdd}
                    className='bg-[#2ab6c0] w-full sm:w-[140px] py-2 rounded-lg shadow-lg text-black'
                >Add Medicine</button>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="w-full border">
                    <thead className=''>
                        <tr>
                            <th className='px-2 py-2 text-left'>Name</th>
                            <th className='px-2 py-2 text-left'>Generic Name</th>
                            <th className='px-2 py-2 text-left'>Category</th>
                            <th className='px-2 py-2 text-left'>Company</th>
                            <th className='px-2 py-2 text-left'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='' >
                        {medicineData.map(medicine => (
                            <tr key={medicine.id} className='border-t'>
                                <td className=' py-2'>{medicine.name}</td>
                                <td className='py-2'>{medicine.generic}</td>
                                <td className='py-2'>{medicine.category}</td>
                                <td className='py-2'>{medicine.company}</td>
                                <td className='py-2'>
                                    <button onClick={() => handleViewDetails(medicine)} className=" text-[#A6D71C] text-2xl py-2  rounded-md"><IoEyeSharp /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedMedicine && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg relative w-full max-w-md mx-auto">
                        <button onClick={handleCloseModal} className="absolute top-2 right-2 p-2">&times;</button>
                        <h3 className="text-xl font-bold mb-2">{selectedMedicine.name}</h3>
                        <img  src={selectedMedicine.photo} alt={selectedMedicine.name} className=" object-cover mb-4 h-[200px] w-[250px] mx-auto" />
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
                            <h2 className='mb-4'>Seller: {user.displayName}</h2>
                            <form onSubmit={handleSubmit} className="">
                                <div className="mb-4 relative flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder='Medicine Name'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                    <input
                                        type="text"
                                        id="generic"
                                        name="generic"
                                        value={formData.generic}
                                        onChange={handleChange}
                                        placeholder='Generic Name'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className="mb-4 relative">
                                    <input
                                        type="file"
                                        id="photo"
                                        name="photo"
                                        accept="image/*"
                                        onChange={handleUpload}
                                        placeholder='Photo'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className="mb-4 relative">
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder='Description'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500">
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
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                                            <option value="Pfizer Inc">Pfizer Inc</option>
                                            <option value="Johnson & Johnson">Johnson & Johnson</option>
                                            <option value="Roche Holding AG">Roche Holding AG</option>
                                            <option value="GlaxoSmithKline">GlaxoSmithKline</option>
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
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder='Per Unit Price'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                    <input
                                        type="number"
                                        id="discount"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        placeholder='Discount'
                                        defaultValue='0'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-[#67269c] text-white py-2 mt-4 flex items-center justify-center px-5 rounded-md hover:bg-green-800 w-full sm:w-auto">Add
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