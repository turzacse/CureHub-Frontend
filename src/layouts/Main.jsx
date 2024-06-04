import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';

const Main = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
    return (
        <div>
          <Navbar/> 
          <div className='bg-[#008080]'>
          <Outlet/>
          </div>
          <Footer/>
        </div>
    );
};

export default Main;