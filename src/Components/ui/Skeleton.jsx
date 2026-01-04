import React from 'react';

const Skeleton = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4',
  rounded = 'rounded',
  ...props 
}) => {
  return (
    <div
      className={`skeleton ${width} ${height} ${rounded} ${className}`}
      {...props}
    />
  );
};

// Pre-built skeleton components for common use cases
const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 ${className}`}>
    <Skeleton height="h-48" className="mb-4" rounded="rounded-lg" />
    <Skeleton height="h-6" width="w-3/4" className="mb-2" />
    <Skeleton height="h-4" width="w-1/2" className="mb-4" />
    <div className="flex justify-between items-center">
      <Skeleton height="h-8" width="w-20" rounded="rounded-full" />
      <Skeleton height="h-10" width="w-24" rounded="rounded-lg" />
    </div>
  </div>
);

const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        height="h-4"
        width={index === lines - 1 ? 'w-3/4' : 'w-full'}
      />
    ))}
  </div>
);

const SkeletonAvatar = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <Skeleton
      width={sizes[size]}
      height={sizes[size]}
      rounded="rounded-full"
      className={className}
    />
  );
};

const SkeletonButton = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-8 w-20',
    md: 'h-10 w-24',
    lg: 'h-12 w-32'
  };

  return (
    <Skeleton
      width={sizes[size].split(' ')[1]}
      height={sizes[size].split(' ')[0]}
      rounded="rounded-lg"
      className={className}
    />
  );
};

Skeleton.Card = SkeletonCard;
Skeleton.Text = SkeletonText;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Button = SkeletonButton;

export default Skeleton;