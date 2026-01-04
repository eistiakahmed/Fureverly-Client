import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './Routes/Router';
import AuthProvider from './Context/AuthProvider';

// Import API test utility for debugging (only in development)
if (import.meta.env.DEV) {
  import('./utils/apiTest.js');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
