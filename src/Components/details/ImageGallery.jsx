import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const ImageGallery = ({ images = [], productName = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If only one image is provided, create array with multiple placeholder images for demo
  const galleryImages = images.length > 1 ? images : [
    images[0] || '/placeholder.jpg',
    images[0] || '/placeholder.jpg', // Duplicate for demo
    images[0] || '/placeholder.jpg', // Duplicate for demo
  ];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div
        className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 group cursor-zoom-in"
        onClick={openModal}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-[#F5B22C] rounded-full animate-spin"></div>
          </div>
        )}
        
        <img
          src={galleryImages[currentIndex]}
          alt={`${productName} - Image ${currentIndex + 1}`}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          loading="eager"
        />

        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ZoomIn size={20} />
        </div>

        {/* Navigation Arrows */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Image Counter */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        )}
      </motion.div>

      {/* Thumbnail Strip */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {galleryImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? 'border-[#F5B22C] ring-2 ring-[#F5B22C]/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-[#F5B22C]/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[currentIndex]}
                alt={`${productName} - Full size`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                <X size={24} />
              </button>

              {/* Modal Navigation */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}

              {/* Modal Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentIndex + 1} / {galleryImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;