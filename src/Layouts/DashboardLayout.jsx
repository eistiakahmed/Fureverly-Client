import React, { useContext, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Package,
  ShoppingCart,
  Plus,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from '../assets/logo.png';

const DashboardLayout = () => {
  const { user, userRole, logOut } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success('Logged out successfully!');
        navigate('/');
      })
      .catch((err) => toast.error(err.message));
  };

  const userMenuItems = [
    { to: '/dashboard', label: 'Dashboard Home', icon: <Home size={20} /> },
    {
      to: '/dashboard/my-listings',
      label: 'My Listings',
      icon: <Package size={20} />,
    },
    {
      to: '/dashboard/my-orders',
      label: 'My Orders',
      icon: <ShoppingCart size={20} />,
    },
    {
      to: '/dashboard/add-listing',
      label: 'Add Listing',
      icon: <Plus size={20} />,
    },
  ];

  const adminMenuItems = [
    {
      to: '/dashboard/admin',
      label: 'Admin Overview',
      icon: <BarChart3 size={20} />,
    },
    {
      to: '/dashboard/admin/users',
      label: 'Manage Users',
      icon: <Users size={20} />,
    },
    {
      to: '/dashboard/admin/products',
      label: 'Manage Products',
      icon: <Package size={20} />,
    },
    {
      to: '/dashboard/admin/orders',
      label: 'Manage Orders',
      icon: <ShoppingCart size={20} />,
    },
    {
      to: '/dashboard/admin/settings',
      label: 'Settings',
      icon: <Settings size={20} />,
    },
  ];

  console.log(userRole);

  const menuItems = userRole === 'admin' ? [...adminMenuItems] : userMenuItems;

  const SidebarLink = ({ item, mobile = false }) => (
    <NavLink
      to={item.to}
      onClick={() => mobile && setSidebarOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-[#F5B22C] text-white shadow-md'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`
      }
    >
      {item.icon}
      <span className="font-medium">{item.label}</span>
    </NavLink>
  );

  return (
    <div className="min-h-screen max-w-11/12 mx-auto bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div className="flex items-center gap-3">
                <img src={Logo} alt="Fureverly" className="h-8 w-8" />
                <h1 className="text-xl font-bold text-[#092052] dark:text-white">
                  Dashboard
                </h1>
              </div>
            </div>

            {/* Right side - Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <img
                  src={user?.photoURL || 'https://i.ibb.co/2FsfXqM/user.png'}
                  alt="Profile"
                  className="w-12 h-12 object-cover rounded-full border-2 border-orange-300"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {userRole || 'user'}
                  </p>
                </div>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                  >
                    <NavLink
                      to="/dashboard/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User size={16} />
                      Profile
                    </NavLink>
                    <NavLink
                      to="/dashboard/profile-settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Settings size={16} />
                      Settings
                    </NavLink>
                    <NavLink
                      to="/"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Home size={16} />
                      Back to Home
                    </NavLink>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 min-h-[48vw] bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <SidebarLink key={index} item={item} />
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed lg:hidden inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 pt-16"
            >
              <div className="p-6">
                <nav className="space-y-2">
                  {menuItems.map((item, index) => (
                    <SidebarLink key={index} item={item} mobile={true} />
                  ))}
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
