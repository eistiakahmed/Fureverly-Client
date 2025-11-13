import React from 'react';
import { Link } from 'react-router';
import image from '../../assets/errorDog.png';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 min-h-screen bg-linear-to-br from-amber-50 to-amber-200 dark:from-gray-900 dark:to-gray-800 px-6 py-10">
      <motion.img
        src={image}
        alt="Lost dog illustration"
        className="w-3/4 max-w-[300px] md:max-w-[380px] drop-shadow-2xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="flex flex-col items-center text-center space-y-4 md:text-left md:items-start"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-[80px] sm:text-[100px] md:text-[140px] lg:text-[180px] font-extrabold text-[#092052] dark:text-white drop-shadow-md leading-none">
          404
        </h1>
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1a2950] dark:text-gray-300 mb-4">
          Oops! Page Not Found
        </h3>
        <p className="text-gray-700 dark:text-gray-400 max-w-sm sm:max-w-md md:max-w-lg mb-6">
          The page you’re looking for doesn’t exist or has been moved. Let’s get
          you back home safely.
        </p>
        <Link
          to="/"
          className="bg-[#092052] dark:bg-[#0c2a6a] text-white px-6 sm:px-8 py-3 rounded-xl text-lg font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
