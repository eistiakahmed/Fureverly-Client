import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';

const MainLayouts = () => {
  return (
    <div className='bg-gray-100 h-screen'>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayouts;