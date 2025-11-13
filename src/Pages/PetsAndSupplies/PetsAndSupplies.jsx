import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from '../ProductCard/ProductCard';
import { RingLoader } from 'react-spinners';

const PetsAndSupplies = () => {
  const data = useLoaderData();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    setProducts(data);
    setLoading(false);
  }, [data]);

  
  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value.trim();

    if (!search_text) {
      setProducts(data);
      return;
    }

    setLoading(true);
    fetch(
      `https://fureverly-server.vercel.app/searchName?search=${search_text}`
    )
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === 'All') {
      setProducts(data);
      return;
    }

    setLoading(true);
    fetch(
      `https://fureverly-server.vercel.app/filterCategory?search=${selectedCategory}`
    )
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="min-h-screen w-11/12 mx-auto pb-24">
      <title>Fureverly | Pets & Supplies</title>

      <div className="text-center pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#092052] mb-4 YesevaOne">
          Pets & Supplies
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
          Adopt your next best friend or find premium pet supplies 🐾
        </p>
      </div>

      <div className="mb-12 text-center">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <input
            name="search"
            type="text"
            placeholder="Search by name..."
            className="w-full sm:w-80 border border-gray-300 bg-gray-50 text-gray-700 py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#092052]"
          />

          <select
            value={category}
            onChange={handleCategoryChange}
            className="border border-gray-300 bg-gray-50 text-gray-700 py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-[#092052]"
          >
            <option value="All">All Categories</option>
            <option value="Pets">Pets</option>
            <option value="Pet Food">Pet Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Pet Care Product">Pet Care Product</option>
          </select>

          <button
            type="submit"
            className="border-2 buttonStyle border-[#092052] text-[#092052] font-semibold rounded-full px-8 py-3 hover:bg-[#092052] hover:text-white transition duration-300"
          >
            Search
          </button>
        </form>

        <div className="inline-block bg-[#092052] text-white px-5 py-2 rounded-full font-medium shadow-md">
          Showing {products.length} {products.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {loading ? (
        <div className="min-h-[50vh] flex justify-center items-center">
          <RingLoader size={80} color="#092052" />
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-24">
          No pets or supplies available right now.
        </p>
      )}
    </div>
  );
};

export default PetsAndSupplies;
