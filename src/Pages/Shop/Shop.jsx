import React, { useContext, useEffect, useState } from 'react';
import Headline from '../../Components/Headline';
import { FaCartArrowDown, FaEye, FaShoppingCart } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { TbCoinTakaFilled } from 'react-icons/tb';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { AuthContext } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';




const ShopPage = () => {
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const { user } = useContext(AuthContext);

    console.log(user?.email);

    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/medicine')
            .then(res => res.json())
            .then(data => setMedicines(data))
    }, []);

    // const handleSelectMedicine = (medicine) => {
    //     // Add medicine to cart logic
    //     console.log('Selected medicine:', medicine);
    // };

    const handleViewDetails = (medicine) => {
        setSelectedMedicine(medicine);
    };

    const handleCloseModal = () => {
        setSelectedMedicine(null);
    };

    const handleSelectMedicine = (medicine) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to add ${medicine.name} to the cart?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            dangerMode: true,
            background: '#006666',
            color: 'white'
        }).then((result) => {
            if (result.isConfirmed) {
                // Send POST request to the API
                fetch('https://cure-hub-backend-gules.vercel.app/carts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        medicine_code: medicine._id,
                        buyer_email: user.email,
                        medicine: medicine.name,
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        Swal.fire({
                            title: 'Added',
                            text: `${medicine.name} has been added to your cart.`,
                            confirmButtonText: 'Ok',
                            background: '#006666',
                            color: 'white'
                        });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        Swal.fire('Error!', 'There was an issue adding the medicine to your cart.', 'error');
                    });
            }
        });
    };
    return (
        // <div className=" mx-auto py-5 pb-10">
        //     <Headline headline='SHOP' />
        //     <table className="md:w-2/3 w-4/5 mx-auto table">
        //         <thead>
        //             <tr className='text-center text-white'>
        //                 <th>Medicine</th>
        //                 <th>Price</th>
        //                 <th>Actions</th>
        //             </tr>
        //         </thead>

        //         <tbody>
        //             {medicines?.map(medicine => (
        //                 <tr className='text-center' key={medicine.id}>
        //                     <td className='text-[#d5df4b] font-bold'>{medicine.name}</td>
        //                     <td className='flex justify-center items-center gap-1 text-[#fff]'><TbCoinTakaFilled />{medicine.price}</td>
        //                     <td>
        //                         <button onClick={() => handleSelectMedicine(medicine)} className="bg-[#1a9e46] text-white py-2 px-4 rounded-md mr-2"><AiOutlineShoppingCart /></button>
        //                         <button onClick={() => handleViewDetails(medicine)} className="bg-[#bd2121] text-white py-2 px-4 rounded-md"><FaEye /></button>
        //                     </td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        //     {selectedMedicine && (
        //         <div>
        //             <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        //                 <div className="bg-white p-4 w-1/2 rounded-lg">
        //                     <div className='flex justify-between'>
        //                         <h3 className="text-xl font-bold mb-2">{selectedMedicine.name}</h3>
        //                         <button onClick={handleCloseModal} className="text-4xl text-red-600"><IoMdCloseCircleOutline /></button>

        //                     </div>
        //                     <img src={selectedMedicine.photo} alt={selectedMedicine.name} className="w-64 h-64 object-cover mb-4" />
        //                     <p>{selectedMedicine.description}</p>
        //                     <p className="text-gray-700 font-bold">{selectedMedicine.price}TK</p>
        //                 </div>

        //             </div>

        //         </div>
        //     )}
        // </div>

        <div className="">
            <section className="text-center py-16 bg-blue-100">
                <h1 className="text-4xl font-bold mb-4">Your Trusted Online Pharmacy</h1>
                <p className="text-xl mb-6">Find and purchase the medications you need with ease and convenience.</p>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Shop Now</button>
            </section>
            <div className="">

                {/* Hero Section */}


                {/* Search and Filter Section */}
                <div className="py-20 ">
                    <section className="lg:container lg:mx-auto mx-4 flex justify-between items-center">
                        <input type="text" placeholder="Search for medicines..." className="form-input p-2 rounded-lg w-full md:w-1/3" />
                        <div className="flex gap-4 ml-4">
                            <select className="form-select p-2 rounded-lg">
                                <option>Category</option>
                                <option>Prescription</option>
                                <option>Over-the-Counter</option>
                                <option>Supplements</option>
                            </select>
                            <select className="form-select p-2 rounded-lg">
                                <option>Price Range</option>
                                <option>$0 - $10</option>
                                <option>$10 - $50</option>
                                <option>$50 - $100</option>
                                <option>$100+</option>
                            </select>
                            <select className="form-select p-2 rounded-lg">
                                <option>Brand</option>
                                <option>Brand A</option>
                                <option>Brand B</option>
                                <option>Brand C</option>
                            </select>
                        </div>
                    </section>
                </div>

                {/* Featured Products */}
                <div className="bg-gray-400 py-20">
                    <section className=" lg:container lg:mx-auto mx-4">
                        {/* <h2 className="text-2xl font-bold mb-4">Featured Products</h2> */}

                        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                            {
                                medicines?.map((medicine) => <div key={medicine._id} className="bg-gray-300 p-4 rounded-lg shadow-md">
                                    <img src={medicine.photo} alt="Product Name" className="w-[100px] h-[100px] object-cover " />
                                    <h3 className="text-lg font-bold mt-4">{medicine.name}</h3>
                                    <div className="flex justify-between">
                                        <p className="text-gray-700">TK{medicine.price}</p>
                                        <button className="bg-gray-200 hover:bg-gray-300 text-white font-bold py-1 px-2 rounded "><FaCartArrowDown className='text-red-500' /></button>
                                    </div>
                                </div>)
                            }
                            {/* Example Product */}

                            {/* Repeat for more products */}
                        </div>
                    </section>
                </div>


                {/* Categories */}
                {/* <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Categories</h2>
                    <div className="flex flex-wrap gap-4">
                     
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full md:w-1/4 text-center">
                            <h3 className="text-lg font-bold">Pain Relief</h3>
                            <p className="text-gray-700">Find relief from pain with our range of products.</p>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">Shop Now</button>
                        </div>
                       
                    </div>
                </section> */}

                {/* Promotions and Discounts */}

                {/* <section className="mt-12 bg-yellow-100 p-8 rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Special Promotions</h2>
                    <p className="text-lg mb-6">Get up to 50% off on selected items!</p>
                    <button
                        onClick={() => {
                            setOffersModalVisible(true);
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">View Offers</button>
                </section> */}

                {/* Customer Testimonials */}
                {/* <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Customer Testimonials</h2>
                    <div className="flex flex-wrap gap-4">
                    
                        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
                            <p className="text-gray-700 italic">"Excellent service and fast delivery. Highly recommend!"</p>
                            <p className="text-gray-900 font-bold mt-4">- Jane Doe</p>
                        </div>
                  
                    </div>
                </section> */}
            </div>

        </div>
    );
};

export default ShopPage;
