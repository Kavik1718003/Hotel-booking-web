import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/hotelOwner/Sidebar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className='flex flex-col h-screen'>
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <div className='flex flex-1 mt-20 overflow-hidden'>

        {/* Sidebar */}
        <Sidebar />

        {/* Outlet for Page Content */}
        <div className='flex-1 overflow-y-auto p-4 pt-10 md:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

