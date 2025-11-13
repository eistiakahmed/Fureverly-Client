import React, { useEffect, useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import Category from '../../Components/Category/Category';
import ProductCard from '../ProductCard/ProductCard';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router';
import { HeartHandshake, PawPrint, UsersRound, Webhook } from 'lucide-react';

const Home = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fureverly-server.vercel.app/latestListing')
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fadeIn lg:w-7xl  mx-auto">
            {listing.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="flex justify-center">
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

      {/* 🐾 Why Adopt from Fureverly */}
      <section className="bg-white py-20 px-6 w-10/12 mx-auto rounded-2xl text-center shadow-inner">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#092052] mb-6 flex justify-center items-center gap-3">
            <HeartHandshake className="text-pink-600" /> Why Adopt from
            Fureverly?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Every pet deserves love, not a price tag. At{' '}
            <strong>Fureverly</strong>, we connect rescued animals with loving
            homes. Adoption gives these pets a second chance — and you a loyal
            companion. Be their hero. Adopt, don’t shop!
          </p>
          <div className="mt-10 flex justify-center gap-8 flex-wrap">
            <div className="bg-[#fef3f3] px-6 py-4 rounded-2xl shadow-sm hover:scale-110 duration-200 transition-all">
              <PawPrint className="mx-auto text-pink-500 mb-2" size={36} />
              <p className="font-semibold text-gray-700">Save Lives</p>
            </div>
            <div className="bg-[#eef6ff] px-6 py-4 rounded-2xl shadow-sm hover:scale-110 duration-200 transition-all">
              <UsersRound className="mx-auto text-blue-500 mb-2" size={36} />
              <p className="font-semibold text-gray-700">
                Join a Caring Community
              </p>
            </div>
            <div className="bg-[#f0fff4] px-6 py-4 rounded-2xl shadow-sm hover:scale-110 duration-200 transition-all">
              <HeartHandshake
                className="mx-auto text-green-500 mb-2"
                size={36}
              />
              <p className="font-semibold text-gray-700">Promote Kindness</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
