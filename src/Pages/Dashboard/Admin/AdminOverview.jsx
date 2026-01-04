import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Activity,
  DollarSign,
  Eye,
  AlertCircle
} from 'lucide-react';
import { RingLoader } from 'react-spinners';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const AdminOverview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, [user]);

  const fetchAdminData = async () => {
    try {
      const token = await user?.getIdToken();
      
      const [statsRes, usersRes, ordersRes] = await Promise.all([
        fetch('https://fureverly-server.vercel.app/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://fureverly-server.vercel.app/admin/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://fureverly-server.vercel.app/admin/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const adminStats = await statsRes.json();
      const users = await usersRes.json();
      const orders = await ordersRes.json();

      setStats(adminStats);
      setRecentUsers(users.slice(0, 5));
      setRecentOrders(orders.slice(0, 5));

    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sample data for charts
  const monthlyGrowth = [
    { month: 'Jan', users: 120, products: 45, orders: 89 },
    { month: 'Feb', users: 150, products: 52, orders: 112 },
    { month: 'Mar', users: 180, products: 61, orders: 134 },
    { month: 'Apr', users: 220, products: 78, orders: 167 },
    { month: 'May', users: 280, products: 89, orders: 201 },
    { month: 'Jun', users: 350, products: 102, orders: 245 }
  ];

  const categoryDistribution = [
    { name: 'Pets', value: 45, color: '#092052' },
    { name: 'Pet Food', value: 30, color: '#F5B22C' },
    { name: 'Accessories', value: 15, color: '#10B981' },
    { name: 'Care Products', value: 10, color: '#EF4444' }
  ];

  const userActivity = [
    { day: 'Mon', active: 120 },
    { day: 'Tue', active: 150 },
    { day: 'Wed', active: 180 },
    { day: 'Thu', active: 200 },
    { day: 'Fri', active: 170 },
    { day: 'Sat', active: 220 },
    { day: 'Sun', active: 190 }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RingLoader color="#092052" size={60} />
      </div>
    );
  }

  const StatCard = ({ title, value, icon, color, change, changeType }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <TrendingUp 
                size={16} 
                className={changeType === 'increase' ? 'text-green-500' : 'text-red-500'} 
              />
              <span className={`text-sm ml-1 ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {changeType === 'increase' ? '+' : '-'}{change}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#092052] to-[#F5B22C] rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Overview</h1>
        <p className="opacity-90">Monitor platform performance and manage all activities</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers || 0}
          icon={<Users size={28} className="text-white" />}
          color="bg-blue-500"
          change={15}
          changeType="increase"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts || 0}
          icon={<Package size={28} className="text-white" />}
          color="bg-green-500"
          change={8}
          changeType="increase"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders || 0}
          icon={<ShoppingCart size={28} className="text-white" />}
          color="bg-purple-500"
          change={12}
          changeType="increase"
        />
        <StatCard
          title="Active Products"
          value={stats.activeProducts || 0}
          icon={<Activity size={28} className="text-white" />}
          color="bg-orange-500"
          change={5}
          changeType="increase"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Growth Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Platform Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stackId="1" stroke="#092052" fill="#092052" />
              <Area type="monotone" dataKey="products" stackId="1" stroke="#F5B22C" fill="#F5B22C" />
              <Area type="monotone" dataKey="orders" stackId="1" stroke="#10B981" fill="#10B981" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Product Categories
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* User Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Weekly User Activity
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userActivity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="active" 
              stroke="#F5B22C" 
              strokeWidth={3}
              dot={{ fill: '#F5B22C', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Users
            </h3>
            <button className="text-[#F5B22C] hover:text-[#092052] text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentUsers.length > 0 ? (
              recentUsers.map((user, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <img
                    src={user.profileImage || 'https://i.ibb.co/2FsfXqM/user.png'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {user.role}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No users found
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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Orders
            </h3>
            <button className="text-[#F5B22C] hover:text-[#092052] text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.length > 0 ? (
              recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Order #{order._id?.slice(-6)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : order.status === 'Completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No orders found
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* System Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertCircle size={20} className="text-orange-500" />
          System Alerts
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <AlertCircle size={16} className="text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Low inventory alert
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                5 products are running low on stock
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Eye size={16} className="text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                New user registrations
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                12 new users registered today
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOverview;