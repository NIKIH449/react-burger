import React, { FC, ReactChild, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router';

const ProtectedRoute: FC<{ children: any }> = ({ children }) => {
  const location = useLocation();
  const loggedIn = useSelector((store: any) => store.auth.loggedIn);
  return loggedIn === true ? (
    children
  ) : (
    <Navigate to="/login" state={{ path: location.pathname }} />
  );
};
export { ProtectedRoute };
