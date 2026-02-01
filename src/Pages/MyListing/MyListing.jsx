import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router';
import { Trash2, Edit, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { RingLoader } from 'react-spinners';
import useAxios from '../../hooks/useAxios';

const MyListing = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const axiosSecure = useAxios();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get('/myListing')
        .then((res) => {
          setListings(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setDeletingId(id);

        axiosSecure
          .delete(`/products/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your listing has been deleted.',
                'success'
              );

              setListings((prev) => prev.filter((item) => item._id !== id));
            }
          })

          .catch((err) => console.error('Error deleting:', err))
          .finally(() => setDeletingId(null));
      }
    });
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



  return (
    <motion.div
      className="px-4 sm:px-6 md:px-10 w-full max-w-full mx-auto py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <title>Fureverly | My Listings</title>

      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center YesevaOne text-[#092052] dark:text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        My Listings ({listings.length})
      </motion.h2>

      {/* Responsive Table Wrapper */}
      <motion.div
        className="bg-white rounded-2xl shadow-md overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <table className="table w-full text-base min-w-[800px]">
          <thead className="bg-[#092052] text-white">
            <tr>
              <th className="py-3 px-2 text-center">SL No</th>
              <th className="py-3 px-2 text-center">Image</th>
              <th className="py-3 px-2 text-center">Name</th>
              <th className="py-3 px-2 text-center">Category</th>
              <th className="py-3 px-2 text-center">Price</th>
              <th className="py-3 px-2 text-center">Location</th>
              <th className="py-3 px-2 text-center">Date</th>
              <th className="py-3 px-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {listings.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-10 text-gray-500 text-lg"
                >
                  You haven’t added any listings yet.
                </td>
              </tr>
            ) : (
              <AnimatePresence>
                {listings.map((item, index) => (
                  <motion.tr
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="hover:bg-gray-50 dark:text-black border-t border-gray-100 transition"
                  >
                    <td className="py-3 px-2 text-center tinos">{index + 1}</td>

                    <td className="py-3 px-2 flex justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-lg overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </td>

                    <td className="py-3 px-2 font-semibold text-center tinos">
                      {item.name}
                    </td>

                    <td className="py-3 px-2 text-center tinos">
                      {item.category}
                    </td>

                    <td className="py-3 px-2 text-center tinos">
                      {item.price || item.Price || 0}
                    </td>

                    <td className="py-3 px-2 text-center tinos">
                      {item.location}
                    </td>

                    <td className="py-3 px-2 text-center tinos">
                      {item.date ? item.date.slice(0, 10) : 'N/A'}
                    </td>

                    <td className="py-3 px-2">
                      <div className="flex justify-center flex-wrap gap-2">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            to={`/updateListing/${item._id}`}
                            className="btn btn-sm btn-outline btn-info flex items-center gap-1 hover:text-white"
                          >
                            <Edit size={16} />
                          </Link>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <button
                            onClick={() => handleDelete(item._id)}
                            className={`btn tinos btn-sm btn-outline btn-error flex items-center gap-1 hover:text-white ${
                              deletingId === item._id
                                ? 'opacity-60 cursor-not-allowed'
                                : ''
                            }`}
                            disabled={deletingId === item._id}
                          >
                            {deletingId === item._id ? (
                              <Loader2 className="animate-spin" size={16} />
                            ) : (
                              <Trash2 size={16} />
                            )}
                            Delete
                          </button>
                        </motion.div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default MyListing;
