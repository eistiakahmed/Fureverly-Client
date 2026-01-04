import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Calendar, Star } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ProfileCard = ({ 
  user, 
  profileData = {}, 
  variant = 'default',
  showActions = true,
  onEditClick,
  className = ''
}) => {
  const {
    bio = 'Pet lover and enthusiast.',
    location = 'Location not specified',
    isVerified = false,
    profileCompletion = 0,
    joinDate = new Date()
  } = profileData;

  const getProfileCompletionColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const variants = {
    default: 'p-6',
    compact: 'p-4',
    minimal: 'p-3'
  };

  return (
    <Card className={`${variants[variant]} ${className}`} shadow="md">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Profile Picture */}
        <div className="flex-shrink-0 text-center sm:text-left">
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={user?.photoURL || 'https://i.ibb.co/2FsfXqM/user.png'}
              alt="Profile"
              className={`
                rounded-full object-cover border-4 border-[#F5B22C] shadow-lg
                ${variant === 'compact' ? 'w-16 h-16' : variant === 'minimal' ? 'w-12 h-12' : 'w-20 h-20'}
              `}
            />
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1">
                <CheckCircle className="text-blue-500" size={16} />
              </div>
            )}
          </motion.div>
        </div>

        {/* Profile Information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`
                  font-bold text-gray-900 dark:text-white truncate
                  ${variant === 'compact' ? 'text-lg' : variant === 'minimal' ? 'text-base' : 'text-xl'}
                `}>
                  {user?.displayName || 'Anonymous User'}
                </h3>
                {isVerified && variant !== 'minimal' && (
                  <CheckCircle className="text-blue-500 flex-shrink-0" size={18} />
                )}
              </div>
              
              {variant !== 'minimal' && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                  {bio}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                {location && variant !== 'minimal' && (
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span className="truncate">{location}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>
                    Joined {joinDate.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })}
                  </span>
                </div>
              </div>
            </div>

            {showActions && onEditClick && variant !== 'minimal' && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEditClick}
                className="ml-2 flex-shrink-0"
              >
                Edit
              </Button>
            )}
          </div>

          {/* Profile Completion - Only show for default variant */}
          {variant === 'default' && profileCompletion > 0 && (
            <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Profile Completion
                </span>
                <span className={`text-sm font-bold ${getProfileCompletionColor(profileCompletion)}`}>
                  {profileCompletion}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-[#F5B22C] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;