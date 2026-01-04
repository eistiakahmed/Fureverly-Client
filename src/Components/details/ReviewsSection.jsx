import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { ThumbsUp, ThumbsDown, MessageCircle, User } from 'lucide-react';

const ReviewsSection = ({ productId, productName }) => {
  const [activeTab, setActiveTab] = useState('reviews');

  // Mock reviews data - in production, this would come from an API
  const reviewsData = {
    averageRating: 4.5,
    totalReviews: 24,
    ratingBreakdown: {
      5: 15,
      4: 6,
      3: 2,
      2: 1,
      1: 0
    },
    reviews: [
      {
        id: 1,
        userName: 'Sarah Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        rating: 5,
        date: '2024-01-15',
        title: 'Amazing companion!',
        comment: 'This little guy has brought so much joy to our family. He\'s well-trained, friendly, and absolutely loves playing with our kids. The adoption process was smooth and the previous owner was very helpful.',
        helpful: 12,
        verified: true
      },
      {
        id: 2,
        userName: 'Mike Chen',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        rating: 4,
        date: '2024-01-10',
        title: 'Great pet, minor adjustment period',
        comment: 'Took about a week for him to get comfortable in our home, but now he\'s perfect. Very healthy and active. Would definitely recommend to other families.',
        helpful: 8,
        verified: true
      },
      {
        id: 3,
        userName: 'Emily Rodriguez',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        rating: 5,
        date: '2024-01-05',
        title: 'Perfect addition to our family',
        comment: 'Couldn\'t be happier with our new family member. He\'s gentle, loving, and gets along great with our other pets. The seller was honest about his temperament and needs.',
        helpful: 15,
        verified: true
      }
    ]
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" size={16} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" size={16} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" size={16} />);
    }
    return stars;
  };

  const getRatingPercentage = (rating) => {
    return (reviewsData.ratingBreakdown[rating] / reviewsData.totalReviews) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-6 py-3 font-medium transition-colors duration-200 border-b-2 ${
            activeTab === 'reviews'
              ? 'border-[#F5B22C] text-[#F5B22C]'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Reviews ({reviewsData.totalReviews})
        </button>
        <button
          onClick={() => setActiveTab('qa')}
          className={`px-6 py-3 font-medium transition-colors duration-200 border-b-2 ${
            activeTab === 'qa'
              ? 'border-[#F5B22C] text-[#F5B22C]'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Q&A (3)
        </button>
      </div>

      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="text-5xl font-bold text-[#092052] dark:text-white mb-2">
                  {reviewsData.averageRating}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(reviewsData.averageRating)}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Based on {reviewsData.totalReviews} reviews
                </p>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8">
                      {rating}★
                    </span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-[#F5B22C] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${getRatingPercentage(rating)}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                      {reviewsData.ratingBreakdown[rating]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviewsData.reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {review.userName}
                        </h4>
                        {review.verified && (
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {review.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      {renderStars(review.rating)}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {review.title}
                      </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {review.comment}
                    </p>

                    {/* Review Actions */}
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                        <ThumbsUp size={16} />
                        <span className="text-sm">Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
                        <ThumbsDown size={16} />
                        <span className="text-sm">Not helpful</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                        <MessageCircle size={16} />
                        <span className="text-sm">Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center">
            <button className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              Load More Reviews
            </button>
          </div>
        </div>
      )}

      {activeTab === 'qa' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {/* Q&A Items */}
          {[
            {
              question: "Is this pet good with children?",
              answer: "Yes, absolutely! He's very gentle and patient with kids of all ages.",
              askedBy: "Jennifer M.",
              answeredBy: "Pet Owner",
              date: "2024-01-12"
            },
            {
              question: "What are the vaccination records?",
              answer: "All vaccinations are up to date. I can provide the complete medical records upon adoption.",
              askedBy: "David L.",
              answeredBy: "Pet Owner",
              date: "2024-01-08"
            },
            {
              question: "Does he get along with other pets?",
              answer: "Yes, he's very social and gets along well with both cats and dogs.",
              askedBy: "Maria S.",
              answeredBy: "Pet Owner",
              date: "2024-01-05"
            }
          ].map((qa, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="space-y-4">
                <div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <MessageCircle className="text-blue-600 dark:text-blue-400" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-1">
                        {qa.question}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Asked by {qa.askedBy} on {qa.date}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="ml-11">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {qa.answer}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      — {qa.answeredBy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Ask Question Button */}
          <div className="text-center">
            <button className="bg-[#092052] dark:bg-[#F5B22C] text-white dark:text-[#092052] px-6 py-3 rounded-lg hover:bg-[#0a2458] dark:hover:bg-[#e0a32a] transition-colors duration-200">
              Ask a Question
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReviewsSection;