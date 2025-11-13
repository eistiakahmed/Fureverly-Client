  import React, { useContext, useEffect, useState } from 'react';
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
        .then(() => toast.success('Logged out successfully!'))
        .catch((err) => toast.error(err.message));
    };

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
      const html = document.querySelector('html');
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }, [theme]);

    const handleTheme = (checked) => {
      setTheme(checked ? 'dark' : 'light');
    };

    const links = (
      <>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium text-base md:text-lg px-3 py-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'dark:text-black dark:bg-white text-amber-400 bg-amber-100'
                  : 'text-[#092052] bg-white dark:bg-black dark:text-white hover:text-amber-500'
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
              `font-medium text-base md:text-lg px-3 py-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'dark:text-black dark:bg-white text-amber-400 bg-amber-100'
                  : 'text-[#092052] bg-white dark:bg-black dark:text-white hover:text-amber-500'
              }`
            }
          >
            <MdOutlinePets /> Pets & Supplies
          </NavLink>
        </li>

        {user && (
          <>
            <li>
              <NavLink
                to="/addListing"
                className={({ isActive }) =>
                  `font-medium text-base md:text-lg px-3 py-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'dark:text-black dark:bg-white text-amber-400 bg-amber-100'
                      : 'text-[#092052] bg-white dark:bg-black dark:text-white hover:text-amber-500'
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
                  `font-medium text-base md:text-lg px-3 py-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'dark:text-black dark:bg-white text-amber-400 bg-amber-100'
                      : 'text-[#092052] bg-white dark:bg-black dark:text-white hover:text-amber-500'
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
                  `font-medium text-base md:text-lg px-3 py-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'dark:text-black dark:bg-white text-amber-400 bg-amber-100'
                      : 'text-[#092052] bg-white dark:bg-black dark:text-white hover:text-amber-500'
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
      <nav className="dark:bg-black bg-base-100 shadow-sm py-2">
        <div className="navbar w-11/12 mx-auto flex justify-between items-center">
          
          <div className="flex items-center gap-2">
            
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>

            
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="Fureverly Logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full"
              />
              <span className="text-xl md:text-3xl font-bold YesevaOne text-[#092052] dark:text-white">
                Fureverly
              </span>
            </Link>
          </div>

          
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal space-x-2">{links}</ul>
          </div>

          
          <div className="flex items-center gap-3">
            
            <input
              onChange={(e) => handleTheme(e.target.checked)}
              type="checkbox"
              defaultChecked={localStorage.getItem('theme') === 'dark'}
              className="toggle"
            />

            {user ? (
              <div className="flex items-center gap-3">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="avatar">
                    <div className="w-10 md:w-12 border-2 border-gray-300 rounded-full">
                      <img
                        alt="User avatar"
                        referrerPolicy="no-referrer"
                        src={
                          user.photoURL ||
                          'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                        }
                      />
                    </div>
                  </div>

                  <ul
                    tabIndex={-1}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-2 shadow"
                  >
                    <li className="font-bold">{user.displayName}</li>
                    <li className="text-xs border-b pb-1">{user.email}</li>
                    <li className="text-xs mt-2">Profile</li>
                    <li className="text-xs pb-4 mt-1">Setting</li>

                    <button
                      onClick={signOut}
                      className="btn rounded-full btn-outline text-amber-400 hover:text-white hover:bg-[#092052] bg-white flex items-center gap-2 justify-center mt-2"
                    >
                      <LogOut /> Logout
                    </button>
                  </ul>
                </div>

                
                <button
                  onClick={signOut}
                  className="hidden md:flex btn rounded-full btn-outline hover:text-white hover:bg-[#092052] text-amber-400 bg-white items-center gap-2 transition-all duration-200"
                >
                  <LogOut /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn bg-[#092052] text-white rounded-full px-4 md:px-6 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300"
              >
                Sign in <IoMdLogIn size={20} />
              </Link>
            )}
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </nav>
    );
  };

  export default Navbar;
