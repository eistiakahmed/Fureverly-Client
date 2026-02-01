import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';
import { RingLoader } from 'react-spinners';
import { useNavigate } from 'react-router';

const AddListingPage = () => {
  const { user } = useContext(AuthContext);
  const [category, setCategory] = useState('Pets');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const categoryValue = e.target.category.value;
    const Price = categoryValue === 'Pets' ? 0 : Number(e.target.Price.value);
    const location = e.target.location.value;
    const description = e.target.description.value;
    const image = e.target.image.value;
    const date = e.target.date.value;
    const email = e.target.email.value;

    if (categoryValue !== 'Pets' && (!Price || Price <= 0)) {
      setLoading(false);
      return toast.error('Please enter a valid price for this category');
    }

    const formatData = {
      name,
      category: categoryValue,
      price: Price,
      location,
      description,
      image,
      date,
      email,
      createdAt: new Date().toISOString(),
      status: 'Available',
    };

    try {
      const response = await fetch(
        'https://fureverly-server.vercel.app/products',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formatData),
        }
      );

      if (response.ok) {
        await response.json();
        toast.success(
          'Listing added successfully! Your pet/product is now live.'
        );
        e.target.reset();
        setCategory('Pets');
        navigate('/petsAndSupplies');
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: 'Unknown error' }));
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }
    } catch (error) {
      console.error('Listing submission error:', error);
      if (error.name === 'TypeError' || error.message.includes('fetch')) {
        const localListings = JSON.parse(
          localStorage.getItem('fureverly_local_listings') || '[]'
        );
        const listingWithId = {
          ...formatData,
          _id: Date.now(),
          source: 'local',
        };
        localListings.push(listingWithId);
        localStorage.setItem(
          'fureverly_local_listings',
          JSON.stringify(localListings)
        );

        toast.success(
          'Listing saved locally! It will be synced when the server is available.'
        );
        e.target.reset();
        setCategory('Pets');
        navigate('/petsAndSupplies');
      } else {
        toast.error(error.message || 'Error adding listing. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <motion.div
        key="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-[50vh] flex justify-center items-center"
      >
        <RingLoader size={80} color="#092052" />
      </motion.div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 shadow-lg rounded-xl my-16 text-gray-800 dark:text-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Toaster />

      <motion.h2
        className="text-4xl font-extrabold mb-6 text-center text-[#092052] dark:text-blue-300 YesevaOne"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Add New Listing
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {[
          {
            label: 'Product/Pet Name',
            name: 'name',
            type: 'text',
            required: true,
          },
          { label: 'Location', name: 'location', type: 'text', required: true },
          { label: 'Image URL', name: 'image', type: 'text', required: true },
          { label: 'Pick Up Date', name: 'date', type: 'date', required: true },
        ].map((field, idx) => (
          <motion.div key={idx} variants={item}>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
            />
          </motion.div>
        ))}

        {/* Category */}
        <motion.div variants={item}>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
            required
          >
            <option value="" disabled>
              Pick Up Category
            </option>
            <option value="Pets">Pets</option>
            <option value="Food">Pet Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Care Products">Pet Care Product</option>
          </select>
        </motion.div>

        {/* Price */}
        <motion.div variants={item}>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
            Price
          </label>
          <input
            type="number"
            name="Price"
            defaultValue={category === 'Pets' ? 0 : ''}
            disabled={category === 'Pets'}
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#092052]"
          />
        </motion.div>

        {/* Description */}
        <motion.div variants={item}>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            required
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
          />
        </motion.div>

        {/* Email */}
        <motion.div variants={item}>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            readOnly
            defaultValue={user?.email}
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#092052]"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          variants={item}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg border-2 font-semibold transition duration-300 ${
              loading
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed border-gray-400'
                : 'border-[#092052] text-[#092052] hover:bg-[#092052] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white'
            }`}
          >
            {loading ? 'Adding Listing...' : 'Add Listing'}
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default AddListingPage;
