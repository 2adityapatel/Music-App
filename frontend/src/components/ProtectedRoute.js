// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  console.log("111" + token );
  const isAuthenticated = () => {
    if (!token) {
      return false;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // Check if the token has expired
      if (decodedToken.exp < currentTime) {
      console.log("Error in exp ");
        return false;
      }

      // Check if the user has the required role
      if (decodedToken.role !== requiredRole) {
      console.log("Error in role")
      console.log(decodedToken.role);
      console.log(requiredRole);
        return false;
      }

      return true;
    } catch (err) {
      console.log("Error");
      return false;
    }
  };

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
