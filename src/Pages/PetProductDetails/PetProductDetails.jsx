import React, { use, useRef, useState } from 'react';
import { CalendarDays, Mail, MapPin } from 'lucide-react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const PetProductDetails = () => {
  const { user } = use(AuthContext);
  const data = useLoaderData();

  const {
    _id,
    name,
    category,
    description,
    email,
    location,
    image,
    date,
    Price,
  } = data;

  const orderModalRef = useRef(null);

  const newCategory = category === 'Pets' ? 1 : 1;
  const [quantity, setQuantity] = useState(newCategory);
  const [totalPrice, setTotalPrice] = useState(Price);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * Price);
  };

  const handleModal = () => {
    orderModalRef.current.showModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formatDate = {
      productId: e.target.productId.value,
      productName: e.target.productName.value,
      email: e.target.email.value,
      quantity: e.target.quantity.value,
      price: e.target.price.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      date: e.target.pickupDate.value,
      additionalNotes: e.target.notes.value,
    };

    console.log(formatDate);

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formatDate),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        orderModalRef.current.close();
        toast.success('Order placed successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 min-h-screen">
      <title>Fureverly | {name}</title>

      <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <Toaster />
        <div className="overflow-hidden rounded-xl shadow-sm">
          <img
            src={image}
            alt={name}
            className="w-full h-[420px] object-cover rounded-xl hover:opacity-95 transition"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold text-[#092052] mb-2">
              {name}
            </h1>
            <span className="text-sm bg-amber-100 text-amber-500 rounded-full font-medium uppercase tracking-wide py-2 px-5 ">
              {category}
            </span>
          </div>

          {Price === 0 ? (
            <p className="text-2xl font-semibold text-green-600">
              Free for Adoption
            </p>
          ) : (
            <p className="text-2xl font-semibold text-[#092052]">
              Price: <span className="text-amber-500">{Price} BDT</span>
            </p>
          )}

          <p className="text-gray-600 leading-relaxed text-justify border-t border-gray-200 pt-4">
            {description}
          </p>

          <div className="bg-[#f3f6fb] p-5 rounded-xl space-y-3 border border-gray-200">
            <p className="text-gray-700 flex gap-2">
              <span className="flex items-center gap-2 font-semibold text-[#092052]">
                <MapPin size={20} /> Location:
              </span>{' '}
              {location}
            </p>
            <p className="text-gray-700 flex  gap-2">
              <span className="flex gap-2 items-center font-semibold text-[#092052]">
                <CalendarDays size={20} /> Listed On:
              </span>{' '}
              {date}
            </p>
            <p className="text-gray-700 flex gap-2">
              <span className="flex gap-2 items-center font-semibold text-[#092052]">
                <Mail size={20} /> Contact:
              </span>{' '}
              {email}
            </p>
          </div>

          <button
            onClick={handleModal}
            className="w-full bg-[#092052] text-white py-3 rounded-full font-semibold hover:bg-[#0b2a72] transition duration-300 shadow-md"
          >
            {Price === 0 ? 'Adopt Now' : 'Buy Now'}
          </button>
        </div>

        <dialog
          ref={orderModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box max-w-4xl">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Place Your Order
            </h2>
            <div>
              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-[#f9fbff] p-6 rounded-2xl shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-[#092052] border-b pb-2 mb-3">
                  Buyer Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-gray-700 mb-1 block">
                      Buyer Name
                    </label>
                    <input
                      type="text"
                      name="buyerName"
                      defaultValue={user.displayName}
                      readOnly
                      className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#092052] transition"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-gray-700 mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      readOnly
                      className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#092052] transition"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-[#092052] border-b pb-2 mb-3 mt-6">
                  Product Details
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-gray-700 mb-1 block">
                      Product ID
                    </label>
                    <input
                      type="text"
                      name="productId"
                      defaultValue={_id}
                      readOnly
                      className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-gray-700 mb-1 block">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="productName"
                      defaultValue={name}
                      readOnly
                      className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-gray-700 mb-1 block">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      readOnly={category === 'Pets'}
                      placeholder={
                        category.toLowerCase() === 'pet'
                          ? 'Fixed to 1 (Pet)'
                          : 'Enter Quantity'
                      }
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052] transition"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-gray-700 mb-1 block">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={totalPrice}
                      readOnly
                      className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 focus:outline-none"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-[#092052] border-b pb-2 mb-3 mt-6">
                  Delivery Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="font-medium text-gray-700 mb-1 block">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter your delivery address"
                      required
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052] transition"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-medium text-gray-700 mb-1 block">
                        Pick-Up / Delivery Date
                      </label>
                      <input
                        type="date"
                        name="pickupDate"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052] transition"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 mb-1 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        required
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-medium text-gray-700 mb-1 block">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      placeholder="Any special instructions..."
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092052] transition min-h-[100px]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-[#092052] text-white py-3 rounded-full font-semibold hover:bg-[#0b2a72] transition duration-300 shadow-md"
                >
                  Submit Order
                </button>
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default PetProductDetails;
