import React from 'react';
import { Package, ShoppingCart, Heart, Star, TrendingUp, Users } from 'lucide-react';
import Card from '../ui/Card';

const ProfileStats = ({ 
  stats = {}, 
  variant = 'default',
  className = ''
}) => {
  const {
    totalListings = 0,
    totalOrders = 0,
    totalFavorites = 0,
    averageRating = 0,
    totalViews = 0,
    totalFollowers = 0
  } = stats;

  const statItems = [
    {
      label: 'Listings',
      value: totalListings,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      label: 'Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      label: 'Favorites',
      value: totalFavorites,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    },
    {
      label: 'Rating',
      value: averageRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      suffix: '/5.0'
    },
    {
      label: 'Views',
      value: totalViews,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      label: 'Followers',
      value: totalFollowers,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20'
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (variant === 'compact') {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="grid grid-cols-3 gap-4">
          {statItems.slice(0, 3).map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${item.bgColor} mb-2`}>
                  <Icon className={item.color} size={20} />
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatNumber(item.value)}{item.suffix || ''}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Profile Statistics
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${item.bgColor} mb-3`}>
                <Icon className={item.color} size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {formatNumber(item.value)}{item.suffix || ''}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ProfileStats;