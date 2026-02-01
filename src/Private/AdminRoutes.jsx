import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import { RingLoader } from 'react-spinners';

const AdminRoutes = ({ children }) => {
  const { user, loading, userRole, roleLoading } = useContext(AuthContext);
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#092052" size={80} />
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
  }

  // Check if user has admin role
  if (userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoutes;