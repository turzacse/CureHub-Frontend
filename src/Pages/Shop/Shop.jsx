import React, { useContext, useEffect, useState } from 'react';
import Headline from '../../Components/Headline';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
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
        <div className=" mx-auto py-5 pb-10">
            <Headline headline='SHOP' />
            <table className="md:w-2/3 w-4/5 mx-auto table">
                <thead>
                    <tr className='text-center text-white'>
                        <th>Medicine</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {medicines?.map(medicine => (
                        <tr className='text-center' key={medicine.id}>
                            <td className='text-[#d5df4b] font-bold'>{medicine.name}</td>
                            <td className='flex justify-center items-center gap-1 text-[#fff]'><TbCoinTakaFilled />{medicine.price}</td>
                            <td>
                                <button onClick={() => handleSelectMedicine(medicine)} className="bg-[#1a9e46] text-white py-2 px-4 rounded-md mr-2"><AiOutlineShoppingCart /></button>
                                <button onClick={() => handleViewDetails(medicine)} className="bg-[#bd2121] text-white py-2 px-4 rounded-md"><FaEye /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedMedicine && (
                <div>
                    <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 w-1/2 rounded-lg">
                            <div className='flex justify-between'>
                                <h3 className="text-xl font-bold mb-2">{selectedMedicine.name}</h3>
                                <button onClick={handleCloseModal} className="text-4xl text-red-600"><IoMdCloseCircleOutline /></button>

                            </div>
                            <img src={selectedMedicine.photo} alt={selectedMedicine.name} className="w-64 h-64 object-cover mb-4" />
                            <p>{selectedMedicine.description}</p>
                            <p className="text-gray-700 font-bold">{selectedMedicine.price}TK</p>
                        </div>

                    </div>

                </div>
            )}
        </div>
    );
};

export default ShopPage;
