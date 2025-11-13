import React, { use, useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';
import { RingLoader } from 'react-spinners';

const AddListingPage = () => {
  const { user } = use(AuthContext);
  const [category, setCategory] = useState('Pets');
  const[loading, setLoading] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const category = e.target.category.value;
    const Price = category === 'Pets' ? 0 : Number(e.target.Price.value);
    const location = e.target.location.value;
    const description = e.target.description.value;
    const image = e.target.image.value;
    const date = e.target.date.value;
    const email = e.target.email.value;

    if (category !== 'Pets' && (!Price || Price <= 0)) {
      return toast.error('Please enter a valid price for this category');
    }

    const formatData = {
      name,
      category,
      Price,
      location,
      description,
      image,
      date,
      email,
    };

    fetch('https://fureverly-server.vercel.app/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formatData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success(
          'Listing added successfully! Your pet/product is now live.'
        );
        e.target.reset();
        setCategory('Pets');
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error adding listing');
      });
  };


  if(loading){
    <motion.div
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[50vh] flex justify-center items-center"
    >
      <RingLoader size={80} color="#092052" />
    </motion.div>;
  }

  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl my-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Toaster />

      <motion.h2
        className="text-4xl font-extrabold mb-6 text-center text-[#092052] YesevaOne dark:text-black"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Add New Listing
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5 dark:text-black"
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
            <label className="block mb-1 font-semibold">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
            />
          </motion.div>
        ))}

        
        <motion.div variants={item}>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
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

        
        <motion.div variants={item}>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            type="number"
            name="Price"
            defaultValue={category === 'Pets' ? 0 : ''}
            disabled={category === 'Pets'}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052] bg-gray-50 disabled:bg-gray-100"
          />
        </motion.div>

        
        <motion.div variants={item}>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
            required
          />
        </motion.div>

        
        <motion.div variants={item}>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            readOnly
            defaultValue={user?.email}
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#092052]"
          />
        </motion.div>

        
        <motion.div
          variants={item}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <button
            type="submit"
            className="w-full p-3 rounded-lg border-2 border-[#092052] text-[#092052] font-semibold hover:bg-[#092052] hover:text-white transition duration-300"
          >
            Add Listing
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default AddListingPage;
