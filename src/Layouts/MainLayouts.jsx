import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const MainLayouts = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="min-h-[60vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayouts;