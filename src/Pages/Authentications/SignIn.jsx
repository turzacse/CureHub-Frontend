import React, { useContext, useEffect, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContext';

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

    const handleChange = (e) => {
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
            await signIn(formData.email, formData.password);
            navigate('/dashboard'); // Redirect to homepage or another page after successful login
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='py-20 px-4'>
            <div className="py-10 bg-[#D1D1D1] md:w-1/2 mx-auto px-4  md:px-0 shadow-2xl rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                {/* <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                </div> */}
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
                {/* <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                </div> */}
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
                <div>
                    New here? <NavLink to='/sign-up'>Sign Up</NavLink>
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
