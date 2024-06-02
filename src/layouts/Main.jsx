import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';

const Main = () => {
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