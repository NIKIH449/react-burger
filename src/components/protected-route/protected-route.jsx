import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { protectedRoutePropsTypes } from 'utils/type';
import { Navigate } from 'react-router';

export function ProtectedRoute({ children }) {
  const location = useLocation();
  const loggedIn = useSelector((store) => store.auth.loggedIn);
  return loggedIn === true ? (
    children
  ) : (
    <Navigate to="/login" state={{ path: location.pathname }} />
  );
}
ProtectedRoute.propTypes = protectedRoutePropsTypes.isRequired;
