import React, { useContext } from 'react';
import logo from '../../assets/logo.png';
import { Link, NavLink } from 'react-router';
import { IoMdLogIn } from 'react-icons/io';
import { AuthContext } from '../../Context/AuthContext';

import {
  LogOut,
  PackageSearch,
  ShoppingBasket,
  ShoppingCart,
} from 'lucide-react';
import { FaHome } from 'react-icons/fa';
import { MdOutlinePets } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const signOut = () => { 
     logOut()
       .then(() => {
         toast.success('Logged out successfully!');
       })
       .catch((err) => {
         toast.error(err.message);
       });
  }

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `md:font-medium md:text-lg px-3 py-1 rounded-full transition-all duration-200 ${
              isActive
                ? 'text-amber-400 bg-amber-100 hover:text-amber-500'
                : 'text-[#092052] bg-white hover:text-amber-500'
            }`
          }
        >
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/petsAndSupplies"
          className={({ isActive }) =>
            `md:font-medium md:text-lg px-3 py-1 rounded-full transition-all duration-200 ${
              isActive
                ? 'text-amber-400 bg-amber-100 hover:text-amber-500'
                : 'text-[#092052] bg-white hover:text-amber-500'
            }`
          }
        >
          <MdOutlinePets />
          Pets & Supplies
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/addListing"
              className={({ isActive }) =>
                `md:font-medium md:text-lg px-3 py-1 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-amber-400 bg-amber-100 hover:text-amber-500'
                    : 'text-[#092052] bg-white hover:text-amber-500'
                }`
              }
            >
              <ShoppingBasket /> Add Listing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myListings"
              className={({ isActive }) =>
                `md:font-medium md:text-lg px-3 py-1 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-amber-400 bg-amber-100 hover:text-amber-500'
                    : 'text-[#092052] bg-white hover:text-amber-500'
                }`
              }
            >
              <PackageSearch /> My Listings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myOrders"
              className={({ isActive }) =>
                `md:font-medium md:text-lg px-3 py-1 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-amber-400 bg-amber-100 hover:text-amber-500'
                    : 'text-[#092052] bg-white hover:text-amber-500'
                }`
              }
            >
              <ShoppingCart /> My Orders
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm py-2">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          {/* Mobile menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Fureverly Logo"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200"
            />
            <span className="text-xl md:text-3xl font-bold YesevaOne text-[#092052]">
              Fureverly
            </span>
          </Link>
        </div>

        {/* Desktop links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
        </div>

        {/* User actions */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end z-50 flex gap-5 items-center">
              <div tabIndex={0} role="button" className=" btn-ghost  avatar">
                <div className="w-12 border-2 border-gray-300 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    referrerPolicy="no-referrer"
                    src={
                      user.photoURL ||
                      'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 z-50 mt-52 w-56 p-2 shadow"
              >
                <li className="font-bold">{user.displayName}</li>
                <li className="text-xs border-b-2 pb-1">{user.email}</li>
                <li className="text-xs mt-2">Profile</li>
                <li className="text-xs pb-4 mt-1"> Sitting</li>
              </ul>

              <button
                onClick={signOut}
                className="btn rounded-full btn-outline hover:text-white hover:bg-[#092052] text-amber-400 bg-white md:py-5 md:px-5 hover:scale-105"
              >
                <LogOut />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn bg-[#092052] text-white rounded-3xl md:px-6 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300"
            >
              Sign in <IoMdLogIn size={20} />
            </Link>
          )}
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Navbar;
