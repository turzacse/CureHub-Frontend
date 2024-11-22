import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { FaCamera, FaPen } from 'react-icons/fa';
import Swal from 'sweetalert2';

const UserProfile = () => {
    const {curehubUser} = useContext(AuthContext);
    return (
        <div className='md:mx-20 py-10'>
            

            <form className='bg-[#094b77] p-5 pb-10 rounded-md text-white space-y-5' action="">
                <div className='bg-white p-2 w-[100px] h-[100px] mx-auto md:mx-0 rounded-lg relative'>
                    <img className='h-full w-full rounded-sm' src={curehubUser?.photo} alt="" />
                    <div className='p-2 rounded-md bg-[#052c20] absolute -right-2 -bottom-2'>
                    <FaCamera
                    style={{cursor: 'pointer'}}
                    onClick={() => {
                     Swal.fire({
                         title: 'Comming Soon !',
                         color: '#fff',
                         background: '#094b77'
                     })
                    }}
                    />
                    </div>
                </div>
                <div>
                    <label htmlFor="">Name</label> <br />
                    <div className="relative">
                    <input
                    value={curehubUser?.username}
                    type="text" 
                    className='bg-gray-200 px-4 py-2 rounded-md w-full mt-2 text-black'
                    />
                    <div className='absolute right-2 top-3 bg-[#094b77] p-2 rounded-md'>
                       <FaPen 
                       style={{cursor: 'pointer'}}
                       onClick={() => {
                        Swal.fire({
                            title: 'Comming Soon !',
                            color: '#fff',
                            background: '#094b77'
                        })
                       }}  />
                    </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="">Email</label> <br />
                    <div className="relative">
                    <input
                    value={curehubUser?.email}
                    type="text" 
                    className='bg-gray-200 px-4 py-2 rounded-md w-full mt-2 text-black'
                    />
                    <div className='absolute right-2 top-3 bg-[#094b77] p-2 rounded-md'>
                       <FaPen 
                       style={{cursor: 'pointer'}}
                       onClick={() => {
                        Swal.fire({
                            title: 'Comming Soon !',
                            color: '#fff',
                            background: '#094b77'
                        })
                       }}  />
                    </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="">Password</label> <br />
                    <div className="relative">
                    <input
                    value={curehubUser?.password}
                    type="password" 
                    className='bg-gray-200 px-4 py-2 rounded-md w-full mt-2 text-black'
                    />
                    <div className='absolute right-2 top-3 bg-[#094b77] p-2 rounded-md'>
                       <FaPen 
                       style={{cursor: 'pointer'}}
                       onClick={() => {
                        Swal.fire({
                            title: 'Comming Soon !',
                            color: '#fff',
                            background: '#094b77'
                        })
                       }}  />
                    </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="">Role</label> <br />
                    <input
                    value={curehubUser?.role}
                    type="text" 
                    className='bg-gray-200 px-4 py-2 rounded-md w-full mt-2 text-black'
                    />
                </div>
            </form>
        </div>
    );
};

export default UserProfile;