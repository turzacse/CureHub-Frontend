import React, { useContext, useEffect, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import fb from '../../assets/facebook-new.png'
import Swal from 'sweetalert2';
import img from '../../assets/Logo/logo1.png'

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alluser, setAllUser] = useState([]);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const form = location.state?.form?.pathname || '/';

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        // if(alluser?.map((user) => ((user.email === formData.email) && (user.password === formData.password)))){
        //     navigate('/');
        // }

        try {
            await signInWithEmailAndPassword(auth ,formData.email, formData.password);
            // navigate('/'); 
            navigate(location?.state ? location.state : '/')
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    console.log('Error =>', error);
    useEffect(() => {
        window.scroll(0,0);
    } ,[])

    return (
        <div className='py-20 px-4 bg-[#011225]'>
            <div className="py-10 bg-[#D1D1D1] md:w-1/2 mx-auto px-4  md:px-0 shadow-2xl rounded-lg">
            <img className="w-20 h-20 lg:w-24 lg:h-24 rounded-md mx-auto mb-2" src={img} alt="Profile" />
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
            
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto md:px-4">
                
                <div className="mb-4 relative">
                    
                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder='Email'
                    className="w-full px-7 bg-white py-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-700"/>
                    <MdEmail className='absolute top-[10px] left-1 text-2xl text-gray-700' />
                </div>
                <div className="mb-4 relative">
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange}
                    placeholder='Passwoard' 
                    className="w-full px-7 py-2 bg-white border rounded-md focus:outline-none focus:border-blue-500 text-gray-700"/>
                    <RiLockPasswordFill className='absolute top-[8px] left-1 text-2xl text-gray-700' />
                </div>
                {
                    error && <div className='text-red-500'>
                        Invalid email or password. Please try again.
                    </div>
                }
                <div className='flex justify-between'>
                    <div className='text-[14px] mt-5'>
                    New here? <NavLink to='/sign-up' className='text-blue-600 '> Sign Up</NavLink>
                    </div>
                    <div className="flex justify-between gap-2 mb-6 ">
            </div>
                </div>

                
                <button 
                type="submit" 
                className="bg-red-500 text-white py-2 mt-4 flex items-center justify-center px-5 rounded-md hover:bg-red-600 ">Sign In
                </button>

            </form>
        </div>
        </div>
    );
};

export default LoginPage;
