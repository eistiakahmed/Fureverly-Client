import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from '../ProductCard/ProductCard';
import { RingLoader } from 'react-spinners';

const PetsAndSupplies = () => {
  const data = useLoaderData();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(data);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value.trim();

    if (!search_text) {
      setProducts(data);
      return;
    }

    setLoading(true);
    fetch(`https://fureverly-server.vercel.app/search?search=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    e.target.reset();
  };

  return (
    <div className="min-h-screen w-11/12 mx-auto pb-24">
      <title>Fureverly | Pets & Supplies</title>

      <div className="text-center pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#092052] mb-4 animate-fadeIn YesevaOne">
          Pets & Supplies
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto animate-fadeIn delay-150">
          Adopt your next best friend or find premium pet supplies to make their
          life happier 🐾
        </p>
      </div>

      <div className="mb-12 text-center">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <div className="relative w-full sm:w-96">
            <input
              name="search"
              type="search"
              placeholder="Search pets or supplies..."
              className="w-full border border-gray-300 bg-gray-50 text-gray-700 py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#092052] transition-all duration-200"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <button
            type="submit"
            className=" buttonStyle border-2 border-[#092052] text-[#092052] font-semibold rounded-full px-8 py-3 hover:bg-[#092052] hover:text-white transition duration-300"
          >
            Search
          </button>
        </form>

        <div className="inline-block bg-[#092052] text-white px-5 py-2 rounded-full font-medium shadow-md">
          Showing {products.length} {products.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {loading ? (
        <div className="min-h-[50vh] flex justify-center items-center transition-opacity duration-300">
          <RingLoader size={80} color="#092052" />
        </div>
      ) : (
        <>
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 animate-fadeIn">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="transition-transform duration-300 hover:scale-105"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg mt-24 animate-fadeIn">
              No pets or supplies available right now. Please check back later.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PetsAndSupplies;
