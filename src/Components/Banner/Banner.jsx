import React, { useState, useEffect } from 'react';
import slide1 from '../../assets/slide1.png';
import slide2 from '../../assets/slide2.png';
import slide3 from '../../assets/slide3.png';

const Banner = () => {
  const slides = [
    {
      id: 1,
      type: 'custom',
      content: (
        <div className=" flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20 px-6 md:px-22 py-14 bg-linear-to-r from-[#FDE68A] via-[#FBCFE8] to-[#FDE68A] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40 -translate-x-24 -translate-y-24"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-40 translate-x-24 translate-y-24"></div>

          <div className="relative text-center md:text-left z-10">
            <h1 className="font-extrabold text-3xl lg:text-6xl text-gray-900 YesevaOne leading-tight">
              Find Your Furry Friend
            </h1>
            <h3 className="text-pink-600 text-2xl lg:text-4xl font-bold mb-2">
              Bring Love Home Today
            </h3>
            <p className="text-gray-700 text-sm lg:text-xl leading-relaxed mb-2 lg:mb-4">
              Adopt a pet and fill your home with pure joy and loyalty.
            </p>
            <button className="bg-linear-to-r from-pink-500 to-pink-600 text-white font-semibold px-4 lg:px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition duration-300">
              Start Your Journey
            </button>
          </div>

          <div className="relative flex justify-center md:justify-end z-10">
            <div className="p-4 rounded-3xl">
              <img
                src={slide1}
                alt="Happy pet"
                className="w-[400px] lg:w-[300px] object-cover drop-shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      type: 'custom',
      content: (
        <div className=" flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20 px-6 md:px-20 py-16 bg-linear-to-r from-[#FDE68A] via-[#FBCFE8] to-[#FDE68A] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-40 -translate-x-28 -translate-y-28"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-200 rounded-full blur-3xl opacity-40 translate-x-28 translate-y-28"></div>

          <div className="relative text-center md:text-left z-10">
            <h1 className="font-extrabold text-3xl lg:text-6xl text-gray-900 YesevaOne leading-tight mb-2">
              Adopt, Don't Shop
            </h1>
            <h3 className="text-pink-600 text-xl lg:text-4xl font-bold mb-2">
              Give a Pet a Loving Home
            </h3>
            <p className="text-gray-700 text-sm lg:text-xl leading-relaxed mb-5 lg:mb-4">
              Every pet deserves a forever family. Be their hero today.
            </p>
            <button className="bg-linear-to-r from-pink-500 to-pink-600 text-white font-semibold px-4 md:px-6 lg:px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition duration-300">
              Find Your Companion
            </button>
          </div>

          <div className="relative flex justify-center md:justify-end z-10">
            <div className="p-4 rounded-3xl">
              <img
                src={slide2}
                alt="Happy pet"
                className="w-[800px] lg:w-[600px] object-cover drop-shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      ),
    },

    {
      id: 3,
      type: 'custom',
      content: (
        <div className=" flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20 px-6 md:px-20 py-12 bg-linear-to-r from-[#FFF7E3] via-[#FFE4EC] to-[#FFF7E3] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-40 -translate-x-28 -translate-y-28"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-200 rounded-full blur-3xl opacity-40 translate-x-28 translate-y-28"></div>

          <div className="relative text-center md:text-left z-10">
            <h1 className="font-extrabold text-3xl lg:text-6xl text-gray-900 YesevaOne leading-tight">
              Every Pet Matters
            </h1>
            <h3 className="text-pink-600 text-2xl lg:text-4xl font-bold mb-2">
              Love. Care. Happiness.
            </h3>
            <p className="text-gray-700 text-sm lg:text-xl leading-relaxed mb-5">
              Bring joy home — give a furry friend the warmth they deserve.
            </p>
            <button className="bg-linear-to-r from-pink-500 to-pink-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition duration-300">
              Meet Happy Tails
            </button>
          </div>

          <div className="relative flex justify-center md:justify-end z-10">
            <div className="p-4 rounded-3xl">
              <img
                src={slide3}
                alt="Happy owners with pets"
                className="w-[800px] lg:w-[500px] object-cover drop-shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
      {slides[currentIndex].type === 'custom' ? (
        slides[currentIndex].content
      ) : (
        <>
          <img
            src={slides[currentIndex].image}
            alt="Slide"
            className="w-full h-64 md:h-96 object-cover transition duration-500"
          />
          <div className="absolute bottom-5 left-5 text-white text-xl font-bold bg-black bg-opacity-50 p-3 rounded">
            {slides[currentIndex].tagline}
          </div>
        </>
      )}

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded"
      >
        ❯
      </button>
    </div>
  );
};

export default Banner;
