import React, { useContext, useEffect, useState } from 'react';
import { FaCartArrowDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthContext';

const Promotion = ({ handleAddmedicine }) => {
    const [medicines, setMedicines] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const fetchMedicines = () => {
        fetch('https://cure-hub-backend-gules.vercel.app/medicine')
            .then(res => res.json())
            .then(data => {
                const shuffled = data.sort(() => 0.5 - Math.random());
                setMedicines(shuffled.slice(0, 6));
            });
    };
    useEffect(() => {
        fetchMedicines();
    }, []);


    return (
        <div>
            <div className="shopping-cart-container ">
                {/* Call-to-Action Buttons */}
                <div className="cta-buttons flex flex-col md:flex-row justify-between my-4">

                    <button className="proceed-checkout bg-green-500 text-white px-4 py-2 rounded-md mb-2 md:mb-0 md:mr-2 hover:bg-green-600">
                        Proceed to Checkout
                    </button>

                    <button
                        onClick={() => {
                            navigate('/shop')
                        }}
                        className="continue-shopping bg-blue-500 text-white px-4 py-2 rounded-md mb-2 md:mb-0 md:mr-2 hover:bg-blue-600">
                        Continue Shopping
                    </button>

                    {/* <button className="save-later bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                        Save for Later
                    </button> */}
                </div>

                {/* Suggested Products */}
                <div className="suggested-products my-8">
                    <h3 className="text-lg font-semibold mb-4">You May Also Like</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 gap-6">
                        {
                            medicines?.map((medicine) => <div key={medicine._id} className="bg-gray-300 p-4 rounded-lg shadow-md">
                                <img src={medicine.photo} alt="Product Name" className="w-[100px] h-[100px] object-cover " />
                                <h3 className="text-lg text-black font-bold mt-4">{medicine.name}</h3>
                                <div className="flex justify-between">
                                    <p className="text-gray-700">TK{medicine.price}</p>
                                    <button
                                        onClick={() => {
                                            handleAddmedicine(medicine)
                                        }}
                                        className="bg-gray-200 hover:bg-gray-300  font-bold py-1 px-2 rounded "><FaCartArrowDown className='text-red-500' /></button>
                                </div>
                            </div>)
                        }
                    </div>
                    <button
                        onClick={() => {
                            navigate('/shop')
                        }}
                        className=" mx-auto mt-10 text-center bg-blue-500 text-white px-4 py-2 rounded-md mb-2 md:mb-0 md:mr-2 hover:bg-blue-600 flex justify-center ">
                        Continue Shopping
                    </button>
                </div>

                {/* Trust Elements */}
                <div className="trust-elements my-8">
                    <div className="secure-checkout flex items-center mb-4">
                        <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3m-3 3V9m0 2a3 3 0 100-6 3 3 0 000 6z" />
                        </svg>
                        <span className="text-lg">Secure Checkout</span>
                    </div>
                    <div className="customer-support flex items-center">
                        <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 10-8 0m8 0a6 6 0 110 12H8a6 6 0 010-12m8 0a6 6 0 100 12H8a6 6 0 010-12" />
                        </svg>
                        <span className="text-lg">Need Help? <a href="mailto:support@example.com" className="text-blue-600 hover:underline">Contact us</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Promotion;