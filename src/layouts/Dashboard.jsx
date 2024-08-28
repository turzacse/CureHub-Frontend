import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdAccountCircle, MdAddBox } from "react-icons/md";
import { IoAddCircleSharp, IoCalendarNumber } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import Defaultuser from '../Pages/Dashboard/User/Defaultuser';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { FaCartArrowDown, FaVideo } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import DefaultAdmin from "../Pages/Dashboard/Admin/Default";
import DefaultDoctor from "../Pages/Dashboard/DefaultDoctor";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";


const Dashboard = () => {
    const { user, curehubUser } = useContext(AuthContext);
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoading(true);
        if (curehubUser) {
            setRole(curehubUser?.role);
            setIsLoading(false);
        }
    }, [curehubUser])
    console.log(curehubUser, role);

    return (
        <div className="relative min-h-[100vh] bg-gray-800 overflow-hidden">

            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col  ">
                    <label htmlFor="my-drawer-2" className=" lg:hidden absolute left-0 top-0 btn cursor-pointer py-0 border-none bg-[#006666] text-white "
                        style={{ borderRadius: '0px', height: '20px', borderBottomRightRadius: '8px' }}
                    ><GiHamburgerMenu /></label>
                    {
                        isLoading && <div className="flex justify-center items-center">
                            <span className="loading loading-ring loading-xs"></span>
                            <span className="loading loading-ring loading-sm"></span>
                            <span className="loading loading-ring loading-md"></span>
                            <span className="loading loading-ring loading-lg"></span>
                        </div>
                    }
                    {role == 'user' && location.pathname === '/dashboard' && (
                        <div>
                            <Defaultuser />
                        </div>
                    )}

                    {role == 'admin' && location.pathname === '/dashboard' && (
                        <div>
                            <DefaultAdmin />
                        </div>
                    )}
                    {role == 'doctor' && location.pathname === '/dashboard' && (
                        <div>
                            <DefaultDoctor />
                        </div>
                    )}
                    <Outlet className='overflow-hidden'> </Outlet>
                </div>
                <div className="drawer-side lg:h-full lg:bg-[#006666] ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
                    <ul className="menu p-4 w-44 lg:w-44 h-screen bg-[#006666] text-white">
                        <div className="p-4 ">
                            <div className="text-center mb-8">
                                <img className="w-12 h-12 lg:w-20 lg:h-20 rounded-full mx-auto mb-2" src={curehubUser?.photo} alt="Profile" />

                                <h4 className="text-lg font-bold">
                                    {curehubUser?.username}
                                </h4>
                                {/* <p className="">User Email</p> */}
                            </div>
                        </div>

                        {
                            role && role === 'user' && <>
                                <hr className='border-1 ' />
                                <Link to='/dashboard' className="py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center">
                                    <MdAccountCircle className="text-xl " />
                                    <li className="font-semibold">
                                        Account</li></Link>
                                <hr className='border-1 ' />
                                <Link to='/dashboard/patient-appointment' className="py-2 pl-2 hover:bg-gray-400 flex gap-2 items-center hover:text-black">
                                    <IoCalendarNumber className="text-xl " />
                                    <li className="font-semibold">Appointment</li></Link>
                                <hr className='border-1' />
                                <Link to='/telemedicine' className="py-2 pl-2 hover:bg-gray-400 flex gap-2 items-center hover:text-black">
                                    <FaVideo className="text-xl " />
                                    <li className="font-semibold"> Telemedicine</li></Link>
                                <hr className='border-1' />
                                <Link to='/dashboard/cart' className="py-2 pl-2 hover:bg-gray-400 flex gap-2 items-center hover:text-black">
                                    <FaCartArrowDown className="text-xl text-[#22C55E] hover:text-black" />
                                    <li className="font-semibold">Cart</li></Link>
                                <hr className='border-1' />
                            </>
                        }

                        {role && role === 'admin' && <>
                            <hr className='border-1 ' />
                            <Link to='/dashboard' className="py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center">
                                <MdAccountCircle className="text-xl " />
                                <li className="font-semibold">
                                    Account</li></Link>
                            <hr className='border-1 ' />
                            <Link to='/dashboard/alluser' className="py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center">
                                <MdAccountCircle className="text-xl " />
                                <li className="font-semibold">
                                    CH User</li></Link>
                            <hr className='border-1' />
                            <Link to='/dashboard/doctors' className="py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center">
                                <MdAccountCircle className="text-xl " />
                                <li className="font-semibold">
                                    CH Doctors</li></Link>
                            <hr className='border-1' />
                            <Link to='/dashboard/appointment-management' className="py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center">
                                <MdAccountCircle className="text-xl " />
                                <li className="font-semibold">
                                    Appointment</li></Link>
                            <hr className='border-1' />
                            <Link to='/dashboard' className="py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center">
                                <MdAccountCircle className="text-xl " />
                                <li className="font-semibold">
                                    Order History</li></Link>
                            <hr className='border-1' />
                        </>
                        }

                        {role && role === 'doctor' && <>
                            <hr className='border-1 ' />
                            <Link to='/dashboard' className="py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center">
                                <MdAccountCircle className="text-xl " />
                                <li className="font-semibold">
                                    Account</li></Link>
                            <hr className='border-1 ' />
                            <Link to='/dashboard/alluser' className="py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center">
                                <MdAccountCircle className="text-xl " />
                                <li className="font-semibold">
                                    CH User</li></Link>
                            <hr className='border-1' />
                            <Link to='/dashboard/doctors' className="py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center">
                                <MdAccountCircle className="text-xl " />
                                <li className="font-semibold">
                                    CH Doctors</li></Link>
                            <hr className='border-1' />
                            <Link to='/dashboard/appointment-management' className="py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center">
                                <MdAccountCircle className="text-xl " />
                                <li className="font-semibold">
                                    Appointment</li></Link>
                            <hr className='border-1' />
                            <Link to='/dashboard' className="py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center">
                                <MdAccountCircle className="text-xl " />
                                <li className="font-semibold">
                                    Order History</li></Link>
                            <hr className='border-1' />
                        </>
                        }
                    </ul>


                    <div className="absolute bottom-5 w-44">
                        <ul className="p-4 mr-4 bg-[#006666] text-white">

                            <Link to='/' className=" pl-2 py-2 block hover:bg-gray-400  hover:text-black"><li className="font-semibold"> Home</li></Link>
                            <hr className='border-1' />
                            <Link to='#' className=" pl-2 py-2 block hover:bg-gray-400  hover:text-black"><li className="font-semibold"
                            onClick={() => {
                                signOut(auth);
                                navigate('/')
                            }}
                            >LogOut</li></Link>
                            <hr className='border-1' />

                        </ul>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;