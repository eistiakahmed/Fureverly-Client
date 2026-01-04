import React, { useRef, useState, useContext } from 'react';
import { useLoaderData, Link } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Heart, MessageCircle, Phone } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Import new components
import ImageGallery from '../../components/details/ImageGallery';
import ProductOverview from '../../components/details/ProductOverview';
import ProductSpecs from '../../components/details/ProductSpecs';
import ReviewsSection from '../../components/details/ReviewsSection';
import RelatedProducts from '../../components/details/RelatedProducts';

const PetProductDetails = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const [activeSection, setActiveSection] = useState('overview');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const orderModalRef = useRef(null);

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

  // Create images array (in production, this would come from the API)
  const productImages = [
    image,
    // Add more images for gallery demo
    image, // Duplicate for demo
    image, // Duplicate for demo
  ];

  const handleAdopt = () => {
    if (!user) {
      toast.error('Please sign in to adopt a pet');
      return;
    }
    openModal();
  };

  const handleBuy = () => {
    if (!user) {
      toast.error('Please sign in to make a purchase');
      return;
    }
    openModal();
  };

  const handleContact = () => {
    if (!user) {
      toast.error('Please sign in to contact the owner');
      return;
    }
    // Open email client or show contact modal
    window.location.href = `mailto:${email}?subject=Inquiry about ${name}`;
  };

  const openModal = () => {
    orderModalRef.current.showModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      productId: _id,
      productName: name,
      email: user?.email,
      quantity: 1,
      price: Price,
      address: e.target.address.value,
      phone: e.target.phone.value,
      date: e.target.pickupDate.value,
      additionalNotes: e.target.notes.value,
    };

    try {
      const response = await fetch(`https://fureverly-server.vercel.app/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Order placed successfully!');
        orderModalRef.current.close();
      } else {
        throw new Error('Failed to place order');
      }
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Details & Specs' },
    { id: 'reviews', label: 'Reviews & Q&A' },
    { id: 'related', label: 'Related Items' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <title>Fureverly | {name}</title>
      <Toaster position="top-center" />

      {/* Breadcrumb & Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/petsAndSupplies"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#092052] dark:hover:text-[#F5B22C] transition-colors duration-200"
              >
                <ArrowLeft size={20} />
                <span>Back to Listings</span>
              </Link>
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Link to="/" className="hover:text-[#092052] dark:hover:text-[#F5B22C]">Home</Link>
                <span>/</span>
                <Link to="/petsAndSupplies" className="hover:text-[#092052] dark:hover:text-[#F5B22C]">{category}</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white">{name}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-100 hover:text-red-500 transition-colors duration-200">
                <Heart size={20} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-200">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ImageGallery images={productImages} productName={name} />
          </motion.div>

          {/* Product Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProductOverview
              product={data}
              onAdopt={handleAdopt}
              onBuy={handleBuy}
              onContact={handleContact}
            />
          </motion.div>
        </div>

        {/* Section Navigation */}
        <div className="sticky top-20 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-2 mb-8 shadow-sm">
          <div className="flex overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-shrink-0 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-[#092052] dark:bg-[#F5B22C] text-white dark:text-[#092052]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-[#092052] dark:hover:text-[#F5B22C] hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeSection === 'overview' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-[#092052] dark:text-white mb-6">
                About {name}
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {description || `This beautiful ${category.toLowerCase()} is looking for a loving home. Well-trained, friendly, and great with children and other pets. All vaccinations are up to date and health records are available. The perfect addition to any family looking for a loyal companion.`}
                </p>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
                      What makes {name} special?
                    </h3>
                    <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                      <li>• Friendly and social personality</li>
                      <li>• Well-trained and house-broken</li>
                      <li>• Great with children and other pets</li>
                      <li>• Up-to-date on all vaccinations</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                    <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3">
                      Ideal home environment
                    </h3>
                    <ul className="space-y-2 text-green-800 dark:text-green-200">
                      <li>• Active family with time for exercise</li>
                      <li>• Secure yard or regular walks</li>
                      <li>• Experience with pets preferred</li>
                      <li>• Commitment to long-term care</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'specs' && (
            <ProductSpecs product={data} category={category} />
          )}

          {activeSection === 'reviews' && (
            <ReviewsSection productId={_id} productName={name} />
          )}

          {activeSection === 'related' && (
            <RelatedProducts currentProduct={data} category={category} />
          )}
        </motion.div>
      </div>

      {/* Enhanced Order Modal */}
      <dialog ref={orderModalRef} className="modal modal-bottom sm:modal-middle">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="modal-box max-w-4xl bg-white dark:bg-gray-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#092052] dark:text-white">
              {Price === 0 ? 'Adoption Application' : 'Purchase Order'}
            </h2>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost">✕</button>
            </form>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Summary */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <img
                  src={image}
                  alt={name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{category}</p>
                  <p className="text-[#092052] dark:text-[#F5B22C] font-semibold">
                    {Price === 0 ? 'Free for Adoption' : `$${Price} BDT`}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName || ''}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F5B22C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Contact Date *
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F5B22C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address *
              </label>
              <input
                type="text"
                name="address"
                required
                placeholder="Enter your full address"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F5B22C]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                rows={4}
                placeholder={Price === 0 ? "Tell us about your experience with pets and why you'd like to adopt..." : "Any special instructions or questions..."}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F5B22C] resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <form method="dialog" className="flex-1">
                <button
                  type="button"
                  className="w-full py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
              </form>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-[#092052] dark:bg-[#F5B22C] text-white dark:text-[#092052] hover:bg-[#0a2458] dark:hover:bg-[#e0a32a] shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? 'Submitting...' : Price === 0 ? 'Submit Application' : 'Place Order'}
              </button>
            </div>
          </form>
        </motion.div>
      </dialog>
    </div>
  );
};

export default PetProductDetails;
