import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 
    disabled:cursor-not-allowed touch-target
  `;

  const variants = {
    primary: `
      bg-[#092052] text-white hover:bg-[#0a2458] focus:ring-[#092052] 
      border border-[#092052] hover:border-[#0a2458]
    `,
    secondary: `
      bg-[#F5B22C] text-white hover:bg-[#e0a32a] focus:ring-[#F5B22C] 
      border border-[#F5B22C] hover:border-[#e0a32a]
    `,
    outline: `
      bg-transparent text-[#092052] dark:text-white border border-[#092052] 
      dark:border-white hover:bg-[#092052] hover:text-white 
      dark:hover:bg-white dark:hover:text-[#092052] focus:ring-[#092052]
    `,
    ghost: `
      bg-transparent text-[#092052] dark:text-white hover:bg-gray-100 
      dark:hover:bg-gray-800 focus:ring-gray-300 border border-transparent
    `,
    danger: `
      bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 
      border border-red-600 hover:border-red-700
    `,
    success: `
      bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 
      border border-green-600 hover:border-green-700
    `
  };

  const sizes = {
    xs: 'px-2 py-1 text-xs rounded-md',
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-xl'
  };

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
};

export default Button;