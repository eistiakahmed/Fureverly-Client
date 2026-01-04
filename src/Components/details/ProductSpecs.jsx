import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Calendar, 
  Ruler, 
  Weight, 
  Palette,
  Award,
  Activity,
  Users,
  Home,
  Stethoscope,
  BookOpen
} from 'lucide-react';

const ProductSpecs = ({ product, category }) => {
  // Generate realistic specs based on category
  const generateSpecs = () => {
    const baseSpecs = {
      id: product._id,
      category: product.category,
      location: product.location,
      listedDate: product.date,
      price: product.Price,
      status: product.status || 'Available'
    };

    if (category === 'Pets') {
      return {
        ...baseSpecs,
        age: '2 years old',
        breed: 'Mixed Breed',
        gender: 'Male',
        size: 'Medium',
        weight: '15-20 kg',
        color: 'Golden Brown',
        vaccinated: 'Yes, up to date',
        spayedNeutered: 'Yes',
        microchipped: 'Yes',
        houseTrained: 'Yes',
        goodWithKids: 'Yes',
        goodWithPets: 'Yes',
        energyLevel: 'High',
        groomingNeeds: 'Moderate',
        specialNeeds: 'None',
        healthStatus: 'Excellent'
      };
    } else if (category === 'Pet Food') {
      return {
        ...baseSpecs,
        brand: 'Premium Pet Foods',
        flavor: 'Chicken & Rice',
        lifeStage: 'Adult',
        size: '5kg bag',
        ingredients: 'Chicken, Rice, Vegetables',
        nutritionLevel: 'Complete & Balanced',
        specialDiet: 'None',
        expiryDate: '2025-12-31',
        storageInstructions: 'Store in cool, dry place'
      };
    } else if (category === 'Accessories') {
      return {
        ...baseSpecs,
        material: 'High-quality Nylon',
        size: 'Medium',
        color: 'Blue',
        brand: 'Pet Essentials',
        warranty: '1 Year',
        washable: 'Yes',
        suitableFor: 'Dogs & Cats',
        ageGroup: 'All Ages'
      };
    } else {
      return {
        ...baseSpecs,
        brand: 'Pet Care Pro',
        type: 'Grooming Product',
        size: '250ml',
        suitableFor: 'All Pets',
        ingredients: 'Natural & Safe',
        usage: 'External use only',
        shelfLife: '2 years'
      };
    }
  };

  const specs = generateSpecs();

  const getSpecIcon = (key) => {
    const iconMap = {
      age: Calendar,
      breed: Award,
      gender: Users,
      size: Ruler,
      weight: Weight,
      color: Palette,
      vaccinated: Shield,
      spayedNeutered: Stethoscope,
      microchipped: Activity,
      houseTrained: Home,
      goodWithKids: Heart,
      goodWithPets: Users,
      energyLevel: Activity,
      groomingNeeds: Palette,
      healthStatus: Stethoscope,
      brand: Award,
      material: BookOpen,
      warranty: Shield,
      default: BookOpen
    };
    return iconMap[key] || iconMap.default;
  };

  const formatSpecKey = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/Id$/, 'ID');
  };

  const getSpecValue = (key, value) => {
    if (key === 'price') {
      return value === 0 ? 'Free' : `$${value} BDT`;
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return value;
  };

  // Filter out basic info that's already shown in overview
  const filteredSpecs = Object.entries(specs).filter(([key]) => 
    !['id', 'category', 'location', 'listedDate', 'price', 'status'].includes(key)
  );

  const importantSpecs = filteredSpecs.slice(0, 8);
  const additionalSpecs = filteredSpecs.slice(8);

  return (
    <div className="space-y-6">
      {/* Key Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-xl font-semibold text-[#092052] dark:text-white mb-6 flex items-center gap-2">
          <BookOpen size={24} />
          Key Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {importantSpecs.map(([key, value], index) => {
            const IconComponent = getSpecIcon(key);
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="p-2 bg-[#F5B22C]/10 rounded-lg">
                  <IconComponent className="text-[#F5B22C]" size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatSpecKey(key)}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {getSpecValue(key, value)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Additional Information */}
      {additionalSpecs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold text-[#092052] dark:text-white mb-6">
            Additional Details
          </h3>
          
          <div className="space-y-3">
            {additionalSpecs.map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <span className="text-gray-600 dark:text-gray-400">
                  {formatSpecKey(key)}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {getSpecValue(key, value)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Care Instructions / Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
      >
        <h3 className="text-xl font-semibold text-[#092052] dark:text-white mb-4 flex items-center gap-2">
          <Shield size={24} />
          {category === 'Pets' ? 'Adoption Guidelines' : 'Usage Instructions'}
        </h3>
        
        <div className="space-y-3">
          {category === 'Pets' ? (
            <>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  Must provide a safe, loving home environment
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  Regular veterinary care and vaccinations required
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  Daily exercise and mental stimulation needed
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  Must be returned if unable to care for the pet
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  Follow recommended usage instructions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  Store in appropriate conditions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  Check expiry dates before use
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  Contact seller for any issues or concerns
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductSpecs;