import React, { useContext, useState } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaRegImage, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../assets/AuthContext';
import { auth } from '../../Firebase/firebase.config';
import { AuthContext } from '../../Provider/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';


const image_hosting = '39cd3de230380fc39b116f0d1af689bd';
const image_hosting_key = `https://api.imgbb.com/1/upload?key=${image_hosting}`;

const SignUpPage = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        role: 'user',
        photo: ''
    });
    const { createUser, updateProfileInfo } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const userCredential = await createUser(formData.email, formData.password);
    //         await updateProfileInfo(formData.username, formData.photo);
    //         const response = await axios.post('https://cure-hub-backend-gules.vercel.app/users', formData);
    //         console.log(response.data);
    //         setOpenAdd(false);
    //         Swal.fire({
    //             title: 'Success!',
    //             text: 'SignUP successfully!',
    //             background: '#008080',
    //             confirmButtonText: 'OK',
    //             icon: 'success',
    //         });
    //     } catch (error) {
    //         alert("Failed to sign up: " + error.message);
    //     }
    // };
    // const onSubmit = (data) => {
    //     console.log(data);
    //     createUser(data.email, data.password)
    //     .then(result => {
    //         const loggedUser = result.user;
    //         console.log(loggedUser);
    //         updateProfileInfo(data.username, data.photo)
    //         .then( () => {
    //             console.log('Info Update');
    //             reset();
    //                     Swal.fire({
    //                         position: 'top-end',
    //                         icon: 'success',
    //                         title: 'User created successfully.',
    //                         showConfirmButton: false,
    //                         timer: 1500
    //                     });
    //             navigate('/');
    //         })
    //         .catch(error => console.log(error))
    //     })

    //     fetch('https://speedy-send-server.vercel.app/users', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json' 
    //         },
    //         body: JSON.stringify(data)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(data);
        createUser(formData.email, formData.password)
        .then(userCredential => {
            const loggedUser = userCredential.user;
            console.log(loggedUser);
            updateProfileInfo(formData.username, formData.photo)
            .then( () => {
                console.log('Info Update');
                setFormData({
                    email: '',
                    password: '',
                    username: '',
                    role: 'user',
                    photo: ''
                });
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.log(error))
        })
        .catch(error => alert("Failed to sign up: " + error.message));
    
        fetch('https://cure-hub-backend-gules.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json' 
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    };
    

    return (
       <div className='py-20 px-4'>
         <div className="py-10 bg-[#D1D1D1] md:w-1/2 mx-auto px-4  md:px-0 shadow-2xl rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4 relative">
                    {/* <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label> */}
                    <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange}
                    placeholder='Full Name' 
                    className="w-full px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                    <FaUser className='absolute top-2 left-1 text-xl text-gray-600' />
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
                    className="w-full px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                    <MdEmail className='absolute top-[10px] left-1 text-2xl text-gray-600' />
                </div>
                <div className="mb-4 relative">
                    {/* <label htmlFor="photo" className="block text-gray-700 font-semibold mb-2">Photo</label> */}
                    <input 
                    type="file" 
                    id="photo" 
                    name="photo" 
                    accept="image/*" 
                    onChange={handleUpload} 
                    placeholder='Photo'
                    className="w-full px-8 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                    <FaRegImage className='absolute top-[12px] left-1 text-2xl text-gray-600' />
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
                    className="w-full px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                    <RiLockPasswordFill className='absolute top-[8px] left-1 text-2xl text-gray-600' />
                </div>
                <div className="mb-4 relative">
                    {/* <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">Role</label> */}
                    <select 
                    id="role" 
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange} 
                    placeholder = 'Role'
                    className="w-full px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                        <option value="user">User</option>
                        <option value="doctor">Seller</option>
                    </select>
                    <BsFillPeopleFill className='absolute top-[8px] left-1 text-2xl text-gray-600' />
                </div>
                <div>
                    Already have an account? <NavLink to='/sign-in'>Sign In</NavLink>
                </div>
                <button 
                type="submit" 
                className="bg-red-500 text-white py-2 mt-4 flex items-center justify-center px-5 rounded-md hover:bg-red-600 ">Sign Up
                </button>
            </form>
        </div>
       </div>
    );
};

export default SignUpPage;
