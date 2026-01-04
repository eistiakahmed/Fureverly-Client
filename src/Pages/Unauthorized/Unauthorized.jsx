import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Shield, Home, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Shield size={48} className="text-red-600 dark:text-red-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Access Denied
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 dark:text-gray-400 mb-8 text-lg"
        >
          You don't have permission to access this page. This area is restricted to administrators only.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#F5B22C] hover:bg-[#092052] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Home size={20} />
            Go to Home
          </Link>
          
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#F5B22C] transition-colors"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Need admin access?</strong> Contact your system administrator to request the appropriate permissions.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;