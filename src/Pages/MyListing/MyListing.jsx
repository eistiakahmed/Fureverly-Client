import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router';
import { Trash2, Edit, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

const MyListing = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); 

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/myListing?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setListings(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  
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

        fetch(`http://localhost:3000/product/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your listing has been deleted.',
                'success'
              );
              setListings((prev) => prev.filter((item) => item._id !== id));
            }
          })
          .catch((err) => console.error('Error deleting:', err))
          .finally(() => setDeletingId(null)); // reset spinner
      }
    });
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading your listings...
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-20 text-lg text-gray-500">
        You haven’t added any listings yet.
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-6 md:px-10 lg:w-10/12 mx-auto py-10">
      <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-center YesevaOne text-[#092052]">
        My Listings ({listings.length})
      </h2>

      <div className="bg-white rounded-2xl shadow-md">
        <table className="table w-full text-sm md:text-base">
          <thead className="bg-gray-100 text-[#092052]">
            <tr>
              <th className="py-3 px-2 text-left">SL No</th>
              <th className="py-3 px-2 text-left">Image</th>
              <th className="py-3 px-2 text-left">Name</th>
              <th className="py-3 px-2 text-left hidden sm:table-cell">
                Category
              </th>
              <th className="py-3 px-2 text-left hidden md:table-cell">
                Price
              </th>
              <th className="py-3 px-2 text-left hidden lg:table-cell">
                Location
              </th>
              <th className="py-3 px-2 text-left hidden lg:table-cell">Date</th>
              <th className="py-3 px-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {listings.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 border-t border-gray-100 transition"
              >
                <td className="py-3 px-2">{index + 1}</td>
                <td className="py-3 px-2">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-3 px-2 font-semibold">{item.name}</td>
                <td className="py-3 px-2 hidden sm:table-cell">
                  {item.category}
                </td>
                <td className="py-3 px-2 hidden md:table-cell">{item.price}</td>
                <td className="py-3 px-2 hidden lg:table-cell">
                  {item.location}
                </td>
                <td className="py-3 px-2 hidden lg:table-cell">
                  {item.date ? item.date.slice(0, 10) : 'N/A'}
                </td>

                <td className="py-3 px-2">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/updateListing/${item._id}`}
                      className="btn btn-sm btn-outline btn-info flex items-center gap-1 hover:text-white"
                    >
                      <Edit size={16} />
                    </Link>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className={`btn btn-sm btn-outline btn-error flex items-center gap-1 hover:text-white ${
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyListing;
