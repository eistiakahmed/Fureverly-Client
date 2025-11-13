import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import ProductCard from '../ProductCard/ProductCard';
import { CircleArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryFilteredProduct = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://fureverly-server.vercel.app/products?category=${categoryName}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryName]);

  return (
    <div className="w-[95%] max-w-6xl mx-auto my-10">
      
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-[#092052] capitalize"
        >
          {categoryName} Products ({products.length})
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="bg-[#092052] text-white px-5 py-2 rounded-lg flex items-center gap-3 hover:bg-[#0b2d7a] transition-colors"
        >
          <CircleArrowLeft /> Back to Categories
        </motion.button>
      </div>

      
      <AnimatePresence>
        {loading && (
          <motion.p
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mt-20 text-lg font-semibold text-[#092052]"
          >
            Loading...
          </motion.p>
        )}
      </AnimatePresence>

      
      {!loading && (
        <AnimatePresence>
          {products.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 mt-10"
            >
              No products found for this category.
            </motion.p>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 justify-center"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              }}
            >
              {products.map((p, index) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default CategoryFilteredProduct;
