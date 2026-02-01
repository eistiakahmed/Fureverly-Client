import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import { RingLoader } from 'react-spinners';

const AdminRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#092052" size={80} />
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
  }

  // For now, allow all authenticated users to access admin routes
  // You can add proper role checking later when your backend is ready
  return children;
};

export default AdminRoutes;