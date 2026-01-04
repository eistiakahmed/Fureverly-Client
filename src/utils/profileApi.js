// Profile API utilities to work with your backend
import { auth } from '../Firebase/firebase.config';

// Use Vite environment variable syntax - add VITE_API_URL to your .env file
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Get Firebase auth token
const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

// Profile API functions
export const profileApi = {
  // Get user profile (uses your existing endpoint)
  getProfile: () => apiRequest('/user/profile'),
  
  // Update user profile (uses your existing endpoint)
  updateProfile: (profileData) => apiRequest('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),
  
  // Get user role (uses your existing endpoint)
  getUserRole: () => apiRequest('/user/role'),
  
  // Calculate user stats from existing data
  getUserStats: async () => {
    try {
      // Get dashboard stats which includes user-specific data
      const dashboardStats = await apiRequest('/dashboard/stats');
      
      // Transform to match our profile stats format
      return {
        totalListings: dashboardStats.userProducts || 0,
        totalOrders: dashboardStats.userOrders || 0,
        totalFavorites: 0, // You'll need to add this to backend
        averageRating: 0, // You'll need to add this to backend
        totalViews: 0, // You'll need to add this to backend
        totalFollowers: 0, // You'll need to add this to backend
      };
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
      return {
        totalListings: 0,
        totalOrders: 0,
        totalFavorites: 0,
        averageRating: 0,
        totalViews: 0,
        totalFollowers: 0,
      };
    }
  },
  
  // Get user's products (for profile listings)
  getUserProducts: async () => {
    try {
      const products = await apiRequest('/products');
      const currentUser = auth.currentUser;
      if (!currentUser) return [];
      
      return products.filter(product => product.email === currentUser.email);
    } catch (error) {
      console.error('Failed to fetch user products:', error);
      return [];
    }
  },
  
  // Get user's orders (uses your existing endpoint)
  getUserOrders: () => apiRequest('/orders'),
};

// Profile completion calculator
export const calculateProfileCompletion = (user, profileData) => {
  const fields = [
    user?.displayName,
    user?.photoURL,
    user?.email,
    profileData?.phone,
    profileData?.location,
    profileData?.bio,
  ];
  
  const completedFields = fields.filter(field => field && field.toString().trim() !== '');
  return Math.round((completedFields.length / fields.length) * 100);
};

// Profile data transformer
export const transformUserProfile = (backendUser) => {
  return {
    bio: backendUser.bio || 'Pet lover and enthusiast.',
    location: backendUser.address || backendUser.location || 'Location not specified',
    phone: backendUser.phone || '',
    website: backendUser.website || '',
    joinDate: new Date(backendUser.createdAt),
    isVerified: backendUser.isVerified || false,
    profileCompletion: backendUser.profileCompletion || 0,
  };
};