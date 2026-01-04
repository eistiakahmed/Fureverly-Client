import React from 'react';

const Container = ({ 
  children, 
  size = 'default',
  padding = 'default',
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'max-w-3xl',
    default: 'max-w-7xl',
    lg: 'max-w-full',
    full: 'w-full max-w-none'
  };

  const paddings = {
    none: '',
    sm: 'px-4',
    default: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12'
  };

  return (
    <div 
      className={`
        mx-auto w-full
        ${sizes[size]}
        ${paddings[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;