import React, { useEffect, useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import Category from '../../Components/Category/Category';
import ProductCard from '../ProductCard/ProductCard';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router';
import { HeartHandshake, PawPrint, UsersRound, Webhook } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const petHero = [
    {
      name: 'Sadia Rahman',
      pet: 'Bella (Golden Retriever)',
      img: 'https://i.ibb.co.com/ZzdRcw8c/download-11.jpg',
      role: 'Adopter',
      feedback:
        "Adopting Bella was the best decision ever! She's full of energy and love – our home feels complete now.",
    },
    {
      name: 'Tanvir Ahmed',
      pet: 'Luna (Persian Cat)',
      img: 'https://i.ibb.co.com/Jjfs2ysN/download-12.jpg',
      role: 'Adopter',
      feedback:
        'Luna has brought so much joy and warmth into our lives. Every day with her is a blessing!',
    },
    {
      name: 'Moumita Saha',
      pet: 'Coco (Parrot)',
      img: 'https://i.ibb.co.com/nqtNzHPb/parrot.jpg',
      role: 'Adopter',
      feedback:
        'Coco is such a lively companion! His cheerful chirps make our mornings brighter.',
    },
  ];

  return (
    <div className="min-h-screen">
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Banner />
      </motion.div>

      
      <section className="text-center mt-24 pb-20">
        <motion.h1
          className="text-4xl md:text-5xl text-[#092052] dark:text-white font-extrabold mb-8 YesevaOne"
          
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.1 }}
        >
          Top Categories
        </motion.h1>
        <motion.div
          
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <Category />
        </motion.div>
      </section>

      
      <section className="w-11/12 mx-auto pb-28">
        <motion.h1
          className="text-4xl md:text-5xl text-[#092052] dark:text-white font-extrabold text-center mb-12 YesevaOne"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Latest Listings
        </motion.h1>

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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fadeIn lg:w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {listing.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="flex justify-center">
          <motion.button
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/petsAndSupplies"
              className="flex justify-center items-center gap-2 bg-[#092052] text-white px-10 py-4 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
            >
              <Webhook /> Explore More
            </Link>
          </motion.button>
        </div>
      </section>

      
      <section className="bg-white py-20 px-6 w-10/12 mx-auto rounded-2xl text-center shadow-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#092052] mb-6 flex justify-center items-center gap-3 YesevaOne">
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
              <motion.div
                className="bg-[#fef3f3] px-6 py-4 rounded-2xl shadow-sm hover:scale-110 duration-200 transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <PawPrint className="mx-auto text-pink-500 mb-2" size={36} />
                <p className="font-semibold text-gray-700">Save Lives</p>
              </motion.div>
              <motion.div
                className="bg-[#eef6ff] px-6 py-4 rounded-2xl shadow-sm hover:scale-110 duration-200 transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <UsersRound className="mx-auto text-blue-500 mb-2" size={36} />
                <p className="font-semibold text-gray-700">
                  Join a Caring Community
                </p>
              </motion.div>
              <motion.div
                className="bg-[#f0fff4] px-6 py-4 rounded-2xl shadow-sm hover:scale-110 duration-200 transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <HeartHandshake
                  className="mx-auto text-green-500 mb-2"
                  size={36}
                />
                <p className="font-semibold text-gray-700">Promote Kindness</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      
      <section className="py-24 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#092052] dark:text-white mb-12 YesevaOne"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Pet Heroes
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-10/12 mx-auto">
          {petHero.map((hero, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative w-full overflow-hidden rounded-t-2xl">
                <img
                  src={hero.img}
                  alt={hero.name}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
                  <p className="text-white font-semibold text-lg">{hero.pet}</p>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-[#092052]">
                  {hero.name}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{hero.role}</p>
                <p className="text-gray-600 italic mt-2 text-sm">
                  {hero.feedback}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
