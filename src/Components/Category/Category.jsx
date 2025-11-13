import React from 'react';
import { useNavigate } from 'react-router';
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
    },
    {
      title: 'Pet Food',
      img: petFood,
      bg: 'bg-[#e8f5da]',
      circleBg: 'bg-green-200',
      key: 'Pet Food',
    },
    {
      title: 'Accessories',
      img: accessories,
      bg: 'bg-[#e4eef7]',
      circleBg: 'bg-blue-200',
      key: 'Accessories',
    },
    {
      title: 'Pet Care Products',
      img: petCareProduct,
      bg: 'bg-[#f0e2e1]',
      circleBg: 'bg-yellow-200',
      key: 'Pet Care Products',
    },
  ];

  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 md:py-10">
      {categories.map(({ title, img, bg, circleBg, key }) => (
        <div
          key={key}
          onClick={() => handleCategoryClick(key)}
          className={`${bg} rounded-2xl shadow-md relative hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center justify-end pb-6`}
        >
          <div
            className={`${circleBg} w-48 h-48 rounded-full flex justify-center items-center absolute -top-12 shadow-md overflow-hidden`}
          >
            <img
              src={img}
              alt={title}
              className="w-40 h-40 object-contain"
              loading="lazy"
            />
          </div>

          {/* Category Title */}
          <h3 className="mt-36 text-xl font-bold text-[#092052] text-center px-2">
            {title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Category;
