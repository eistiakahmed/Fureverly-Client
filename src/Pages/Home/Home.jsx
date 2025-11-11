import React, { useEffect, useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import Category from '../../Components/Category/Category';
import ProductCard from '../ProductCard/ProductCard';

const Home = () => {
  const [listing, setListing] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/latestListing')
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
      })
      .catch((err) => {
        console.log(err);
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

        {listing.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Loading latest listings...
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 ">
            {listing.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
