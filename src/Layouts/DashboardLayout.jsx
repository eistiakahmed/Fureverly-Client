import React, { useContext, useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { useTheme } from '../Context/ThemeContext';
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
  Bell,
  Search,
  Moon,
  Sun,
  HelpCircle,
  Shield,
  Activity,
  TrendingUp,
  Calendar,
  Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from '../assets/logo.png';

const DashboardLayout = () => {
  const { user, userRole, logOut } = useContext(AuthContext);
  const { theme, toggleTheme, isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setProfileDropdownOpen(false);
      setNotificationDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success('Logged out successfully!');
        navigate('/');
      })
      .catch((err) => toast.error(err.message));
  };

  const userMenuItems = [
    {
      to: '/dashboard',
      label: 'Overview',
      icon: <BarChart3 size={20} />,
      description: 'Dashboard overview and analytics',
    },
    {
      to: '/dashboard/my-listings',
      label: 'My Listings',
      icon: <Package size={20} />,
      description: 'Manage your pet listings',
    },
    {
      to: '/dashboard/my-orders',
      label: 'My Orders',
      icon: <ShoppingCart size={20} />,
      description: 'Track your orders and purchases',
    },
    {
      to: '/dashboard/add-listing',
      label: 'Add Listing',
      icon: <Plus size={20} />,
      description: 'Create a new pet listing',
    },
    {
      to: '/dashboard/profile',
      label: 'Profile',
      icon: <User size={20} />,
      description: 'Manage your profile information',
    },
  ];

  const adminMenuItems = [
    {
      to: '/dashboard/admin',
      label: 'Admin Overview',
      icon: <BarChart3 size={20} />,
      description: 'Platform analytics and insights',
    },
    {
      to: '/dashboard/admin/users',
      label: 'User Management',
      icon: <Users size={20} />,
      description: 'Manage platform users',
    },
    {
      to: '/dashboard/admin/products',
      label: 'Product Management',
      icon: <Package size={20} />,
      description: 'Manage all listings and products',
    },
  ];

  const menuItems =
    userRole === 'admin'
      ? [...adminMenuItems, ...userMenuItems.slice(-1)]
      : userMenuItems;

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'New order received',
      message: 'Order #12345 has been placed',
      time: '2 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Listing approved',
      message: 'Your pet listing has been approved',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Profile updated',
      message: 'Your profile information has been updated',
      time: '2 hours ago',
      unread: false,
    },
  ];

  const SidebarLink = ({ item, mobile = false }) => {
    const isActive = location.pathname === item.to;

    return (
      <NavLink
        to={item.to}
        onClick={() => mobile && setSidebarOpen(false)}
        className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
          isActive
            ? 'bg-linear-to-r from-[#F5B22C] to-[#F5B22C]/80 text-white shadow-lg shadow-[#F5B22C]/25'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-[#092052] dark:hover:text-white'
        }`}
      >
        <div
          className={`p-1 rounded-lg ${isActive ? 'bg-white/20' : 'group-hover:bg-[#F5B22C]/10'}`}
        >
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-medium text-sm">{item.label}</span>
          {!mobile && (
            <p className="text-xs opacity-75 truncate mt-0.5">
              {item.description}
            </p>
          )}
        </div>
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute right-2 w-2 h-2 bg-white rounded-full"
          />
        )}
      </NavLink>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Enhanced Top Navbar */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={Logo} alt="Fureverly" className="h-8 w-8" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-[#092052] dark:text-white">
                    Dashboard
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {userRole || 'user'} panel
                  </p>
                </div>
              </div>
            </div>

            {/* Center - Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search listings, orders, users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B22C] focus:bg-white dark:focus:bg-gray-600 transition-all"
                />
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationDropdownOpen(!notificationDropdownOpen);
                  }}
                  className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Bell size={18} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter((n) => n.unread).length}
                  </span>
                </button>

                <AnimatePresence>
                  {notificationDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 max-h-96 overflow-y-auto"
                    >
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Notifications
                        </h3>
                      </div>
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                            notification.unread
                              ? 'bg-blue-50 dark:bg-blue-900/20'
                              : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileDropdownOpen(!profileDropdownOpen);
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="relative">
                    <img
                      src={
                        user?.photoURL || 'https://i.ibb.co/2FsfXqM/user.png'
                      }
                      alt="Profile"
                      className="w-8 h-8 object-cover rounded-full border-2 border-[#F5B22C]"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {userRole || 'user'}
                    </p>
                  </div>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user?.displayName || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user?.email}
                        </p>
                      </div>

                      <NavLink
                        to="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <User size={16} />
                        Profile Settings
                      </NavLink>

                      <NavLink
                        to="/"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Home size={16} />
                        Back to Website
                      </NavLink>

                      

                      <hr className="my-2 border-gray-200 dark:border-gray-700" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Enhanced Desktop Sidebar */}
        <aside className="hidden lg:block w-72 min-h-screen bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50">
          <div className="p-6">
            {/* User Info Card */}
            <div className="bg-linear-to-r from-[#092052] to-[#F5B22C] rounded-xl p-4 mb-6 text-white">
              <div className="flex items-center gap-3">
                <img
                  src={user?.photoURL || 'https://i.ibb.co/2FsfXqM/user.png'}
                  alt="Profile"
                  className="w-12 h-12 object-cover rounded-full border-2 border-white/30"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-xs opacity-80 capitalize">
                    {userRole || 'user'} account
                  </p>
                </div>
                <Shield size={16} className="opacity-80" />
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-4">
                Navigation
              </p>
              {menuItems.map((item, index) => (
                <SidebarLink key={index} item={item} />
              ))}
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Quick Stats
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Active Listings
                  </span>
                  <span className="text-sm font-semibold text-[#092052] dark:text-white">
                    12
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total Orders
                  </span>
                  <span className="text-sm font-semibold text-[#092052] dark:text-white">
                    8
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    This Month
                  </span>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={12} className="text-green-500" />
                    <span className="text-sm font-semibold text-green-500">
                      +15%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed lg:hidden inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 shadow-xl pt-16"
              >
                <div className="p-6">
                  <nav className="space-y-2">
                    {menuItems.map((item, index) => (
                      <SidebarLink key={index} item={item} mobile={true} />
                    ))}
                  </nav>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
