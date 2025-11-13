import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import pet from '../../assets/pet.png';
import petFood from '../../assets/petFood.png';
import accessories from '../../assets/petAccessories.png';
import petCareProduct from '../../assets/petCareProduct.png';

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category-filtered-product/${category}`);
  };

  const categories = [
    {
      title: 'Pets (Adoption)',
      img: pet,
      bg: 'bg-[#fff4d9]',
      circleBg: 'bg-amber-200',
      key: 'Pets',
      tooltip: 'Find adorable pets ready for adoption!',
    },
    {
      title: 'Pet Food',
      img: petFood,
      bg: 'bg-[#e8f5da]',
      circleBg: 'bg-green-200',
      key: 'Pet Food',
      tooltip: 'Shop healthy & tasty food for your pets!',
    },
    {
      title: 'Accessories',
      img: accessories,
      bg: 'bg-[#e4eef7]',
      circleBg: 'bg-blue-200',
      key: 'Accessories',
      tooltip: 'Discover stylish accessories for your furry friends!',
    },
    {
      title: 'Pet Care Products',
      img: petCareProduct,
      bg: 'bg-[#f0e2e1]',
      circleBg: 'bg-yellow-200',
      key: 'Pet Care Products',
      tooltip: 'Everything you need to care for your pet!',
    },
  ];

  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 md:py-10">
      {categories.map(({ title, img, bg, circleBg, key, tooltip }) => (
        <motion.div
          key={key}
          whileHover={{ scale: 1.07, y: -10 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 250 }}
          onClick={() => handleCategoryClick(key)}
          className={`${bg} rounded-2xl shadow-md relative cursor-pointer flex flex-col items-center justify-end pb-6`}
          data-tooltip-id={`tooltip-${key}`} 
          data-tooltip-content={tooltip} 
        >
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`${circleBg} w-48 h-48 rounded-full flex justify-center items-center absolute -top-12 shadow-md overflow-hidden`}
          >
            <motion.img
              src={img}
              alt={title}
              className="w-40 h-40 object-contain"
              loading="lazy"
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 200 }}
            />
          </motion.div>

          
          <motion.h3
            className="mt-36 text-xl font-bold text-[#092052] text-center px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title}
          </motion.h3>

          
          <Tooltip
            id={`tooltip-${key}`}
            place="top"
            className="bg-[#092052] text-white rounded-md px-3 py-1.5 text-sm shadow-md"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Category;
