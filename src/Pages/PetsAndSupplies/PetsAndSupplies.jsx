import React from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from '../ProductCard/ProductCard';

const PetsAndSupplies = () => {
  const data = useLoaderData();

  return (
    <div className="bg-[#f9fafc] min-h-screen">
      
      <title>Fureverly | Pets & Supplies</title>

      
      <div className="text-center pt-20 pb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#092052] mb-4">
          Pets & Supplies
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Adopt your next best friend or find premium pet supplies to make their
          life happier. 🐾
        </p>
      </div>

      
      <div className="w-11/12 mx-auto pb-24">
        {data && data.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
            {data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-20">
            No pets or supplies available right now. Please check back later 
          </p>
        )}
      </div>
    </div>
  );
};

export default PetsAndSupplies;
