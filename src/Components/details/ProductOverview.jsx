import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Mail, Phone, User, Tag, Heart, Share2 } from 'lucide-react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ProductOverview = ({ product, onAdopt, onBuy, onContact }) => {
  const {
    name,
    category,
    description,
    price: Price = 0, // Normalize price field
    location,
    date,
    email,
    phone,
    ownerName,
    status = 'Available'
  } = product;

  // Generate random rating for demo
  const rating = 4.5;
  const reviewCount = Math.floor(Math.random() * 50 + 10);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" size={16} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" size={16} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" size={16} />);
    }
    return stars;
  };

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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#092052] dark:text-white mb-2">
              {name}
            </h1>
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                {status}
              </span>
              <span className="bg-[#F5B22C]/10 text-[#F5B22C] px-3 py-1 rounded-full text-sm font-medium">
                <Tag size={14} className="inline mr-1" />
                {category}
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-100 hover:text-red-500 transition-colors duration-200">
              <Heart size={20} />
            </button>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-200">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            {renderStars(rating)}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {rating} ({reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mb-6">
          {Price === 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-green-600">Free</span>
              <span className="text-lg text-gray-600 dark:text-gray-400">for Adoption</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-[#092052] dark:text-[#F5B22C]">
                ${Price}
              </span>
              <span className="text-lg text-gray-600 dark:text-gray-400">BDT</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold text-[#092052] dark:text-white mb-3">
          Description
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {description || `This beautiful ${category.toLowerCase()} is looking for a loving home. Well-trained, friendly, and great with children and other pets. All vaccinations are up to date and health records are available.`}
        </p>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-xl font-semibold text-[#092052] dark:text-white mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <User className="text-blue-600 dark:text-blue-400" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Owner</p>
              <p className="font-medium">{ownerName || 'Pet Owner'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Mail className="text-green-600 dark:text-green-400" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium">{email}</p>
            </div>
          </div>
          
          {phone && (
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Phone className="text-purple-600 dark:text-purple-400" size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="font-medium">{phone}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <MapPin className="text-red-600 dark:text-red-400" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
              <p className="font-medium">{location}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Calendar className="text-yellow-600 dark:text-yellow-400" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Listed</p>
              <p className="font-medium">{date}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button
          onClick={Price === 0 ? onAdopt : onBuy}
          disabled={status.toLowerCase() !== 'available'}
          className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
            status.toLowerCase() !== 'available'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#092052] dark:bg-[#F5B22C] text-white dark:text-[#092052] hover:bg-[#0a2458] dark:hover:bg-[#e0a32a] shadow-lg hover:shadow-xl transform hover:-translate-y-1'
          }`}
        >
          {status.toLowerCase() !== 'available' 
            ? `Not ${Price === 0 ? 'Available for Adoption' : 'Available for Purchase'}`
            : Price === 0 
              ? 'Adopt Now' 
              : 'Buy Now'
          }
        </button>
        
        <button
          onClick={onContact}
          className="flex-1 sm:flex-none sm:px-8 py-4 px-6 rounded-xl font-semibold text-lg border-2 border-[#092052] dark:border-[#F5B22C] text-[#092052] dark:text-[#F5B22C] hover:bg-[#092052] dark:hover:bg-[#F5B22C] hover:text-white dark:hover:text-[#092052] transition-all duration-300"
        >
          Contact Owner
        </button>
      </motion.div>
    </div>
  );
};

export default ProductOverview;