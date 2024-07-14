// import React from 'react';
// import Sidebar from './Sidebar';
// import DashboardCard from './DashboardCard';
// // import Sidebar from '../components/Sidebar';
// // import DashboardCard from '../components/DashboardCard';

// const Dash = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       <Sidebar />
//       <div className="flex-1 p-6 md:ml-64">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <DashboardCard title="Membership" description="View your membership details." />
//           <DashboardCard title="Appointments" description="Manage your appointments and telemedicine sessions." />
//           <DashboardCard title="Cart" description="View items in your cart." />
//           <DashboardCard title="Due Payment" description="Check your due payments." />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dash;


import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';
import DashboardCard from './DashboardCard';

const Dash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`fixed md:static ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 md:ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="Membership" description="View your membership details." />
          <DashboardCard title="Appointments" description="Manage your appointments and telemedicine sessions." />
          <DashboardCard title="Cart" description="View items in your cart." />
          <DashboardCard title="Due Payment" description="Check your due payments." />
        </div>
      </div>

      {/* Toggle button for small devices */}
      <div className="md:hidden fixed top-4 left-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-800 focus:outline-none"
        >
          <FaBars size={24} />
        </button>
      </div>
    </div>
  );
};

export default Dash;

