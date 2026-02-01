import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slide1 from '../../assets/slide1.png';
import slide2 from '../../assets/slide_5.png';
import slide3 from '../../assets/slide_22.png';

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: 'Find Your Furry Friend',
      subtitle: 'Bring Love Home Today',
      description: 'Adopt a pet and fill your home with pure joy and loyalty.',
      image: slide1,
      gradient: 'from-[#FDE68A] via-[#FBCFE8] to-[#FDE68A]',
      button: 'Start Your Journey',
    },
    {
      id: 2,
      title: "Adopt, Don't Shop",
      subtitle: 'Give a Pet a Loving Home',
      description: 'Every pet deserves a forever family. Be their hero today.',
      image: slide2,
      gradient: 'from-[#FDE68A] via-[#FBCFE8] to-[#FDE68A]',
      button: 'Find Your Companion',
    },
    {
      id: 3,
      title: 'Every Pet Matters',
      subtitle: 'Love. Care. Happiness.',
      description:
        'Bring joy home — give a furry friend the warmth they deserve.',
      image: slide3,
      gradient: 'from-[#FFF7E3] via-[#FFE4EC] to-[#FFF7E3]',
      button: 'Meet Happy Tails',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full overflow-hidden group transition-all duration-500 h-[60vh] md:h-[70vh]">
      <div
        className={`flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-10 md:py-20 bg-linear-to-r ${currentSlide.gradient} relative overflow-hidden h-full`}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40 -translate-x-28 -translate-y-28"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-40 translate-x-28 translate-y-28"></div>

        <div className="relative z-10 text-center md:text-left space-y-3 md:space-y-5 max-w-lg">
          <h1 className="text-3xl lg:text-6xl font-extrabold text-[#092052] YesevaOne leading-tight drop-shadow-sm">
            {currentSlide.title}
          </h1>
          <h3 className="text-amber-300 text-xl lg:text-4xl font-semibold tracking-tight">
            {currentSlide.subtitle}
          </h3>
          <p className="text-gray-700 text-sm lg:text-lg leading-relaxed">
            {currentSlide.description}
          </p>
          <button className="bg-[#092052] text-white font-semibold px-6 lg:px-10 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
            {currentSlide.button}
          </button>
        </div>

        <div className="relative z-10 flex justify-center md:justify-end">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-[320px] sm:w-[380px] lg:w-[700px] object-contain drop-shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 backdrop-blur-md text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 backdrop-blur-md text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
      >
        <ChevronRight size={28} />
      </button>

      <div className="absolute bottom-4 w-full flex justify-center gap-5 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[#092052] scale-125 shadow-md'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          ></div>
        ))}
      </div>

      {/* Visual hint to next section */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#092052] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#092052] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
