import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Package, 
  ShoppingCart, 
  Plus, 
  TrendingUp,
  Users,
  User,
  BarChart3,
  Activity,
  DollarSign,
  Eye,
  Heart,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Target,
  Zap,
  Award,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { RingLoader } from 'react-spinners';
import {
  AreaChart,
  Area,
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
  Line,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';

const DashboardHome = () => {
  const { user, userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [recentListings, setRecentListings] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d, 90d

  useEffect(() => {
    fetchDashboardData();
  }, [user, timeRange]);

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
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

      // Calculate comprehensive stats
      const now = new Date();
      const timeRangeMs = {
        '7d': 7 * 24 * 60 * 60 * 1000,
        '30d': 30 * 24 * 60 * 60 * 1000,
        '90d': 90 * 24 * 60 * 60 * 1000
      };

      const cutoffDate = new Date(now.getTime() - timeRangeMs[timeRange]);
      
      const recentListings = listings.filter(l => new Date(l.createdAt) > cutoffDate);
      const recentOrders = orders.filter(o => new Date(o.createdAt) > cutoffDate);

      setStats({
        totalListings: listings.length,
        totalOrders: orders.length,
        activeListings: listings.filter(l => l.status === 'Available').length,
        pendingOrders: orders.filter(o => o.status === 'Pending').length,
        completedOrders: orders.filter(o => o.status === 'Completed').length,
        totalViews: listings.reduce((sum, l) => sum + (l.views || 0), 0),
        totalRevenue: orders.reduce((sum, o) => sum + (o.price || 0), 0),
        recentListings: recentListings.length,
        recentOrders: recentOrders.length,
        conversionRate: listings.length > 0 ? ((orders.length / listings.length) * 100).toFixed(1) : 0,
        avgOrderValue: orders.length > 0 ? (orders.reduce((sum, o) => sum + (o.price || 0), 0) / orders.length).toFixed(0) : 0
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
      setRefreshing(false);
    }
  };

  // Enhanced chart data with real-time feel
  const performanceData = [
    { name: 'Mon', listings: 12, orders: 8, views: 145, revenue: 2400 },
    { name: 'Tue', listings: 19, orders: 15, views: 189, revenue: 3200 },
    { name: 'Wed', listings: 15, orders: 12, views: 167, revenue: 2800 },
    { name: 'Thu', listings: 25, orders: 20, views: 234, revenue: 4100 },
    { name: 'Fri', listings: 22, orders: 18, views: 198, revenue: 3600 },
    { name: 'Sat', listings: 30, orders: 25, views: 289, revenue: 5200 },
    { name: 'Sun', listings: 28, orders: 22, views: 256, revenue: 4800 }
  ];

  const categoryPerformance = [
    { name: 'Dogs', value: 45, color: '#092052', revenue: 15600 },
    { name: 'Cats', value: 30, color: '#F5B22C', revenue: 12400 },
    { name: 'Birds', value: 15, color: '#10B981', revenue: 6800 },
    { name: 'Others', value: 10, color: '#EF4444', revenue: 4200 }
  ];

  const engagementData = [
    { name: 'Views', value: 85, color: '#3B82F6' },
    { name: 'Inquiries', value: 65, color: '#10B981' },
    { name: 'Adoptions', value: 45, color: '#F59E0B' },
    { name: 'Reviews', value: 78, color: '#8B5CF6' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RingLoader color="#092052" size={60} />
      </div>
    );
  }

  const MetricCard = ({ title, value, icon, color, trend, trendValue, subtitle, onClick }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            {trend && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                trend === 'up' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {trendValue}%
              </div>
            )}
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-200`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  const QuickActionCard = ({ title, description, icon, color, to, badge }) => (
    <Link to={to}>
      <motion.div
        whileHover={{ y: -2, scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-200`}>
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
              {badge && (
                <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium rounded-full">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </div>
          <ArrowUpRight size={16} className="text-gray-400 group-hover:text-[#F5B22C] transition-colors" />
        </div>
      </motion.div>
    </Link>
  );

  return (
    <div className="space-y-8">
      {/* Enhanced Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#092052] via-[#0a2458] to-[#F5B22C] rounded-2xl p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.displayName || 'User'}! 👋
              </h1>
              <p className="text-white/80 text-lg">
                {userRole === 'admin' 
                  ? 'Monitor platform performance and manage all activities.'
                  : 'Track your listings performance and manage your pet adoption journey.'
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="7d" className="text-gray-900">Last 7 days</option>
                <option value="30d" className="text-gray-900">Last 30 days</option>
                <option value="90d" className="text-gray-900">Last 90 days</option>
              </select>
              <button
                onClick={fetchDashboardData}
                disabled={refreshing}
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-2 hover:bg-white/30 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Target className="text-[#F5B22C]" size={24} />
                <div>
                  <p className="text-white/80 text-sm">Conversion Rate</p>
                  <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Zap className="text-yellow-400" size={24} />
                <div>
                  <p className="text-white/80 text-sm">Avg. Order Value</p>
                  <p className="text-2xl font-bold">৳{stats.avgOrderValue}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Award className="text-green-400" size={24} />
                <div>
                  <p className="text-white/80 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold">94.2%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Listings"
          value={stats.totalListings || 0}
          icon={<Package size={24} className="text-white" />}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          trend="up"
          trendValue="12"
          subtitle={`${stats.recentListings || 0} this ${timeRange}`}
          onClick={() => navigate('/dashboard/my-listings')}
        />
        <MetricCard
          title="Total Orders"
          value={stats.totalOrders || 0}
          icon={<ShoppingCart size={24} className="text-white" />}
          color="bg-gradient-to-br from-green-500 to-green-600"
          trend="up"
          trendValue="8"
          subtitle={`${stats.recentOrders || 0} this ${timeRange}`}
          onClick={() => navigate('/dashboard/my-orders')}
        />
        <MetricCard
          title="Total Views"
          value={stats.totalViews || 0}
          icon={<Eye size={24} className="text-white" />}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          trend="up"
          trendValue="23"
          subtitle="Across all listings"
        />
        {userRole === 'admin' ? (
          <MetricCard
            title="Total Users"
            value={stats.totalUsers || 0}
            icon={<Users size={24} className="text-white" />}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
            trend="up"
            trendValue="15"
            subtitle="Platform users"
          />
        ) : (
          <MetricCard
            title="Revenue"
            value={`৳${stats.totalRevenue || 0}`}
            icon={<DollarSign size={24} className="text-white" />}
            color="bg-gradient-to-br from-yellow-500 to-yellow-600"
            trend="up"
            trendValue="18"
            subtitle="Total earnings"
          />
        )}
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="xl:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Performance Overview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Listings, orders, and revenue trends
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Filter size={16} />
                </button>
                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="listingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#092052" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#092052" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5B22C" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F5B22C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="listings" 
                  stroke="#092052" 
                  strokeWidth={3}
                  fill="url(#listingsGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#F5B22C" 
                  strokeWidth={3}
                  fill="url(#ordersGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Category Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Category Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryPerformance}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value}%`, 
                  `${props.payload.name} (৳${props.payload.revenue})`
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 mt-4">
            {categoryPerformance.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {category.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {category.value}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ৳{category.revenue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Engagement Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Engagement Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {engagementData.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke={metric.color}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - metric.value / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {metric.value}%
                  </span>
                </div>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">{metric.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Performance</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <Link
              to="/dashboard/my-listings"
              className="text-[#F5B22C] hover:text-[#092052] text-sm font-medium flex items-center gap-1"
            >
              View All <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {recentListings.length > 0 ? (
              recentListings.map((listing, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {listing.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {listing.category}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(listing.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      listing.status === 'Available' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {listing.status}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <Eye size={12} />
                      <span className="text-xs">{listing.views || 0}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Package className="mx-auto text-gray-400 mb-3" size={48} />
                <p className="text-gray-500 dark:text-gray-400">No recent listings</p>
                <Link
                  to="/dashboard/add-listing"
                  className="text-[#F5B22C] hover:text-[#092052] text-sm font-medium mt-2 inline-block"
                >
                  Create your first listing
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h3>
          
          <QuickActionCard
            title="Add New Listing"
            description="Create a new pet listing to find loving homes"
            icon={<Plus size={20} className="text-white" />}
            color="bg-gradient-to-br from-[#092052] to-[#0a2458]"
            to="/dashboard/add-listing"
          />
          
          <QuickActionCard
            title="Manage Orders"
            description="Review and process pending adoption requests"
            icon={<ShoppingCart size={20} className="text-white" />}
            color="bg-gradient-to-br from-green-500 to-green-600"
            to="/dashboard/my-orders"
            badge={stats.pendingOrders > 0 ? stats.pendingOrders : null}
          />
          
          <QuickActionCard
            title="View Analytics"
            description="Track your listings performance and insights"
            icon={<BarChart3 size={20} className="text-white" />}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            to="/dashboard/analytics"
          />
          
          <QuickActionCard
            title="Update Profile"
            description="Keep your profile information up to date"
            icon={<User size={20} className="text-white" />}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            to="/dashboard/profile"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;