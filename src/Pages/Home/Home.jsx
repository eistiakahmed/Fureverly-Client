import React, { useEffect, useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import Category from '../../Components/Category/Category';
import ProductCard from '../ProductCard/ProductCard';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router';
import { Webhook } from 'lucide-react';

const Home = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/latestListing')
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching latest listings:', err);
        setError('Failed to load listings. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#f9fafc] min-h-screen">
      <Banner />

      <section className="text-center mt-24 pb-20">
        <h1 className="text-4xl md:text-5xl text-[#092052] font-extrabold mb-8">
          Top Categories
        </h1>
        <Category />
      </section>

      <section className="w-11/12 mx-auto pb-28">
        <h1 className="text-4xl md:text-5xl text-[#092052] font-extrabold text-center mb-12">
          Latest Listings
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <RingLoader size={80} color="#092052" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : listing.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No listings available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 animate-fadeIn">
            {listing.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className='flex justify-center'>
          <button className=" mt-16">
            <Link
              to="/petsAndSupplies"
              className="flex justify-center items-center gap-2 bg-[#092052] text-white px-10 py-4 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
            >
              <Webhook /> Explore More
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
