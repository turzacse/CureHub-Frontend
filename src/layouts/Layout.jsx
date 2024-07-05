import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>

          <div className='bg-[#2C3E50]'>
              <Outlet/>
          </div>
        </div>
    );
};

export default Layout;