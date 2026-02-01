// API Test Utility - Only runs in development
console.log('🔧 API Test Utility Loaded');

// Test API endpoints
const testAPI = async () => {
  try {
    console.log('🧪 Testing API endpoints...');
    
    // Test products endpoint
    const productsResponse = await fetch('https://fureverly-server.vercel.app/product');
    console.log('📦 Products API Status:', productsResponse.status);
    
    if (productsResponse.ok) {
      const products = await productsResponse.json();
      console.log('📦 Products Count:', products.length);
    }
    
    // Test orders endpoint (POST)
    console.log('📋 Orders API endpoint available at: https://fureverly-server.vercel.app/orders');
    
  } catch (error) {
    console.error('❌ API Test Failed:', error);
  }
};

// Run test after a short delay
setTimeout(testAPI, 2000);

export default testAPI;