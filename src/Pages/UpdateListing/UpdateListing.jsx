import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useLoaderData, useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

const UpdateListing = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const [category, setCategory] = useState(data?.category || 'Pets');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const category = e.target.category.value;
    const Price = category === 'Pets' ? 0 : Number(e.target.price.value);
    const location = e.target.location.value;
    const description = e.target.description.value;
    const image = e.target.image.value;
    const date = e.target.date.value;
    const email = e.target.email.value;

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

    fetch(`https://fureverly-server.vercel.app/product/${data._id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(formatData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success('Successfully updated!');
        navigate('/myListings');
        // console.log(data)
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to update listing. Try again.');
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl my-16">
      <Toaster />
      <motion.h2
        className="text-4xl font-extrabold mb-6 text-center text-[#092052] YesevaOne dark:text-black"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Update Listing
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5 dark:text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <label className="block mb-1 font-semibold">Product/Pet Name</label>
          <input
            type="text"
            name="name"
            defaultValue={data?.name}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
            required
          />
        </div>

        <div>
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
        </div>

        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            type="number"
            name="price"
            defaultValue={category === 'Pets' ? 0 : data?.price || data?.price}
            disabled={category === 'Pets'}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052] bg-gray-50 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={data?.location}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            defaultValue={data?.description}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={data?.image}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Pick Up Date</label>
          <input
            type="date"
            name="date"
            defaultValue={data?.date?.split('T')[0]}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            readOnly
            defaultValue={user?.email}
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#092052]"
          />
        </div>

        <motion.button
          type="submit"
          className="w-full p-3 rounded-lg border-2 border-[#092052] text-[#092052] font-semibold hover:bg-[#092052] hover:text-white transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Update Listing
        </motion.button>
      </motion.form>
    </div>
  );
};

export default UpdateListing;
