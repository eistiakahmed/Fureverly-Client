import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Award, 
  Shield, 
  Target, 
  Zap,
  CheckCircle,
  Star
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Happy Pet Owners', value: '10,000+', icon: <Heart size={24} /> },
    { label: 'Pets Adopted', value: '5,000+', icon: <Users size={24} /> },
    { label: 'Years of Service', value: '5+', icon: <Award size={24} /> },
    { label: 'Trusted Partners', value: '100+', icon: <Shield size={24} /> }
  ];

  const values = [
    {
      icon: <Heart size={32} />,
      title: 'Pet Welfare First',
      description: 'Every decision we make prioritizes the health, happiness, and well-being of pets.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Trust & Safety',
      description: 'We maintain the highest standards of safety and verification for all our users.'
    },
    {
      icon: <Users size={32} />,
      title: 'Community Driven',
      description: 'Building a supportive community of pet lovers who care for each other.'
    },
    {
      icon: <Target size={32} />,
      title: 'Quality Service',
      description: 'Providing exceptional service and support to make pet ownership easier.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://i.ibb.co/2FsfXqM/user.png',
      bio: 'Passionate animal lover with 10+ years in pet care industry.'
    },
    {
      name: 'Mike Chen',
      role: 'Head of Operations',
      image: 'https://i.ibb.co/2FsfXqM/user.png',
      bio: 'Expert in logistics and ensuring smooth platform operations.'
    },
    {
      name: 'Emily Davis',
      role: 'Veterinary Advisor',
      image: 'https://i.ibb.co/2FsfXqM/user.png',
      bio: 'Licensed veterinarian ensuring pet health and safety standards.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#092052] to-[#F5B22C] text-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">About Fureverly</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              We're on a mission to connect loving families with their perfect pet companions 
              while providing everything needed for a happy, healthy pet life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700"
              >
                <div className="w-16 h-16 bg-[#F5B22C] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Fureverly was born from a simple belief: every pet deserves a loving home, 
                  and every family deserves the perfect companion. Founded in 2019, we started 
                  as a small local initiative to help pets find their forever families.
                </p>
                <p>
                  Today, we've grown into a comprehensive platform that not only facilitates 
                  pet adoptions but also provides everything pet owners need - from premium 
                  food and accessories to expert care products and services.
                </p>
                <p>
                  Our commitment goes beyond just connecting pets with families. We're building 
                  a community where pet lovers can share experiences, get expert advice, and 
                  ensure their furry friends live their best lives.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://i.ibb.co/B2MHQc1K/slink-Dogs.png"
                alt="Happy pets"
                className="rounded-2xl shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#F5B22C] text-white p-4 rounded-xl shadow-lg">
                <Star size={24} className="mb-2" />
                <p className="font-bold">5-Star</p>
                <p className="text-sm">Rated Platform</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment to pets and their families.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#F5B22C]/10 rounded-lg flex items-center justify-center mb-4 text-[#F5B22C]">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Passionate individuals dedicated to making pet ownership a joyful experience for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-[#F5B22C] font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-[#092052] to-[#F5B22C] text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl opacity-90 leading-relaxed mb-8">
              To create a world where every pet finds a loving home and every pet owner 
              has access to the resources they need to provide the best care possible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle size={20} />
                <span>Ethical Practices</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle size={20} />
                <span>Quality Products</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle size={20} />
                <span>Expert Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;