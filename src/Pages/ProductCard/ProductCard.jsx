import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router';


const ProductCard = ({ product }) => {
  // console.log(product._id)
  return (
    <div className="bg-white   rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative w-full h-[330px] overflow-hidden rounded-t-3xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-amber-500 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
          {product.category}
        </span>
      </div>

      <div className="p-5 flex flex-col justify-between h-[180px] ">
        <div>
          <h3 className="text-xl font-bold text-[#092052] group-hover:text-amber-500 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
            <IoLocationOutline className="text-red-600" size={22} />{' '}
            {product.location}
          </p>
        </div>

        <Link to={`/product/${product._id}`}>
          <button className="w-full bg-[#092052] text-white py-2.5 rounded-full font-semibold hover:bg-amber-500 transition-all duration-300">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
