import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Category from '../../Components/Category/Category';

const Home = () => {
  return (
    <div>
      <Banner />
      <h1 className="text-5xl font-bold text-center mt-28 mb-20">Top Categories</h1>
      <Category />
      <h1 className="text-5xl font-bold text-center mt-10">
        Hi, Project PawsMart
      </h1>
    </div>
  );
};

export default Home;
