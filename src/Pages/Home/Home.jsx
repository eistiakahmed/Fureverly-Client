import React, { useEffect, useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import Category from '../../Components/Category/Category';
import ProductGrid from '../../Components/listings/ProductGrid';
import { Link } from 'react-router';
import { 
  HeartHandshake, 
  PawPrint, 
  UsersRound, 
  Webhook, 
  Star,
  Shield,
  Clock,
  Award,
  Users,
  Heart,
  Mail,
  ArrowRight,
  Zap,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fureverly-server.vercel.app/latestListing')
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching latest listings:', err);
        setError('Failed to load listings. Please try again later.');
        setLoading(false);
      });
  }, []);

  const petHero = [
    {
      name: 'Sadia Rahman',
      pet: 'Bella (Golden Retriever)',
      img: 'https://i.ibb.co.com/ZzdRcw8c/download-11.jpg',
      role: 'Adopter',
      feedback:
        "Adopting Bella was the best decision ever! She's full of energy and love – our home feels complete now.",
    },
    {
      name: 'Tanvir Ahmed',
      pet: 'Luna (Persian Cat)',
      img: 'https://i.ibb.co.com/Jjfs2ysN/download-12.jpg',
      role: 'Adopter',
      feedback:
        'Luna has brought so much joy and warmth into our lives. Every day with her is a blessing!',
    },
    {
      name: 'Moumita Saha',
      pet: 'Coco (Parrot)',
      img: 'https://i.ibb.co.com/nqtNzHPb/parrot.jpg',
      role: 'Adopter',
      feedback:
        'Coco is such a lively companion! His cheerful chirps make our mornings brighter.',
    },
  ];

  const stats = [
    { icon: Heart, number: '2,500+', label: 'Pets Adopted', color: 'text-red-500' },
    { icon: Users, number: '5,000+', label: 'Happy Families', color: 'text-blue-500' },
    { icon: Award, number: '98%', label: 'Success Rate', color: 'text-green-500' },
    { icon: Globe, number: '50+', label: 'Cities Served', color: 'text-purple-500' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified Listings',
      description: 'All pets are health-checked and verified by our expert team'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your pet adoption needs'
    },
    {
      icon: Heart,
      title: 'Love Guarantee',
      description: 'We ensure every pet finds a loving, forever home'
    },
    {
      icon: Zap,
      title: 'Quick Process',
      description: 'Streamlined adoption process to bring your pet home faster'
    }
  ];

  const services = [
    {
      title: 'Pet Adoption',
      description: 'Find your perfect companion from our verified pet listings',
      icon: PawPrint,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
    },
    {
      title: 'Pet Care Supplies',
      description: 'Everything you need to keep your furry friend happy and healthy',
      icon: HeartHandshake,
      color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
    },
    {
      title: 'Expert Guidance',
      description: 'Professional advice on pet care, training, and health',
      icon: Award,
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
    },
    {
      title: 'Community Support',
      description: 'Join a community of pet lovers and share experiences',
      icon: UsersRound,
      color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
    }
  ];

  const blogs = [
    {
      title: 'First-Time Pet Owner Guide',
      excerpt: 'Everything you need to know before bringing your new pet home',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
      date: 'Dec 15, 2024',
      readTime: '5 min read'
    },
    {
      title: 'Pet Nutrition Essentials',
      excerpt: 'Learn about proper nutrition for different types of pets',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
      date: 'Dec 12, 2024',
      readTime: '7 min read'
    },
    {
      title: 'Creating a Pet-Friendly Home',
      excerpt: 'Tips to make your home safe and comfortable for your new pet',
      image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400',
      date: 'Dec 10, 2024',
      readTime: '6 min read'
    }
  ];

  const faqs = [
    {
      question: 'How do I adopt a pet from Fureverly?',
      answer: 'Simply browse our listings, contact the pet owner, and follow our guided adoption process. We provide support throughout the journey.'
    },
    {
      question: 'Are all pets health-checked?',
      answer: 'Yes, all pets listed on our platform undergo health verification by certified veterinarians before being listed for adoption.'
    },
    {
      question: 'What if my adopted pet doesn\'t adapt well?',
      answer: 'We offer a 30-day support period with free consultations to help with the transition. Our team is always here to help.'
    },
    {
      question: 'Can I list my pet for adoption?',
      answer: 'Absolutely! Create an account and use our simple listing process to find a loving home for your pet.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* 1. Hero/Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Banner />
      </motion.div>

      {/* 2. Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#092052] dark:text-white mb-4 YesevaOne">
              Why Choose Fureverly?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're committed to connecting pets with loving families through our trusted platform
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-[#F5B22C] rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-[#092052] dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Statistics Section */}
      <section className="bg-[#092052] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <stat.icon className={`mx-auto mb-4 ${stat.color}`} size={48} />
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-white/90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Categories Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl text-[#092052] dark:text-white font-extrabold text-center mb-12 YesevaOne"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Top Categories
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            <Category />
          </motion.div>
        </div>
      </section>

      {/* 5. Services Section */}
      <section className="bg-[#FFF9EE] dark:bg-gray-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#092052] dark:text-white mb-4 YesevaOne">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive pet care solutions for every stage of your pet's life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${service.color}`}>
                    <service.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#092052] dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Latest Listings Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl text-[#092052] dark:text-white font-extrabold text-center mb-12 YesevaOne"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Latest Listings
          </motion.h2>

          <ProductGrid
            products={listing.slice(0, 8)}
            loading={loading}
            error={error}
            emptyMessage="No listings available right now."
            skeletonCount={8}
          />

          <div className="flex justify-center mt-12">
            <Link
              to="/petsAndSupplies"
              className="inline-flex items-center gap-2 bg-[#092052] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Webhook size={24} />
              Explore All Pets
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Why Adopt Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 lg:p-12 text-center shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#092052] dark:text-white mb-6 flex justify-center items-center gap-3 YesevaOne">
                <HeartHandshake className="text-pink-600" /> Why Adopt from Fureverly?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl mx-auto mb-10">
                Every pet deserves love, not a price tag. At <strong>Fureverly</strong>, we connect rescued animals with loving
                homes. Adoption gives these pets a second chance — and you a loyal companion. Be their hero. Adopt, don't shop!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <motion.div
                  className="bg-[#fef3f3] px-6 py-8 rounded-2xl shadow-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <PawPrint className="mx-auto text-pink-500 mb-4" size={48} />
                  <h3 className="font-semibold text-gray-700 text-lg mb-2">Save Lives</h3>
                  <p className="text-gray-600 text-sm">Give rescued pets a second chance at happiness</p>
                </motion.div>
                
                <motion.div
                  className="bg-[#eef6ff] px-6 py-8 rounded-2xl shadow-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <UsersRound className="mx-auto text-blue-500 mb-4" size={48} />
                  <h3 className="font-semibold text-gray-700 text-lg mb-2">Join Community</h3>
                  <p className="text-gray-600 text-sm">Connect with caring pet lovers worldwide</p>
                </motion.div>
                
                <motion.div
                  className="bg-[#f0fff4] px-6 py-8 rounded-2xl shadow-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <HeartHandshake className="mx-auto text-green-500 mb-4" size={48} />
                  <h3 className="font-semibold text-gray-700 text-lg mb-2">Promote Kindness</h3>
                  <p className="text-gray-600 text-sm">Spread love and compassion in the world</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Success Stories/Testimonials Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-[#092052] dark:text-white text-center mb-4 YesevaOne"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Success Stories
          </motion.h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
            Real stories from families who found their perfect companions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {petHero.map((hero, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={hero.img}
                    alt={hero.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#F5B22C] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {hero.role}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#092052] dark:text-white mb-1">
                    {hero.name}
                  </h3>
                  <p className="text-[#F5B22C] font-medium mb-3">{hero.pet}</p>
                  <p className="text-gray-600 dark:text-gray-400 italic mb-4">
                    "{hero.feedback}"
                  </p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Blog/Articles Section */}
      <section className="bg-[#FFF9EE] dark:bg-gray-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#092052] dark:text-white mb-4 YesevaOne">
              Pet Care Insights
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Expert advice and tips to help you provide the best care for your furry friends
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#092052] dark:text-white mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {blog.excerpt}
                  </p>
                  <button className="inline-flex items-center gap-2 text-[#092052] dark:text-[#F5B22C] font-medium hover:gap-3 transition-all duration-200">
                    Read More
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#092052] dark:text-white mb-4 YesevaOne">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get answers to common questions about pet adoption and our services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#F5B22C] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">Q</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#092052] dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Newsletter Section */}
      <section className="bg-[#092052] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <Mail className="mx-auto mb-6" size={64} />
            <h2 className="text-4xl md:text-5xl font-bold mb-4 YesevaOne">
              Stay Connected
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get the latest updates on new pets, adoption success stories, and pet care tips
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F5B22C]"
                />
                <button className="bg-[#F5B22C] hover:bg-[#e0a32a] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Subscribe
                </button>
              </div>
              <p className="text-white/70 text-sm mt-3">
                Join 10,000+ pet lovers in our community
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 12. Final CTA Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#092052] dark:text-white mb-6 YesevaOne">
              Ready to Find Your Perfect Companion?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Thousands of loving pets are waiting for their forever homes. Start your adoption journey today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/petsAndSupplies"
                className="inline-flex items-center gap-2 bg-[#092052] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <PawPrint size={24} />
                Browse Pets
              </Link>
              <Link
                to="/addListing"
                className="inline-flex items-center gap-2 border-2 border-[#092052] text-[#092052] dark:text-white dark:border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#092052] hover:text-white dark:hover:bg-white dark:hover:text-[#092052] transition-all duration-300"
              >
                <HeartHandshake size={24} />
                List a Pet
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;