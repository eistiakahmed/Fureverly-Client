import React from 'react';

const Grid = ({
  children,
  cols = 1,
  gap = 'md',
  className = '',
  responsive = true,
  ...props
}) => {
  const gaps = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const getResponsiveCols = (cols) => {
    if (!responsive) return `grid-cols-${cols}`;
    
    // Default responsive patterns
    const responsivePatterns = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
    };

    return responsivePatterns[cols] || `grid-cols-${cols}`;
  };

  return (
    <div 
      className={`
        grid
        ${getResponsiveCols(cols)}
        ${gaps[gap]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Grid;