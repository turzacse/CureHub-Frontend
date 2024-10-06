import React, { useContext, useEffect, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import fb from '../../assets/facebook-new.png'

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
            navigate('/'); // Redirect to homepage or another page after successful login
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    console.log('Error =>', error);

    return (
        <div className='py-20 px-4'>
            <div className="py-10 bg-[#D1D1D1] md:w-1/2 mx-auto px-4  md:px-0 shadow-2xl rounded-lg">
            {/* <div className="flex justify-between mb-6 lg:mx-4">

            <div className="max-w-lg mx-auto mt-2">
                    <button className='flex gap-2 items-center border-black border-1 btn btn-outline px-2'><FcGoogle className='text-4xl font-bold' /> <span className='hidden lg:flex'>Continue with Google</span> </button>
            </div>

            <div className="max-w-lg mx-auto mt-2">
                    <button className='flex gap-2 items-center border-black border-1 btn btn-outline px-2'> <span className='hidden lg:flex'>Continue with Facebook</span> <img className='w-[40px] h-[40px] ' src={fb}/></button>
            </div>
            </div> */}
            <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
            
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto md:px-4">
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

            <div className="max-w-lg mx-auto mt-2">
                    <button className='flex items-center border-black border-1 btn btn-outline px-2 text-[10px]'><FcGoogle className='text-2xl font-bold' />Continue <span className='hidden lg:flex text-[10px]'>with Google</span> </button>
            </div>

            <div className="max-w-lg mx-auto mt-2">
                    <button className='flex  items-center border-black border-1 btn btn-outline px-2'> <span className='text-[10px]'>Continue</span> <span className='hidden lg:flex text-[10px]'>with Facebook</span> <img className='w-[30px] h-[30px] ' src={fb}/></button>
            </div>
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





// import React, { useContext, useState } from 'react';
// import { MdEmail } from 'react-icons/md';
// import { RiLockPasswordFill } from 'react-icons/ri';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../Provider/AuthContext';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../Firebase/firebase.config';

// const LoginPage = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [error, setError] = useState('');
//     // const { signIn, loading, setLoading, user } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         e.preventDefault();
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // alert('Hello')
//         try {
//             const response =signInWithEmailAndPassword(auth, formData?.email, formData?.password);
//             // navigate('/');
//             console.log(response, '<== response');
//         }
//         catch(e) {
//             setError(e?.message);
//             console.log(e);
//             setError('Passwoard Does not matched.')
//         }
//         finally{
            
//         }
       
//     };
//     // if(user){
//     //     // navigate('/');
//     // }

//     return (
//         <div className='py-20 px-4'>
//             <div className="py-10 bg-[#D1D1D1] md:w-1/2 mx-auto px-4 md:px-0 shadow-2xl rounded-lg">
//                 <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
//                 <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
//                     <div className="mb-4 relative">
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder='Email'
//                             className="w-full px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//                         />
//                         <MdEmail className='absolute top-[10px] left-1 text-2xl text-gray-600' />
//                     </div>
//                     <div className="mb-4 relative">
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder='Password'
//                             className="w-full px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//                         />
//                         <RiLockPasswordFill className='absolute top-[8px] left-1 text-2xl text-gray-600' />
//                     </div>
//                     {error && (
//                         <div className="text-red-600 text-center mb-4">
//                             {error}
//                         </div>
//                     )}
//                     <div>
//                         New here? <NavLink to='/sign-up'>Sign Up</NavLink>
//                     </div>
//                     <button
//                         type="submit"
//                         className="bg-red-500 text-white py-2 mt-4 flex items-center justify-center px-5 rounded-md hover:bg-red-600">
//                         Sign In
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;