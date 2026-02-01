import React, { useEffect, useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import ProductGrid from '../../Components/listings/ProductGrid';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiFilter, 
  FiChevronDown, 
  FiChevronLeft, 
  FiChevronRight,
  FiX,
  FiSliders
} from 'react-icons/fi';
import { 
  FaStar, 
  FaMapMarkerAlt, 
  FaDollarSign, 
  FaCalendarAlt,
  FaSortAmountDown,
  FaSortAmountUp
} from 'react-icons/fa';

const PetsAndSupplies = () => {
  const data = useLoaderData();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [rating, setRating] = useState('All');
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState('All');
  
  // UI states
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    console.log('Loader data received:', data);
    if (data && Array.isArray(data) && data.length > 0) {
      console.log('Setting products:', data.length, 'items');
      setAllProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } else if (data && Array.isArray(data) && data.length === 0) {
      console.log('Empty array received');
      setAllProducts([]);
      setFilteredProducts([]);
      setLoading(false);
    } else {
      console.log('No valid data received, trying to fetch manually');
      // Fallback: try to fetch data manually
      fetch('https://fureverly-server.vercel.app/products')
        .then(res => res.json())
        .then(fetchedData => {
          console.log('Manual fetch result:', fetchedData);
          if (fetchedData && Array.isArray(fetchedData)) {
            setAllProducts(fetchedData);
            setFilteredProducts(fetchedData);
          } else {
            setError('Failed to load products');
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Manual fetch error:', err);
          setError('Failed to load products');
          setLoading(false);
        });
    }
  }, [data]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.breed?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Price range filter
    if (priceRange.min !== '' || priceRange.max !== '') {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price) || 0;
        const min = priceRange.min !== '' ? parseFloat(priceRange.min) : 0;
        const max = priceRange.max !== '' ? parseFloat(priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Rating filter
    if (rating !== 'All') {
      const minRating = parseFloat(rating);
      filtered = filtered.filter(product => {
        const productRating = parseFloat(product.rating) || 0;
        return productRating >= minRating;
      });
    }

    // Location filter
    if (location.trim()) {
      filtered = filtered.filter(product =>
        product.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Date range filter
    if (dateRange !== 'All') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case '3months':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        default:
          filterDate.setFullYear(1900);
      }

      filtered = filtered.filter(product => {
        const productDate = new Date(product.createdAt || product.date);
        return productDate >= filterDate;
      });
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allProducts, searchTerm, category, priceRange, rating, location, dateRange, sortBy]);

  // Update displayed products based on pagination
  useEffect(() => {
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    console.log('Pagination update:', {
      filteredCount: filteredProducts.length,
      startIndex,
      endIndex,
      paginatedCount: paginatedProducts.length
    });
    setDisplayedProducts(paginatedProducts);
  }, [filteredProducts, startIndex, endIndex]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value.trim();
    setSearchTerm(search_text);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategory('All');
    setPriceRange({ min: '', max: '' });
    setRating('All');
    setLocation('');
    setDateRange('All');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <title>Fureverly | Pets & Supplies</title>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#092052] dark:text-white mb-4 YesevaOne">
            Pets & Supplies
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Adopt your next best friend or find premium pet supplies 🐾
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  name="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, breed, or description..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent transition-all duration-200 text-lg"
                />
              </div>
            </form>

            {/* Filter Toggle and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiSliders size={18} />
                  Filters
                  <FiChevronDown 
                    className={`transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`}
                    size={16}
                  />
                </motion.button>

                {(searchTerm || category !== 'All' || priceRange.min || priceRange.max || rating !== 'All' || location || dateRange !== 'All') && (
                  <motion.button
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiX size={16} />
                    Clear Filters
                  </motion.button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <FaSortAmountDown className="text-gray-400" size={16} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[#F5B22C] transition-all duration-200"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200 dark:border-gray-600 pt-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <div className="relative">
                        <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="All">All Categories</option>
                          <option value="Pets">Pets</option>
                          <option value="Pet Food">Pet Food</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Pet Care Product">Pet Care Product</option>
                        </select>
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price Range
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="number"
                            placeholder="Min"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                            className="w-full pl-8 pr-3 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent transition-all duration-200"
                          />
                        </div>
                        <div className="relative flex-1">
                          <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                          <input
                            type="number"
                            placeholder="Max"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                            className="w-full pl-8 pr-3 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Minimum Rating
                      </label>
                      <div className="relative">
                        <FaStar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="All">Any Rating</option>
                          <option value="4">4+ Stars</option>
                          <option value="3">3+ Stars</option>
                          <option value="2">2+ Stars</option>
                          <option value="1">1+ Stars</option>
                        </select>
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          placeholder="Enter location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Date Range Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Posted Date
                      </label>
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <select
                          value={dateRange}
                          onChange={(e) => setDateRange(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="All">Any Time</option>
                          <option value="today">Today</option>
                          <option value="week">This Week</option>
                          <option value="month">This Month</option>
                          <option value="3months">Last 3 Months</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Results Counter and Info */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="inline-flex items-center bg-[#092052] dark:bg-[#F5B22C] text-white dark:text-[#092052] px-6 py-3 rounded-full font-medium shadow-lg">
                <span>
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                  {category !== 'All' && ` in ${category}`}
                </span>
              </div>
              
              {filteredProducts.length > itemsPerPage && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Debug Info - Remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm">
              Debug: Loading={loading.toString()}, Error={error || 'none'}, 
              AllProducts={allProducts.length}, Filtered={filteredProducts.length}, 
              Displayed={displayedProducts.length}
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div>
          <ProductGrid
            products={displayedProducts}
            loading={loading}
            error={error}
            emptyMessage="No pets or supplies match your current filters. Try adjusting your search criteria."
            skeletonCount={12}
          />
        </div>

        {/* Pagination */}
        {!loading && !error && filteredProducts.length > itemsPerPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <motion.button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#092052] hover:text-white dark:hover:bg-[#F5B22C] dark:hover:text-[#092052] shadow-md hover:shadow-lg'
                }`}
                whileHover={currentPage !== 1 ? { scale: 1.02 } : {}}
                whileTap={currentPage !== 1 ? { scale: 0.98 } : {}}
              >
                <FiChevronLeft size={18} />
                Previous
              </motion.button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-[#092052] dark:bg-[#F5B22C] text-white dark:text-[#092052] shadow-lg'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#092052] hover:text-white dark:hover:bg-[#F5B22C] dark:hover:text-[#092052] shadow-md hover:shadow-lg'
                }`}
                whileHover={currentPage !== totalPages ? { scale: 1.02 } : {}}
                whileTap={currentPage !== totalPages ? { scale: 0.98 } : {}}
              >
                Next
                <FiChevronRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PetsAndSupplies;
