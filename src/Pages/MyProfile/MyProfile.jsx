import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, CalendarDays, User, Edit3, Loader2 } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast.error('Name cannot be empty!');
      return;
    }

    try {
      setLoading(true);
      await updateProfile(user, { displayName, photoURL });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile.');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700 relative"
      >
        <div className="flex flex-col items-center">
          <motion.img
            src={user?.photoURL || 'https://i.ibb.co/2FsfXqM/user.png'}
            alt="Profile"
            className="w-28 h-28 rounded-full shadow-md object-cover mb-4 border-4 border-indigo-500"
            whileHover={{ scale: 1.05 }}
          />

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {user?.displayName || 'Anonymous User'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Member since 2025
          </p>

          <div className="w-full border-t border-gray-200 dark:border-gray-700 my-4"></div>

          <div className="space-y-4 w-full">
            <div className="flex items-center gap-3">
              <Mail className="text-indigo-500" size={20} />
              <span className="text-gray-700 dark:text-gray-300">
                {user?.email || 'No email available'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="text-indigo-500" size={20} />
              <span className="text-gray-700 dark:text-gray-300">
                Joined:{' '}
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <User className="text-indigo-500" size={20} />
              <span className="text-gray-700 dark:text-gray-300">
                UID: {user?.uid || 'Unavailable'}
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="mt-8 bg-indigo-600 text-white py-2 px-5 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-all"
          >
            <Edit3 size={18} /> Edit Profile
          </motion.button>
        </div>

        {/* Modal */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-[90%] max-w-sm"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
                Update Profile
              </h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      'Update'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MyProfile;
