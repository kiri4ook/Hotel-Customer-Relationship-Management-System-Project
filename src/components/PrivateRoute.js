import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateGuard = ({ children }) => {
    const isAuthorized = useSelector(state => state.auth.isAuthorized);
    if (!isAuthorized) {
        return <Navigate to='/' />
    }
    return (
        children
    );
};

export default PrivateGuard;

