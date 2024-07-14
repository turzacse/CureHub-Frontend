import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed inset-0 z-50 flex transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
      <div className="bg-gray-800 text-white w-64 space-y-6 p-5">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <nav>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Membership</a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Appointments</a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Cart</a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Due Payment</a>
        </nav>
      </div>
      <div className="flex-grow md:hidden" onClick={toggleSidebar}></div>
      <button onClick={toggleSidebar} className="p-4 bg-gray-800 text-white fixed bottom-5 right-5 rounded-full md:hidden">
        ☰
      </button>
    </div>
  );
};

export default Sidebar;
