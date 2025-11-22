import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Check if admin is logged in
  const adminToken = localStorage.getItem('adminToken');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (!adminToken || !isAdmin) {
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  // Render admin content if authenticated
  return children;
};

export default AdminRoute;
