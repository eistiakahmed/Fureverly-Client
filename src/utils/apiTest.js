// Simple API connection test utility
import { auth } from '../Firebase/firebase.config';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const testApiConnection = async () => {
  try {
    console.log('Testing API connection to:', API_BASE_URL);
    
    // Test basic connection
    const response = await fetch(`${API_BASE_URL}/`);
    const text = await response.text();
    console.log('✅ Basic API connection successful:', text);
    
    // Test with auth if user is logged in
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      console.log('🔑 Firebase token obtained:', token.substring(0, 20) + '...');
      
      // Test authenticated endpoint
      const authResponse = await fetch(`${API_BASE_URL}/user/role`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (authResponse.ok) {
        const roleData = await authResponse.json();
        console.log('✅ Authenticated API call successful:', roleData);
      } else {
        console.log('❌ Authenticated API call failed:', authResponse.status, authResponse.statusText);
      }
    } else {
      console.log('ℹ️ No user logged in, skipping auth test');
    }
    
    return true;
  } catch (error) {
    console.error('❌ API connection test failed:', error);
    return false;
  }
};

// Call this function in browser console to test API connection
window.testApiConnection = testApiConnection;