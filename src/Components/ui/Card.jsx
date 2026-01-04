import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  shadow = 'md',
  hover = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = `
    bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
    transition-all duration-200 overflow-hidden
  `;

  const variants = {
    default: 'rounded-xl',
    elevated: 'rounded-xl shadow-lg',
    outlined: 'rounded-xl border-2',
    flat: 'rounded-xl shadow-none border-0 bg-gray-50 dark:bg-gray-900'
  };

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const shadows = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const hoverEffects = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${paddings[padding]}
    ${shadows[shadow]}
    ${hoverEffects}
    ${className}
  `;

  const CardComponent = onClick ? motion.div : 'div';
  const motionProps = onClick ? {
    whileHover: { y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <CardComponent
      className={classes}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-h4 font-semibold text-gray-900 dark:text-white ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-body-sm text-gray-600 dark:text-gray-400 mt-1 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 ${className}`}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;