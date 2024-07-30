/* eslint-disable react/prop-types */

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('user');

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
