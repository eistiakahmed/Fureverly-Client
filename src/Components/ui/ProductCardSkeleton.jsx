import React from 'react';
import { motion } from 'framer-motion';

const ProductCardSkeleton = () => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-[480px] border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Skeleton */}
      <div className="relative h-64 bg-gray-200 dark:bg-gray-700 animate-pulse">
        <div className="absolute top-4 left-4 w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
        <div className="absolute top-4 right-4 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
        </div>

        {/* Meta Info */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
        </div>

        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="pt-4">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardSkeleton;