import React, { useContext, useEffect, useState } from 'react';
import Headline from '../../../Components/Headline';
import { AuthContext } from '../../../Provider/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const image_hosting = '39cd3de230380fc39b116f0d1af689bd';
const image_hosting_key = `https://api.imgbb.com/1/upload?key=${image_hosting}`;

const Category = () => {
    const { user } = useContext(AuthContext);
    const [openAdd, setOpenAdd] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [show, setShow] = useState(false);
    const [ads, setAds] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        admin: user?.email,
        photo: '',
    });

    const handleAdd = () => {
        setOpenAdd(true);
    }
    const handleModal = () => {
        setOpenAdd(false);
    }

    const handleUpload = async (event) => {
        setProcessing(true);
        setShow(true);

        const selectedFile = event.target.files[0];
        try {
            const uploadData = new FormData();
            uploadData.append("image", selectedFile);

            const response = await axios.post(image_hosting_key, uploadData);

            if (response.status === 200) {
                const imageUrl = response.data.data.url;
                setFormData((prevState) => ({ ...prevState, photo: imageUrl }));
                console.log("Image uploaded successfully:", imageUrl);
                setProcessing(false);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('https://cure-hub-backend-gules.vercel.app/category', formData);
            console.log(response.data);
            setOpenAdd(false);
            Swal.fire({
                title: 'Success!',
                text: 'Requested for the advertisement!',
                background: '#008080',
                confirmButtonText: 'OK',
                icon: 'success',
            });

            setFormData({
                name: '',
                admin: user?.email,
                photo: '',
            });
            setShow(false);
        }
        catch(error){
            console.error(error);
        }
        
    }


    useEffect( () => {
        fetch('https://cure-hub-backend-gules.vercel.app/category')
        .then(res => res.json())
        .then(data => setAds(data.filter((item) => item?.admin === user.email)))
    } ,[])



    return (
        <div>
            <Headline headline='Category' />
            <p>{ads?.length}</p>

            <div className='text-white flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                <div className='mb-4 sm:mb-0'>
                    <h2><span className='text-[#ebee48] font-bold'>Seller Name :</span> {user?.displayName} </h2>
                    {/* <p>Total Medicine : 2</p> */}
                </div>
                <button
                    onClick={handleAdd}
                    className='bg-[#2ab6c0] w-full sm:w-[140px] py-2 rounded-lg shadow-lg text-black'
                >Add Category</button>
            </div>

            {
                openAdd && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-[#289e9e] p-4 rounded-lg px-6 w-full max-w-lg mx-auto relative">
                            <h2 className='mb-4'>Seller: {user.displayName}</h2>
                            {
                                show && <div className='h-[200px] w-[300px] flex items-center mx-auto justify-center'>
                                {
                                    processing? <>
                                    processing...
                                    </> : <>
                                    <img className='rounded-lg shadow-2xl mb-4' src={formData?.photo} alt="" />
                                    </>
                                }
                                </div>
                            }
                            <form onSubmit={handleSubmit} className="">

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
                                <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder='Category Title'
                                        className="w-full px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-[#67269c] text-white py-2 mt-4 flex items-center justify-center px-5 rounded-md hover:bg-green-800 w-full sm:w-auto">
                                        Add Category
                                </button>
                            </form>
                            <button
                                className='bg-[#ee3e3e] mt-2 p-2 rounded-lg px-4 text-white w-full sm:w-auto mx-auto absolute right-4 bottom-4'
                                onClick={handleModal}
                            >Cancel</button>
                        </div>
                    </div>
                )
            }

           <div className='text-white mt-4'>
           <h2 className='text-xl font-bold text-center mb-5'>Category List</h2>
           </div >
           <div className='grid md:grid-cols-3 grid-cols-1 gap-2'>
           {
            ads?.map((item) => <div className='bg-[#1A6868] rounded-lg p-2' key={item._id}>
                <img className='h-[200px] w-[250px] rounded-xl shadow-2xl mb-2 flex items-center justify-center mx-auto' src={item.photo} alt="" />
                <p className='text-white mt-4 mb-8'>{item.name}</p>
                <p>{item.status}</p>
            </div>)
           }
           </div>
        </div>
    );
};

export default Category;