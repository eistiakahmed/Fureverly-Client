import React, { useState } from 'react';
import { IoLocationOutline, IoCalendarOutline, IoHeartOutline, IoHeart } from 'react-icons/io5';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import { BiDollarCircle } from 'react-icons/bi';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate random rating if not provided (for demo purposes)
  const rating = product.rating || (Math.random() * 2 + 3).toFixed(1);
  const price = product.price || `$${Math.floor(Math.random() * 500 + 100)}`;
  const status = product.status || 'Available';
  const datePosted = product.datePosted || new Date().toLocaleDateString();

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" size={14} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" size={14} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" size={14} />);
    }
    return stars;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'adopted':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700 h-[480px] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
            <MdPets className="text-gray-400" size={48} />
          </div>
        )}
        <motion.img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-[#092052] dark:text-[#F5B22C] text-sm font-semibold px-3 py-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-600">
            {product.category}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>

        {/* Like Button */}
        <motion.button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute bottom-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLiked ? (
            <IoHeart className="text-red-500" size={20} />
          ) : (
            <IoHeartOutline className="text-gray-600 dark:text-gray-400" size={20} />
          )}
        </motion.button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold text-[#092052] dark:text-white group-hover:text-[#F5B22C] transition-colors duration-300 mb-2 line-clamp-1">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 flex-1">
          {product.description || `Beautiful ${product.category.toLowerCase()} looking for a loving home. Well-trained and friendly with children and other pets.`}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 mb-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <IoLocationOutline className="text-red-500 flex-shrink-0" size={16} />
            <span className="truncate">{product.location}</span>
          </div>

          {/* Price and Date */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-[#092052] dark:text-[#F5B22C] font-semibold">
              <BiDollarCircle size={16} />
              <span>{price}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <IoCalendarOutline size={14} />
              <span>{datePosted}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {renderStars(rating)}
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                ({rating})
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {Math.floor(Math.random() * 50 + 10)} reviews
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <Link to={`/product/${product._id}`} className="mt-auto">
          <motion.button
            className="w-full bg-[#092052] dark:bg-[#F5B22C] text-white dark:text-[#092052] py-3 rounded-full font-semibold hover:bg-[#0a2458] dark:hover:bg-[#e0a32a] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MdPets size={18} />
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
