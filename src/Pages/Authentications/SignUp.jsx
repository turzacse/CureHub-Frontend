// import React, { useContext, useEffect, useState } from 'react';
// import { BsFillPeopleFill } from 'react-icons/bs';
// import { FaRegImage, FaUser } from 'react-icons/fa';
// import { MdEmail } from 'react-icons/md';
// import { RiLockPasswordFill } from 'react-icons/ri';
// import { NavLink, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../../assets/AuthContext';
// import { auth } from '../../Firebase/firebase.config';
// import { AuthContext } from '../../Provider/AuthContext';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import img from '../../assets/Logo/logo1.png'


// const image_hosting = '39cd3de230380fc39b116f0d1af689bd';
// const image_hosting_key = `https://api.imgbb.com/1/upload?key=${image_hosting}`;

// const SignUpPage = () => {

//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         username: '',
//         role: 'user',
//         photo: ''
//     });
//     const { createUser, updateProfileInfo } = useContext(AuthContext);
//     const [error, setError] = useState('')

//     const handleChange = (e) => {
//         setError('')
//         const { name, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleUpload = async (event) => {
//         const selectedFile = event.target.files[0];
//         try {
//             const uploadData = new FormData();
//             uploadData.append("image", selectedFile);

//             const response = await axios.post(image_hosting_key, uploadData);

//             if (response.status === 200) {
//                 const imageUrl = response.data.data.url;
//                 setFormData((prevState) => ({ ...prevState, photo: imageUrl }));
//                 console.log("Image uploaded successfully:", imageUrl);
//                 setError('');
//             }
//         } catch (error) {
//             console.error("Error uploading image:", error);
//             setError('Image is not Uploader! Please try another image.')
//         }
//     };

//     useEffect(() => {
//         if(!formData?.email || !formData?.password || !formData?.photo || !formData?.username){
//             // setError('You need to fill all the field')
//         }
//         else{

//         }
//     } ,[formData])

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (formData?.password?.length < 6) {
//             setError('Passwoard length should be 6 !')
//         }
//         else {
//             createUser(formData.email, formData.password)
//                 .then(userCredential => {
//                     const loggedUser = userCredential.user;
//                     console.log(loggedUser);
//                     updateProfileInfo(formData.username, formData.photo)
//                         .then(() => {
//                             console.log('Info Update');
//                             setFormData({
//                                 email: '',
//                                 password: '',
//                                 username: '',
//                                 role: 'user',
//                                 photo: ''
//                             });
//                             Swal.fire({
//                                 position: 'top-end',
//                                 icon: 'success',
//                                 title: 'User created successfully.',
//                                 showConfirmButton: false,
//                                 timer: 1500
//                             });
//                         })
//                         .catch(error => console.log(error))
//                 })
//                 .catch(error => alert("Failed to sign up: " + error.message));

//             fetch('https://cure-hub-backend-gules.vercel.app/users', {
//                 method: 'POST',
//                 headers: {
//                     'content-type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             })
//                 .then(res => res.json())
//                 .then(data => {
//                     console.log(data);
//                 })
//         }
//         // console.log(data);

//     };

//     useEffect(() => {
//         window.scroll(0, 0);
//     }, [])

//     return (
//         <div className='py-20 px-4 bg-[#011225]'>
//             <div className="py-10 bg-[#D1D1D1] md:w-1/2 mx-auto px-4  md:px-0 shadow-2xl rounded-lg">
//                 <img className="w-20 h-20 lg:w-24 lg:h-24 rounded-md mx-auto mb-2" src={img} alt="Profile" />
//                 <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>
//                 <form onSubmit={handleSubmit} className="max-w-lg mx-auto ">
//                     <div className="mb-4 relative">
//                         {/* <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label> */}
//                         <input
//                             type="text"
//                             id="username"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             placeholder='Full Name'
//                             className="w-full bg-white px-7 text-gray-700 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
//                         <FaUser className='absolute top-2 left-1 text-xl text-gray-700' />
//                     </div>
//                     <div className="mb-4 relative">
//                         {/* <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label> */}
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder='Email'
//                             className="w-full bg-white px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-700" />
//                         <MdEmail className='absolute top-[10px] left-1 text-2xl text-gray-700' />
//                     </div>
//                     <div className="mb-4 relative bg-black rounded-md">
//                         {/* <label htmlFor="photo" className="block text-gray-700 font-semibold mb-2">Photo</label> */}
//                         <input
//                             type="file"
//                             id="photo"
//                             name="photo"
//                             accept="image/*"
//                             onChange={handleUpload}
//                             placeholder='Photo'
//                             className="w-full bg-white px-8 py-2 border text-gray-700 rounded-md focus:outline-none focus:border-blue-500" />
//                         <FaRegImage className='absolute top-[12px] left-1 text-2xl text-gray-700' />
//                     </div>
//                     <div className="mb-4 relative">
//                         {/* <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label> */}
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder='Passwoard'
//                             className="w-full bg-white px-7 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500" />
//                         <RiLockPasswordFill className='absolute top-[8px] left-1 text-2xl text-gray-700' />
//                     </div>
//                     <div className="mb-4 relative">
//                         {/* <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">Role</label> */}
//                         <select
//                             id="role"
//                             name="role"
//                             value={formData.role}
//                             onChange={handleChange}
//                             placeholder='Role'
//                             className="w-full bg-white px-7 py-2 border text-gray-700 rounded-md focus:outline-none focus:border-blue-500">
//                             <option value="user">User</option>
//                             <option value="doctor">Doctor</option>
//                         </select>
//                         <BsFillPeopleFill className='absolute top-[8px] left-1 text-2xl text-gray-700' />
//                     </div>
//                     <div>
//                         Already have an account? <NavLink to='/sign-in' className='text-blue-500'>Sign In</NavLink>
//                     </div>
//                     <p className='text-red-600 text-[12px]'>{error ? error : ''}</p>
//                     <button
//                         disabled = {error}
//                         type="submit"
//                         className={`bg-red-500 text-white py-2 mt-4 flex items-center justify-center px-5 rounded-md hover:bg-red-600 ${error && 'cursor-not-allowed'} `}>Sign Up
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignUpPage;




import React, { useContext, useEffect, useState } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaRegImage, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase/firebase.config';
import { AuthContext } from '../../Provider/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import img from '../../assets/Logo/logo1.png'

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
    const [error, setError] = useState('');
    const [isUpload, setIsUpload] = useState(false);
    const [image, setImage] = useState('')

    const handleChange = (e) => {
        setError('');
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpload = async (event) => {
        setImage('');
        const selectedFile = event.target.files[0];
        try {
            const uploadData = new FormData();
            uploadData.append("image", selectedFile);

            const response = await axios.post(image_hosting_key, uploadData);

            if (response.status === 200) {
                const imageUrl = response.data.data.url;
                setFormData((prevState) => ({ ...prevState, photo: imageUrl }));
                setError('');
                setImage(imageUrl);
                setIsUpload(true);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setError('Image is not uploaded! Please try another image.');
        }
    };

    useEffect(() => {
        if (!formData?.email || !formData?.password || !formData?.photo || !formData?.username) {
            // setError('Please fill in all the fields!');
        }
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData?.password?.length < 6) {
            setError('Password should be at least 6 characters!');
            return;
        }

        // try {
        //     const userCredential = await createUser(formData.email, formData.password);
        //     const loggedUser = userCredential.user;

        //     await updateProfileInfo(formData.username, formData.photo);
        //     setFormData({
        //         email: '',
        //         password: '',
        //         username: '',
        //         role: 'user',
        //         photo: ''
        //     });
        //     setIsUpload(false);

        //     Swal.fire({
        //         position: 'top-end',
        //         icon: 'success',
        //         title: 'User created successfully.',
        //         showConfirmButton: false,
        //         timer: 1500
        //     });

        //     // Redirect after successful sign-up
        //     navigate('/'); 
        //     setImage('')
        // } catch (error) {
        //     console.error('Error during sign-up:', error);
        //     alert("Failed to sign up: " + error.message);
        // }

        // try {
        //     const response = await fetch('https://cure-hub-backend-gules.vercel.app/users', {
        //         method: 'POST',
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: JSON.stringify(formData)
        //     });
        //     const data = await response.json();
        //     console.log(data);
        // } catch (error) {
        //     console.error('Error during user data submission:', error);
        // }
        try {
            const userCredential = await createUser(formData.email, formData.password);
            const loggedUser = userCredential.user;
    
            await updateProfileInfo(formData.username, formData.photo);
    
            // Clear form data and disable upload state
            setFormData({
                email: '',
                password: '',
                username: '',
                photo: ''
            });
            setIsUpload(false);
    
            // Show success message
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User created successfully.',
                showConfirmButton: false,
                timer: 1500
            });
    
            // Redirect after successful sign-up
            
    
            // Submit user data to backend
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
            
        } catch (error) {
            console.error('Error during sign-up or user data submission:', error);
            alert("Failed to sign up: " + error.message);
        } finally {
            // Any cleanup logic or final steps can go here
            if(formData?.role == 'user'){
                navigate('/'); 
            }
            else{
                navigate('/dashboard'); 
            }
            
            setImage('');
            console.log('Sign up process completed (success or failure)');
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <div className='py-20 px-4 bg-[#011225]'>
            <div className="py-10 bg-[#D1D1D1] md:w-1/2 mx-auto px-4  md:px-0 shadow-2xl rounded-lg">
            {
                image ? <img className="w-20 h-20 lg:w-24 lg:h-24 rounded-md mx-auto mb-2" src={image} alt="Profile" /> : <img className="w-20 h-20 lg:w-24 lg:h-24 rounded-md mx-auto mb-2" src={img} alt="Profile" />
            }
                {/* <img className="w-20 h-20 lg:w-24 lg:h-24 rounded-md mx-auto mb-2" src={img} alt="Profile" /> */}
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <div className="mb-4 relative">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder='Full Name'
                            className="w-full bg-white px-7 text-gray-700 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                        <FaUser className='absolute top-2 left-1 text-xl text-gray-700' />
                    </div>
                    <div className="mb-4 relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email'
                            className="w-full bg-white px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-700" />
                        <MdEmail className='absolute top-[10px] left-1 text-2xl text-gray-700' />
                    </div>
                    <div className="mb-4 relative bg-black rounded-md">
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={handleUpload}
                            className="w-full bg-white px-8 py-2 border text-gray-700 rounded-md focus:outline-none focus:border-blue-500" />
                        <FaRegImage className='absolute top-[12px] left-1 text-2xl text-gray-700' />
                    </div>
                    <div className="mb-4 relative">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            className="w-full bg-white px-7 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500" />
                        <RiLockPasswordFill className='absolute top-[8px] left-1 text-2xl text-gray-700' />
                    </div>
                    <div className="mb-4 relative">
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full bg-white px-7 py-2 border text-gray-700 rounded-md focus:outline-none focus:border-blue-500">
                            <option value="user">User</option>
                            <option value="doctor">Doctor</option>
                        </select>
                        <BsFillPeopleFill className='absolute top-[8px] left-1 text-2xl text-gray-700' />
                    </div>
                    <div>
                        Already have an account? <NavLink to='/sign-in' className='text-blue-500'>Sign In</NavLink>
                    </div>
                    <p className='text-red-600 text-[12px]'>{error}</p>
                    <button
                        disabled={error || !formData.email || !formData.password || !formData.username || !formData.photo}
                        type="submit"
                        className={`bg-red-500 text-white py-2 mt-4 flex items-center justify-center px-5 rounded-md hover:bg-red-600 ${(error || !formData.email || !formData.password || !formData.username || !formData.photo) && 'cursor-not-allowed'} `}>Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
