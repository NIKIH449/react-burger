import React from 'react';
import { Navigate } from 'react-router-dom';
import { protectedRoutePropsTypes } from 'utils/type';

export function ProtectedRoute({ loggedIn, children }) {
  return loggedIn ? children : <Navigate to="/login" />;
}
export function ProtectedRouteAuth({ loggedIn, children }) {
  return loggedIn ? <Navigate to="/" /> : children;
}

ProtectedRoute.propTypes = protectedRoutePropsTypes.isRequired;
ProtectedRouteAuth.propTypes = protectedRoutePropsTypes.isRequired;
