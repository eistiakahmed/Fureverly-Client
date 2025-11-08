import React from 'react';
import logo from '../../assets/logo.png';
import { Link, NavLink } from 'react-router';
import { IoMdLogIn } from 'react-icons/io';

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium text-lg px-3 py-1 rounded-full transition-all duration-200 ${
              isActive
                ? 'text-amber-400 bg-amber-100 hover:text-amber-500'
                : 'text-[#092052] bg-white hover:text-amber-500'
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/petsAndSupplies"
          className={({ isActive }) =>
            `font-medium text-lg px-3 py-1 rounded-full transition-all duration-200 ${
              isActive
                ? 'text-amber-400 bg-amber-100 hover:text-amber-500'
                : 'text-[#092052] bg-white hover:text-amber-500'
            }`
          }
        >
          Pets & Supplies
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm py-2">
      <div className="navbar max-w-11/12 mx-auto px-4">
        
        <div className="navbar-start">
          
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost p-2"
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg z-50"
            >
              {links}
            </ul>
          </div>

          
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Fureverly Logo"
              className="w-12 h-12 rounded-full border border-gray-200"
            />
            <span className="text-3xl font-bold YesevaOne text-[#092052]">
              Fureverly
            </span>
          </Link>
        </div>

        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
        </div>

        
        <div className="navbar-end">
          <Link
            to="/login"
            className="btn bg-[#092052] text-white rounded-3xl px-6 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300"
          >
            <IoMdLogIn size={20} /> Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
