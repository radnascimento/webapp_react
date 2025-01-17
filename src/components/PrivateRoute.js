import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust path if needed

// Named export
export const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Assuming `useAuth` gives `isAuthenticated`

    // If authenticated, render children (protected route), otherwise redirect to login
    return isAuthenticated ? children : <Navigate to="/" replace />;
};
