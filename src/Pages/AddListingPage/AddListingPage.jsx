import React, { use, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';

const AddListingPage = () => {
  const { user } = use(AuthContext);
  const [category, setCategory] = useState('Pets');

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
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error adding listing');
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl my-16">
      <Toaster />
      <h2 className="text-4xl font-extrabold mb-6 text-center text-[#092052] YesevaOne">
        Add New Listing
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold">Product/Pet Name</label>
          <input
            type="text"
            name="name"
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
            name="Price"
            defaultValue={category === 'Pets' ? 0 : ''}
            disabled={category === 'Pets'}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052] bg-gray-50 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="text"
            name="image"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Pick Up Date</label>
          <input
            type="date"
            name="date"
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

        <button
          type="submit"
          className="w-full p-3 rounded-lg border-2 border-[#092052] text-[#092052] font-semibold hover:bg-[#092052] hover:text-white transition duration-300"
        >
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListingPage;
