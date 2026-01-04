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
import { FaHome, FaSun, FaMoon } from 'react-icons/fa';
import { MdOutlinePets } from 'react-icons/md';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { BsPersonCircle } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const signOut = () => {
    logOut()
      .then(() => toast.success('Logged out successfully!'))
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    {
      to: '/',
      label: 'Home',
      icon: <FaHome size={18} />,
      public: true
    },
    {
      to: '/petsAndSupplies',
      label: 'Pets & Supplies',
      icon: <MdOutlinePets size={20} />,
      public: true
    },
    {
      to: '/addListing',
      label: 'Add Listing',
      icon: <ShoppingBasket size={18} />,
      public: false
    },
    {
      to: '/myListings',
      label: 'My Listings',
      icon: <PackageSearch size={18} />,
      public: false
    },
    {
      to: '/myOrders',
      label: 'My Orders',
      icon: <ShoppingCart size={18} />,
      public: false
    }
  ];

  const visibleLinks = navLinks.filter(link => link.public || user);

  const NavLinkComponent = ({ link, mobile = false }) => (
    <NavLink
      to={link.to}
      onClick={mobile ? closeMobileMenu : undefined}
      className={({ isActive }) =>
        `font-medium text-base px-4 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 ${
          mobile ? 'w-full justify-start' : ''
        } ${
          isActive
            ? 'bg-[#F5B22C] text-white shadow-lg transform scale-105'
            : 'text-[#092052] dark:text-white hover:bg-[#F5B22C]/10 hover:text-[#F5B22C] hover:scale-105'
        }`
      }
    >
      {link.icon}
      <span>{link.label}</span>
    </NavLink>
  );

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <img
                    src={logo}
                    alt="Fureverly Logo"
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 rounded-full bg-[#F5B22C]/20 scale-0 group-hover:scale-110 transition-transform duration-300"></div>
                </div>
                <span className="text-2xl lg:text-3xl font-bold YesevaOne text-[#092052] dark:text-white group-hover:text-[#F5B22C] transition-colors duration-300">
                  Fureverly
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden lg:flex items-center space-x-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {visibleLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <NavLinkComponent link={link} />
                </motion.div>
              ))}
            </motion.div>

            {/* Right Side Actions */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[#092052] dark:text-[#F5B22C] hover:bg-[#F5B22C]/10 dark:hover:bg-[#F5B22C]/10 transition-all duration-300 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                <AnimatePresence mode="wait">
                  {theme === 'light' ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaMoon size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaSun size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* User Section */}
              {user ? (
                <div className="flex items-center gap-3">
                  {/* Profile Dropdown */}
                  <div className="relative group">
                    <motion.button
                      className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[#F5B22C] overflow-hidden">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#F5B22C]/10 flex items-center justify-center">
                            <BsPersonCircle className="text-[#F5B22C]" size={24} />
                          </div>
                        )}
                      </div>
                    </motion.button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-semibold text-[#092052] dark:text-white truncate">
                          {user.displayName || 'User'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/myProfile"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <BsPersonCircle size={18} />
                          My Profile
                        </Link>
                        <button
                          onClick={signOut}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                          <LogOut size={18} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Logout Button */}
                  <motion.button
                    onClick={signOut}
                    className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Sign Out</span>
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="flex items-center gap-2 bg-[#092052] text-white px-4 lg:px-6 py-2.5 rounded-full font-semibold hover:bg-[#0a2458] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <IoMdLogIn size={20} />
                    <span>Sign In</span>
                  </Link>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg text-[#092052] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiX size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiMenuAlt3 size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <div className="px-4 py-4 space-y-2">
                {visibleLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <NavLinkComponent link={link} mobile />
                  </motion.div>
                ))}
                
                {/* Mobile User Info */}
                {user && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * visibleLinks.length }}
                    className="pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-10 h-10 rounded-full border-2 border-[#F5B22C] overflow-hidden">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#F5B22C]/10 flex items-center justify-center">
                            <BsPersonCircle className="text-[#F5B22C]" size={20} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#092052] dark:text-white truncate">
                          {user.displayName || 'User'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <Link
                        to="/myProfile"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-full text-[#092052] dark:text-white hover:bg-[#F5B22C]/10 transition-colors duration-200"
                      >
                        <BsPersonCircle size={18} />
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          closeMobileMenu();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#374151' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#374151',
            border: `1px solid ${theme === 'dark' ? '#4B5563' : '#E5E7EB'}`,
          },
        }}
      />
    </>
  );
};

export default Navbar;
