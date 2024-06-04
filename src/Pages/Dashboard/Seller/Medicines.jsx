import React, { useContext, useState } from 'react';
import Headline from '../../../Components/Headline';
import { AuthContext } from '../../../Provider/AuthContext';
import { NavLink } from 'react-router-dom';


const medicinesData = [
    {
        id: 1,
        name: 'Paracetamol',
        genericName: 'Acetaminophen ',
        description: 'Description for Medicine 1',
        image: 'https://via.placeholder.com/150',
        category: 'Tablet',
        company: 'SK',
        unit: 10,
        price: 2,
        discount: 2,
    },
    {
        id: 2,
        name: 'Paracetamol',
        genericName: 'Acetaminophen ',
        description: 'Description for Medicine 1',
        image: 'https://via.placeholder.com/150',
        category: 'Tablet',
        company: 'SK',
        unit: 10,
        price: 2,
        discount: 2,
    },
    {
        id: 3,
        name: 'Paracetamol',
        genericName: 'Acetaminophen ',
        description: 'Description for Medicine 1',
        image: 'https://via.placeholder.com/150',
        category: 'Tablet',
        company: 'SK',
        unit: 10,
        price: 2,
        discount: 2,
    }
];

const Medicines = () => {

    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        genericName: '',
        description: '',
        price: '',
    });

    const handleSelectMedicine = (medicine) => {
        // Add medicine to cart logic
        console.log('Selected medicine:', medicine);
    };
    const { user } = useContext(AuthContext);

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
    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenAdd(false);   // need to update
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
        <div>
            <div className="container mx-auto pb-10">
                {/* <h2 className="text-3xl font-bold mb-6 text-center">Shop</h2> */}
                <Headline headline={'Medicine'} />
                <div className='text-white flex justify-between items-center'>
                    <div>
                        <h2><span className='text-[#ebee48] font-bold'>Seller Name :</span> {user?.displayName} </h2>
                        <p>Total Medicine : {medicinesData.length}</p>
                    </div>
                    <button
                        onClick={handleAdd}
                        className='bg-[#2ab6c0] w-[140px] py-2 rounded-lg shadow-lg text-black'
                    >Add Medicine</button>
                </div>
                <table className="w-full mt-4 border">
                    <thead className=''>
                        <tr>
                            <th>Name</th>
                            <th>Generic Name</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicinesData.map(medicine => (
                            <tr key={medicine.id}
                                className=''
                            >
                                <td className='pl-4'>{medicine.name}</td>
                                <td>{medicine.genericName}</td>
                                <td>{medicine.category}</td>
                                <td>{medicine.company}</td>
                                <td>
                                    <button onClick={() => handleViewDetails(medicine)} className="bg-gray-500 text-white py-2 px-4 rounded-md">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedMedicine && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-lg">
                            <button onClick={handleCloseModal} className="absolute top-0 right-0 p-2">&times;</button>
                            <h3 className="text-xl font-bold mb-2">{selectedMedicine.name}</h3>
                            <img src={selectedMedicine.image} alt={selectedMedicine.name} className="w-64 h-64 object-cover mb-4" />
                            <p>{selectedMedicine.genericName}</p>
                            <p className="text-gray-700 font-bold">Price: {selectedMedicine.price}</p>
                            <button
                                className='bg-[#ee3e3e] mt-2 p-2 rounded-lg px-4 text-white w-[80px] mx-auto'
                                onClick={handleModal}
                            >Close</button>
                        </div>

                    </div>
                )}

                {
                    openAdd && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
                            <div className=" p-4 rounded-lg px-10 w-1/2 bg-[#289e9e] relative">
                                <h2 className='mb-4'>Seller: {user.displayName}</h2>
                                <form onSubmit={handleSubmit} className="">
                                    <div className="mb-4 relative">
                                        {/* <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label> */}
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder='Medicibe Name'
                                            className="w-full px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                        {/* <FaUser className='absolute top-2 left-1 text-xl text-gray-600' /> */}
                                    </div>
                                    <div className="mb-4 relative">
                                        {/* <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label> */}
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder='Email'
                                            className="w-full px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                        {/* <MdEmail className='absolute top-[10px] left-1 text-2xl text-gray-600' /> */}
                                    </div>
                                    <div className="mb-4 relative">
                                        {/* <label htmlFor="photo" className="block text-gray-700 font-semibold mb-2">Photo</label> */}
                                        <input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            accept="image/*"
                                            onChange={handleChange}
                                            placeholder='Photo'
                                            className="w-full px-8 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                        {/* <FaRegImage className='absolute top-[12px] left-1 text-2xl text-gray-600' /> */}
                                    </div>
                                    <div className="mb-4 relative">
                                        {/* <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label> */}
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder='Passwoard'
                                            className="w-full px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                        {/* <RiLockPasswordFill className='absolute top-[8px] left-1 text-2xl text-gray-600' /> */}
                                    </div>
                                    <div className="mb-4 relative">
                                        {/* <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">Role</label> */}
                                        <select
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            placeholder='Role'
                                            className="w-full px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                                            <option value="user">User</option>
                                            <option value="seller">Seller</option>
                                        </select>
                                        {/* <BsFillPeopleFill className='absolute top-[8px] left-1 text-2xl text-gray-600' /> */}
                                    </div>
                                    {/* <div>
                                        Already have an account? <NavLink to='/sign-in'>Sign In</NavLink>
                                    </div> */}
                                    <button
                                        type="submit"
                                        className="bg-[#67269c] text-white py-2 mt-4 flex items-center justify-center px-5 rounded-md hover:bg-green-800 w-[80px] ">Add
                                    </button>
                                </form>
                                <button
                                    className='bg-[#ee3e3e] mt-2 p-2 rounded-lg px-4 text-white w-[80px] mx-auto absolute right-10 bottom-4 '
                                    onClick={handleModal}
                                >Close</button>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Medicines;