import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import '../index.css'
// #008080
// #0a3030   its look nice
const Main = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  useEffect( () => {
    window.scroll(0,0);
  } ,[])
    return (
        <div className='max-w-full overflow-y-hidden overflow-x-hidden'>
          <Navbar/> 
          <div className='bg-[#2C3E50]'>
          <Outlet/>
          </div>
          <Footer/>
        </div>
    );
};

export default Main;


// Teal and Navy

// Primary Color: #20C997 (teal)
// Secondary Color: #343A40 (dark gray)
// Accent Color: #FF5733 (coral)
// Background Color: #2C3E50 (navy)