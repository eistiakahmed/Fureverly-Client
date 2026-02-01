import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const MainLayouts = () => {
  return (
    <div className="bg-slate-100 dark:bg-black min-h-screen">
      <Navbar />
      <div className="lg:max-w-11/12 mx-auto">
        <div className="min-h-[60vh]">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayouts;