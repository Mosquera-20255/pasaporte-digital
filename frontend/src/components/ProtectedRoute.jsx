// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('admin_token');

    if (!token) {
        // Si no hay token, redirige al login de admin
        return <Navigate to="/admin" />;
    }

    // Si hay token, muestra el componente hijo (la página protegida)
    return children;
};

export default ProtectedRoute;