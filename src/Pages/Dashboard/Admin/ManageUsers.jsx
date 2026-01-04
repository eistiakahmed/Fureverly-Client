import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Shield, 
  User,
  Mail,
  Calendar,
  Eye,
  Ban,
  CheckCircle
} from 'lucide-react';
import { RingLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const token = await user?.getIdToken();
      const response = await fetch('https://fureverly-server.vercel.app/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userEmail, newRole) => {
    try {
      setActionLoading(userEmail);
      const token = await user?.getIdToken();
      
      const response = await fetch(`https://fureverly-server.vercel.app/admin/users/${userEmail}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });

      if (response.ok) {
        setUsers(users.map(u => 
          u.email === userEmail ? { ...u, role: newRole } : u
        ));
        toast.success(`User role updated to ${newRole}`);
      } else {
        toast.error('Failed to update user role');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userEmail) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete user!'
    });

    if (result.isConfirmed) {
      try {
        setActionLoading(userEmail);
        const token = await user?.getIdToken();
        
        const response = await fetch(`https://fureverly-server.vercel.app/admin/users/${userEmail}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          setUsers(users.filter(u => u.email !== userEmail));
          toast.success('User deleted successfully');
        } else {
          toast.error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      } finally {
        setActionLoading(null);
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RingLoader color="#092052" size={60} />
      </div>
    );
  }

  const UserModal = ({ user, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.profileImage || 'https://i.ibb.co/2FsfXqM/user.png'}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Role:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              user.role === 'admin' 
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            }`}>
              {user.role}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Joined:</span>
            <span className="text-sm text-gray-900 dark:text-white">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              user.isActive 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              const newRole = user.role === 'admin' ? 'user' : 'admin';
              handleRoleChange(user.email, newRole);
              onClose();
            }}
            className="flex-1 bg-[#F5B22C] text-white py-2 px-4 rounded-lg hover:bg-[#092052] transition-colors"
          >
            Make {user.role === 'admin' ? 'User' : 'Admin'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all platform users
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total Users: {users.length}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((userData, index) => (
                <motion.tr
                  key={userData.email}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={userData.profileImage || 'https://i.ibb.co/2FsfXqM/user.png'}
                        alt={userData.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {userData.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {userData.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      userData.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {userData.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      userData.isActive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {userData.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(userData.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      {actionLoading === userData.email ? (
                        <div className="w-6 h-6">
                          <RingLoader size={20} color="#F5B22C" />
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setSelectedUser(userData);
                              setShowUserModal(true);
                            }}
                            className="p-1 text-gray-400 hover:text-[#F5B22C] transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => {
                              const newRole = userData.role === 'admin' ? 'user' : 'admin';
                              handleRoleChange(userData.email, newRole);
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title={`Make ${userData.role === 'admin' ? 'User' : 'Admin'}`}
                          >
                            <Shield size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(userData.email)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <User size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No users found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || filterRole !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No users have registered yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageUsers;