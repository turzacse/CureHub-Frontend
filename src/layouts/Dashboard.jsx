import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdAccountBox, MdAccountCircle, MdAddBox, MdOutlinePayment } from "react-icons/md";
import { IoAddCircleSharp, IoCalendarNumber, IoPeople } from "react-icons/io5";
import { IoMdAnalytics, IoMdLogOut, IoMdMenu } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import Defaultuser from '../Pages/Dashboard/User/Defaultuser';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { FaCartArrowDown, FaHome, FaVideo } from "react-icons/fa";
import { GiHamburgerMenu, GiMedicines } from "react-icons/gi";
import DefaultAdmin from "../Pages/Dashboard/Admin/Default";
import DefaultDoctor from "../Pages/Dashboard/DefaultDoctor";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { FaMessage, FaRegMessage, FaUserDoctor } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";
import img from '../assets/Logo/logo1.png'
import { LuBadgeHelp } from "react-icons/lu";

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
    }, [curehubUser]);

    console.log(curehubUser, role);

    const isActive = (path, currentPath) => path === currentPath ? 'bg-gray-400 text-black' : 'hover:bg-gray-400 hover:text-black';


    return (
        <div className="relative min-h-screen bg-[#fff] overflow-hidden">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                {/* Content Area */}
                <div className="drawer-content flex flex-col text-black h-screen">
                    <label htmlFor="my-drawer-2" className="lg:hidden absolute left-0 top-0 btn cursor-pointer py-0 border-none w-full bg-[#006666] text-white rounded-none justify-between"
                        // style={{ borderRadius: '0px', height: '20px' }}
                    >
                        <GiHamburgerMenu className="flex justify-start" />
                        <NavLink to='/' className="text-gray-300 text-lg">Cure<span className="text-yellow-300 ">Hub</span></NavLink>

                        <p></p>
                    </label>

                    {isLoading && <div className="flex justify-center items-center">
                        <span className="loading loading-ring loading-xs"></span>
                        <span className="loading loading-ring loading-sm"></span>
                        <span className="loading loading-ring loading-md"></span>
                        <span className="loading loading-ring loading-lg"></span>
                    </div>}

                    {role == 'user' && location.pathname === '/dashboard' && <Defaultuser />}
                    {role == 'admin' && location.pathname === '/dashboard' && <DefaultAdmin />}
                    {role == 'doctor' && location.pathname === '/dashboard' && <DefaultDoctor />}

                    <div className="overflow-auto flex-grow p-4">
                        <Outlet />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="drawer-side lg:h-full lg:bg-[#006666]">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-44 lg:w-44 h-screen bg-[#006666] text-white uppercase">
                        <div className="p-4 ">
                            <div className="text-center mb-4">
                                <img className="w-12 h-12 lg:w-20 lg:h-20 rounded-full mx-auto mb-2" src={img} alt="Profile" />
                                {/* <h4 className="text-lg font-bold">
                                    {curehubUser?.username}
                                </h4> */}

                            </div>
                        </div>

                        {
                            role && role === 'user' && <>
                                <hr className='border-1 ' />
                                <Link to='/dashboard' 
                                className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/dashboard', location.pathname)}`}>
                                    <MdAccountCircle className="text-xl " />
                                    <li className="font-semibold">
                                        Account</li></Link>
                                        <hr className='border-1 ' />
                                <Link to='/dashboard/user-profile' 
                                className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/dashboard/user-profile', location.pathname)}`}>
                                    <MdAccountCircle className="text-xl " />
                                    <li className="font-semibold">
                                        Profile</li></Link>
                                <hr className='border-1 ' />
                                <Link to='/dashboard/patient-appointment' className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/dashboard/patient-appointment', location.pathname)}`}>
                                    <IoCalendarNumber className="text-xl " />
                                    <li className="font-semibold">Appointment</li></Link>
                                {/* <hr className='border-1' />
                                <Link to='/telemedicine' className="py-2 pl-2 hover:bg-gray-400 flex gap-2 items-center hover:text-black">
                                    <FaVideo className="text-xl " />
                                    <li className="font-semibold"> Telemedicine</li></Link> */}
                                {/* <hr className='border-1' />
                                <Link to='/cart' className="py-2 pl-2 hover:bg-gray-400 flex gap-2 items-center hover:text-black">
                                    <FaCartArrowDown className="text-xl text-[#22C55E] hover:text-black" />
                                    <li className="font-semibold">Cart</li></Link> */}
                                <hr className='border-1' />
                                <Link to='/dashboard/user-message' 
                                className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/dashboard/user-message', location.pathname)}`}>
                                    <FaRegMessage className="text-xl " />
                                    <li className="font-semibold">Message</li></Link>
                                <hr className='border-1' />
                            </>
                        }

                        {role && role === 'admin' && <>
                            <hr className='border-1 ' />
                            <Link to='/dashboard' 
                            className={`py-2 pl-2 flex gap-2 items-center ${isActive('/dashboard', location.pathname)}`}
                            >
                                <MdAccountBox className="text-xl " />
                                <li className="font-semibold">
                                    Account</li></Link>
                            <hr className='border-1 ' />
                            <Link to='/dashboard/alluser' 
                            className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/dashboard/alluser', location.pathname)}`}>
                                <IoPeople className="text-xl " />
                                <li className="font-semibold">
                                    CH Users</li></Link>
                            <hr className='border-1' />
                            <Link to='/dashboard/doctors' 
                            className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/dashboard/doctors', location.pathname)}`}
                            >
                                <FaUserDoctor className="text-xl " />
                                <li className="font-semibold">
                                    CH Doctors</li></Link>
                            <hr className='border-1' />
                            <Link to='/dashboard/appointment-management' className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/dashboard/appointment-management', location.pathname)}`}>
                                <BsCalendar2Date className="text-xl " />
                                <li className="font-semibold">
                                    Appointment</li></Link>
                            <hr className='border-1' />
                            <Link to='/dashboard/payments' 
                            className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/dashboard/payments', location.pathname)}`}
                            >
                                <MdOutlinePayment className="text-xl " />
                                <li className="font-semibold">
                                    Payments</li></Link>
                            <hr className='border-1' />
                            <Link to='/dashboard/all-message' 
                            className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/dashboard/all-message', location.pathname)}`}
                            >
                                <FaMessage className="text-xl " />
                                <li className="font-semibold">
                                    Messages</li></Link>
                            <hr className='border-1' />
                            <Link to='/dashboard/membership' 
                            className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/dashboard/membership', location.pathname)}`}>
                                <LuBadgeHelp className="text-xl " />
                                <li className="font-semibold">
                                    MemeberShip</li></Link>
                            <hr className='border-1' />
                            <Link to='/dashboard/order-history' 
                            className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/dashboard/order-history', location.pathname)}`}>
                                <FaCartArrowDown className="text-xl " />
                                <li className="font-semibold">
                                    Order History</li></Link>
                            <hr className='border-1' />
                            <Link to='/dashboard/medicines' 
                            className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/dashboard/medicines', location.pathname)}`}>
                                <GiMedicines className="text-xl " />
                                <li className="font-semibold">
                                    Medicine</li></Link>
                            <hr className='border-1' />
                        </>
                        }

                        {role && role === 'doctor' && <>
                            <hr className='border-1 ' />
                            <Link to='/dashboard' className={`py-2 pl-2 flex gap-2 items-center ${isActive('/dashboard', location.pathname)}`}>
                                <MdAccountCircle className="text-xl " />
                                <li className="font-semibold">
                                    Account</li></Link>
                            <hr className='border-1 ' />
                            <Link to='/dashboard/appointment/doctor' className={`py-2 pl-2 flex gap-2 items-center ${isActive('/dashboard/appointment/doctor', location.pathname)}`}>
                                <MdAccountCircle className="text-xl " />
                                <li className="font-semibold">
                                    Appointment</li></Link>
                            <hr className='border-1' />
                            {/* <Link to='/dashboard/doctors' className="py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center">
                                <MdAccountCircle className="text-xl " />
                                <li className="font-semibold">
                                    Telemedicine</li></Link>
                            <hr className='border-1' /> */}

                        </>
                        }
                    </ul>

                    {/* Bottom Logout and Home Links */}
                    <div className="absolute bottom-5 w-44">
                        <ul className="p-4 mr-4 bg-[#006666] text-white">
                        <Link to='/' 
                            className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/', location.pathname)}`}>
                                <FaHome className="text-xl " />
                                <li className="font-semibold">
                                    Home</li></Link>
                            <hr className='border-1' />
                            <Link to='#'
                            onClick={() => {
                                signOut(auth);
                                navigate('/');
                            }} 
                            className={`py-2 pl-2 hover:bg-gray-400 hover:text-black flex gap-2 items-center ${isActive('/', location.pathname)}`}>
                                <IoMdLogOut className="text-xl " />
                                <li className="font-semibold">
                                    LogOut</li></Link>
                            {/* <Link to='#' className="pl-2 py-2 block hover:bg-gray-400 hover:text-black"
                                onClick={() => {
                                    signOut(auth);
                                    navigate('/');
                                }}
                            >
                                <li className="font-semibold">LogOut</li>
                            </Link> */}
                            <hr className='border-1' />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;