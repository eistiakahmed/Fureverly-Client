import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  DollarSign,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  MoreVertical
} from 'lucide-react';
import { RingLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ManageProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fureverly-server.vercel.app/product');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete product!'
    });

    if (result.isConfirmed) {
      try {
        setActionLoading(productId);
        const token = await user?.getIdToken();
        
        const response = await fetch(`https://fureverly-server.vercel.app/product/${productId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          setProducts(products.filter(p => p._id !== productId));
          toast.success('Product deleted successfully');
        } else {
          toast.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      } finally {
        setActionLoading(null);
      }
    }
  };

  const handleStatusChange = async (productId, newStatus) => {
    try {
      setActionLoading(productId);
      const token = await user?.getIdToken();
      
      const response = await fetch(`https://fureverly-server.vercel.app/product/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setProducts(products.map(p => 
          p._id === productId ? { ...p, status: newStatus } : p
        ));
        toast.success(`Product status updated to ${newStatus}`);
      } else {
        toast.error('Failed to update product status');
      }
    } catch (error) {
      console.error('Error updating product status:', error);
      toast.error('Failed to update product status');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RingLoader color="#092052" size={60} />
      </div>
    );
  }

  const ProductModal = ({ product, onClose }) => (
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
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-6 mb-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.status === 'Available' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {product.status}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {product.category}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <DollarSign size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Price:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${product.Price || 'Free'}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <User size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Owner:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {product.email}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Listed:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {new Date(product.date).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Package size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Location:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {product.location || 'Not specified'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              const newStatus = product.status === 'Available' ? 'Unavailable' : 'Available';
              handleStatusChange(product._id, newStatus);
              onClose();
            }}
            className="flex-1 bg-[#F5B22C] text-white py-2 px-4 rounded-lg hover:bg-[#092052] transition-colors"
          >
            Mark as {product.status === 'Available' ? 'Unavailable' : 'Available'}
          </button>
          <button
            onClick={() => {
              handleDeleteProduct(product._id);
              onClose();
            }}
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete Product
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Products</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all platform products
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total Products: {products.length}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F5B22C] focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${product.Price || 'Free'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {product.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Available' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(product.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      {actionLoading === product._id ? (
                        <div className="w-6 h-6">
                          <RingLoader size={20} color="#F5B22C" />
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setShowProductModal(true);
                            }}
                            className="p-1 text-gray-400 hover:text-[#F5B22C] transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => {
                              const newStatus = product.status === 'Available' ? 'Unavailable' : 'Available';
                              handleStatusChange(product._id, newStatus);
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title={`Mark as ${product.status === 'Available' ? 'Unavailable' : 'Available'}`}
                          >
                            {product.status === 'Available' ? <XCircle size={16} /> : <CheckCircle size={16} />}
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete Product"
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No products have been listed yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      {showProductModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setShowProductModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageProducts;