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

  return (
    <div className="w-11/12 mx-auto md:grid grid-cols-2 lg:grid-cols-4 gap-20 md:py-10">
      <div
        onClick={() => handleCategoryClick('Pets')}
        className="h-[300px] bg-[#fff4d9] rounded-xl shadow-md relative hover:scale-105 transition-all duration-300 cursor-pointer mb-6"
      >
        <div className="md:bg-amber-700 md:w-56 md:h-56 rounded-full flex justify-center items-center md:absolute md:-top-12 md:left-1/2 md:-translate-x-1/2 overflow-hidden md:shadow-md">
          <img src={pet} alt="" className="w-60 h-60 md:object-cover" />
        </div>
        <h3 className="absolute text-xl font-bold bottom-6 left-1/2 -translate-x-1/2 text-[#092052]">
          Pets (Adoption)
        </h3>
      </div>

      <div
        onClick={() => handleCategoryClick('Pet Food')}
        className="h-[300px] bg-[#e8f5da] rounded-xl shadow-md relative hover:scale-105 transition-all duration-300 cursor-pointer mb-6"
      >
        <div className="md:bg-green-400 md:w-56 md:h-56 rounded-full flex justify-center items-center md:absolute md:-top-12 md:left-1/2 md:-translate-x-1/2 overflow-hidden md:shadow-md">
          <img src={petFood} alt="" className="w-60 h-60 md:object-cover" />
        </div>
        <h3 className="absolute text-xl font-bold bottom-6 left-1/2 -translate-x-1/2 text-[#092052]">
          Pet Food
        </h3>
      </div>

      <div
        onClick={() => handleCategoryClick('Accessories')}
        className="h-[300px] bg-[#e4eef7] rounded-xl shadow-md relative hover:scale-105 transition-all duration-300 cursor-pointer mb-6"
      >
        <div className="md:bg-neutral-500 md:w-56 md:h-56 rounded-full flex justify-center items-center md:absolute md:-top-12 md:left-1/2 md:-translate-x-1/2 overflow-hidden md:shadow-md">
          <img
            src={accessories}
            alt=""
            className="w-[260px] h-[260px] object-cover"
          />
        </div>
        <h3 className="absolute text-xl font-bold bottom-6 left-1/2 -translate-x-1/2 text-[#092052]">
          Accessories
        </h3>
      </div>

      <div
        onClick={() => handleCategoryClick('Pet Care Products')}
        className="h-[300px] bg-[#f0e2e1] rounded-xl shadow-md relative hover:scale-105 transition-all duration-300 cursor-pointer mb-6"
      >
        <div className="md:bg-yellow-400 md:w-56 md:h-56 rounded-full flex justify-center items-center md:absolute -top-12 md:left-1/2 md:-translate-x-1/2 overflow-hidden md:shadow-md">
          <img
            src={petCareProduct}
            alt=""
            className="w-[260px] h-[260px] object-contain"
          />
        </div>
        <h3 className="absolute text-xl font-bold bottom-6 left-1/2 -translate-x-1/2 text-[#092052]">
          Pet Care Product
        </h3>
      </div>
    </div>
  );
};

export default Category;
