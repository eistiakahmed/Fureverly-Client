import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../../Pages/ProductCard/ProductCard';
import { ProductCardSkeleton } from '../ui';

const RelatedProducts = ({ currentProduct, category }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Simulate API call to fetch related products
    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        // In production, this would be an actual API call
        // For now, we'll simulate with a timeout and mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock related products data
        const mockProducts = [
          {
            _id: 'related-1',
            name: 'Bella - Golden Retriever',
            category: category,
            image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
            location: 'New York, NY',
            Price: 0,
            description: 'Friendly and energetic golden retriever looking for a loving home.',
            status: 'Available'
          },
          {
            _id: 'related-2',
            name: 'Max - German Shepherd',
            category: category,
            image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400',
            location: 'Los Angeles, CA',
            Price: 0,
            description: 'Well-trained German Shepherd, great with kids.',
            status: 'Available'
          },
          {
            _id: 'related-3',
            name: 'Luna - Persian Cat',
            category: category,
            image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400',
            location: 'Chicago, IL',
            Price: 0,
            description: 'Beautiful Persian cat, very calm and affectionate.',
            status: 'Available'
          },
          {
            _id: 'related-4',
            name: 'Charlie - Labrador Mix',
            category: category,
            image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
            location: 'Houston, TX',
            Price: 0,
            description: 'Playful Labrador mix, loves outdoor activities.',
            status: 'Available'
          },
          {
            _id: 'related-5',
            name: 'Milo - Beagle',
            category: category,
            image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
            location: 'Phoenix, AZ',
            Price: 0,
            description: 'Gentle Beagle, perfect for families with children.',
            status: 'Available'
          }
        ];

        // Filter out current product and limit to 8 items
        const filtered = mockProducts
          .filter(product => product._id !== currentProduct._id)
          .slice(0, 8);
        
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProduct._id, category]);

  const itemsPerView = 4;
  const maxIndex = Math.max(0, relatedProducts.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-[#092052] dark:text-white">
          Related {category}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-[#092052] dark:text-white">
          Related {category}
        </h3>
        
        {/* Navigation Buttons */}
        {relatedProducts.length > itemsPerView && (
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full border transition-all duration-200 ${
                currentIndex === 0
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:border-[#F5B22C] hover:text-[#F5B22C] hover:bg-[#F5B22C]/5'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className={`p-2 rounded-full border transition-all duration-200 ${
                currentIndex >= maxIndex
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:border-[#F5B22C] hover:text-[#F5B22C] hover:bg-[#F5B22C]/5'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Products Carousel */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: -currentIndex * (100 / itemsPerView) + '%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ width: `${(relatedProducts.length / itemsPerView) * 100}%` }}
        >
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product._id}
              className="flex-shrink-0"
              style={{ width: `${100 / relatedProducts.length}%` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dots Indicator */}
      {relatedProducts.length > itemsPerView && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-[#F5B22C] w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* View All Button */}
      <div className="text-center pt-4">
        <button className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 font-medium">
          View All {category}
        </button>
      </div>
    </motion.div>
  );
};

export default RelatedProducts;