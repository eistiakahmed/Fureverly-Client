import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import ProductCard from '../ProductCard/ProductCard';
import { CircleArrowLeft } from 'lucide-react';


const CategoryFilteredProduct = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/products?category=${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg font-semibold">Loading...</p>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#092052] capitalize">
          {categoryName} Products ({products.length})
        </h2>
        <button
          onClick={() => navigate('/')}
          className="bg-[#092052] text-white px-5 py-2 rounded-lg hover:bg-[#0b2d7a] transition flex items-center gap-5"
        >
          <CircleArrowLeft /> Back to Categories
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">
          No products found for this category.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilteredProduct;
