import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Package, 
  ShoppingCart, 
  Plus, 
  TrendingUp,
  Users,
  BarChart3,
  Activity,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router';
import { RingLoader } from 'react-spinners';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const DashboardHome = () => {
  const { user, userRole } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [recentListings, setRecentListings] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const token = await user?.getIdToken();
      
      // Fetch user-specific data
      const [listingsRes, ordersRes] = await Promise.all([
        fetch(`https://fureverly-server.vercel.app/myListing?email=${user.email}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://fureverly-server.vercel.app/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const listings = await listingsRes.json();
      const orders = await ordersRes.json();

      setRecentListings(listings.slice(0, 5));
      setRecentOrders(orders.slice(0, 5));

      setStats({
        totalListings: listings.length,
        totalOrders: orders.length,
        activeListings: listings.filter(l => l.status === 'Available').length,
        pendingOrders: orders.filter(o => o.status === 'Pending').length
      });

      // If admin, fetch additional stats
      if (userRole === 'admin') {
        const adminStatsRes = await fetch('https://fureverly-server.vercel.app/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const adminStats = await adminStatsRes.json();
        setStats(prev => ({ ...prev, ...adminStats }));
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sample chart data
  const monthlyData = [
    { name: 'Jan', listings: 12, orders: 8 },
    { name: 'Feb', listings: 19, orders: 15 },
    { name: 'Mar', listings: 15, orders: 12 },
    { name: 'Apr', listings: 25, orders: 20 },
    { name: 'May', listings: 22, orders: 18 },
    { name: 'Jun', listings: 30, orders: 25 }
  ];

  const categoryData = [
    { name: 'Pets', value: 45, color: '#092052' },
    { name: 'Pet Food', value: 25, color: '#F5B22C' },
    { name: 'Accessories', value: 20, color: '#10B981' },
    { name: 'Care Products', value: 10, color: '#EF4444' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RingLoader color="#092052" size={60} />
      </div>
    );
  }

  const StatCard = ({ title, value, icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-500">+{trend}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-[#092052] to-[#F5B22C] rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.displayName || 'User'}!
        </h1>
        <p className="opacity-90">
          {userRole === 'admin' 
            ? 'Manage your platform and monitor all activities from here.'
            : 'Manage your listings and track your orders from your dashboard.'
          }
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Listings"
          value={stats.totalListings || 0}
          icon={<Package size={24} className="text-white" />}
          color="bg-blue-500"
          trend={12}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders || 0}
          icon={<ShoppingCart size={24} className="text-white" />}
          color="bg-green-500"
          trend={8}
        />
        <StatCard
          title="Active Listings"
          value={stats.activeListings || 0}
          icon={<Activity size={24} className="text-white" />}
          color="bg-yellow-500"
          trend={5}
        />
        {userRole === 'admin' && (
          <StatCard
            title="Total Users"
            value={stats.totalUsers || 0}
            icon={<Users size={24} className="text-white" />}
            color="bg-purple-500"
            trend={15}
          />
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Activity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="listings" fill="#092052" />
              <Bar dataKey="orders" fill="#F5B22C" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Listings
            </h3>
            <Link
              to="/dashboard/my-listings"
              className="text-[#F5B22C] hover:text-[#092052] text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentListings.length > 0 ? (
              recentListings.map((listing, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{listing.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{listing.category}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    listing.status === 'Available' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {listing.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No listings yet
              </p>
            )}
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Orders
            </h3>
            <Link
              to="/dashboard/my-orders"
              className="text-[#F5B22C] hover:text-[#092052] text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.length > 0 ? (
              recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Order #{order._id?.slice(-6)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Pending' 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No orders yet
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/dashboard/add-listing"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-[#F5B22C] hover:bg-[#F5B22C]/5 transition-colors"
          >
            <Plus size={20} className="text-[#F5B22C]" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Add New Listing</span>
          </Link>
          
          <Link
            to="/dashboard/my-listings"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-[#F5B22C] hover:bg-[#F5B22C]/5 transition-colors"
          >
            <Package size={20} className="text-[#F5B22C]" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Manage Listings</span>
          </Link>
          
          <Link
            to="/dashboard/my-orders"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-[#F5B22C] hover:bg-[#F5B22C]/5 transition-colors"
          >
            <ShoppingCart size={20} className="text-[#F5B22C]" />
            <span className="font-medium text-gray-700 dark:text-gray-300">View Orders</span>
          </Link>
          
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-[#F5B22C] hover:bg-[#F5B22C]/5 transition-colors"
          >
            <BarChart3 size={20} className="text-[#F5B22C]" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Update Profile</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;