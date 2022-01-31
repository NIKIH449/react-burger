import React, { FC, ReactElement } from 'react';
import { useSelector } from '../../utils/hooks';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router';

const ProtectedRoute: FC<{ children: ReactElement}> = ({ children }) => {
  const location = useLocation();
  const loggedIn = useSelector((store) => store.auth.loggedIn);
  return loggedIn === true ? (
    children
  ) : (
    <Navigate to="/login" state={{ path: location.pathname }} />
  );
};
export { ProtectedRoute };
