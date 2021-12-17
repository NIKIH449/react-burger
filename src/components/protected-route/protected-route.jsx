import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = (props) => {
  return props.loggedIn ? props.children : <Navigate to="/login" />;
};
export const ProtectedRouteAuth = (props) => {
  return props.loggedIn ? <Navigate to="/" /> : props.children;
};
