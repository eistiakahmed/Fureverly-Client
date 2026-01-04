import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import ProductGrid from '../../components/listings/ProductGrid';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';

const PetsAndSupplies = () => {
  const data = useLoaderData();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    if (data) {
      setProducts(data);
      setLoading(false);
    }
  }, [data]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value.trim();

    if (!search_text) {
      setProducts(data);
      return;
    }

    setLoading(true);
    setError(null);
    
    fetch(`https://fureverly-server.vercel.app/searchName?search=${search_text}`)
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to search products. Please try again.');
        setLoading(false);
      });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === 'All') {
      setProducts(data);
      return;
    }

    setLoading(true);
    setError(null);
    
    fetch(`https://fureverly-server.vercel.app/filterCategory?search=${selectedCategory}`)
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to filter products. Please try again.');
        setLoading(false);
      });
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
            <form
              onSubmit={handleSearch}
              className="flex flex-col lg:flex-row items-center gap-4"
            >
              {/* Search Input */}
              <div className="relative flex-1 w-full">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  name="search"
                  type="text"
                  placeholder="Search by name..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="pl-12 pr-8 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent transition-all duration-200 appearance-none cursor-pointer min-w-[180px]"
                >
                  <option value="All">All Categories</option>
                  <option value="Pets">Pets</option>
                  <option value="Pet Food">Pet Food</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Pet Care Product">Pet Care Product</option>
                </select>
              </div>

              {/* Search Button */}
              <motion.button
                type="submit"
                className="bg-[#092052] dark:bg-[#F5B22C] text-white dark:text-[#092052] font-semibold px-8 py-3 rounded-xl hover:bg-[#0a2458] dark:hover:bg-[#e0a32a] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                <FiSearch size={18} />
                Search
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Results Counter */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center bg-[#092052] dark:bg-[#F5B22C] text-white dark:text-[#092052] px-6 py-3 rounded-full font-medium shadow-lg">
              <span>
                Showing {products?.length || 0} {products?.length === 1 ? 'item' : 'items'}
                {category !== 'All' && ` in ${category}`}
              </span>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            emptyMessage="No pets or supplies available right now. Try adjusting your search or category filter."
            skeletonCount={12}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PetsAndSupplies;
