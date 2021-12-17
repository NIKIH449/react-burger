import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import Main from '../main/main';
import AppHeader from '../header/app-header';
import '../../fonts/fonts.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onCheckAuth } from 'services/actions/auth';
import { Preloader } from 'components/preloader/preloader';
import {
  ProtectedRoute,
  ProtectedRouteAuth,
} from 'components/protected-route/protected-route';
import {
  Login,
  Ingredient,
  Profile,
  RecoveryPassword,
  Register,
  ResetPassword,
} from 'pages';

function App() {
  const recoveryPasswordSuccess = useSelector(
    (store) => store.auth.recoveryPasswordSuccess
  );
  const ingredientItem = JSON.parse(localStorage.getItem('ingredientItem'));
  const loggedIn = useSelector((store) => store.auth.loggedIn);
  const loginSuccess = useSelector((store) => store.auth.loginSuccess);
  const accessToken = useSelector((store) => store.auth.token);
  const isLoading = useSelector((store) => store.auth.loading);
  const refreshToken = useSelector((store) => store.auth.refreshToken);
  const refreshSuccess = useSelector((store) => store.auth.refreshTokenSuccess);
  const [authState, setAuthState] = useState(false);
  const dispatch = useDispatch();
  function checkAuth(accessToken, refreshToken) {
    dispatch(onCheckAuth(accessToken, refreshToken));
  }
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
      checkAuth(accessToken, refreshToken);
      setAuthState(true);
    }
  }, []);

  useEffect(() => {
    setAuthState(true);
  }, [loginSuccess]);

  useEffect(() => {
    if (refreshSuccess) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      checkAuth(accessToken, refreshToken);
    }
  }, [accessToken, refreshSuccess, refreshToken]);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      {isLoading ? (
        <Preloader />
      ) : (
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRouteAuth loggedIn={loggedIn}>
                <Login />
              </ProtectedRouteAuth>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteAuth loggedIn={loggedIn}>
                <Register />
              </ProtectedRouteAuth>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteAuth loggedIn={loggedIn}>
                <RecoveryPassword />
              </ProtectedRouteAuth>
            }
          />
          <Route
            path={'/reset-password'}
            element={
              <ProtectedRouteAuth loggedIn={loggedIn}>
                {recoveryPasswordSuccess ? (
                  <ResetPassword />
                ) : (
                  <RecoveryPassword />
                )}
              </ProtectedRouteAuth>
            }
          />
          <Route
            path={'/profile'}
            element={
              authState ? (
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile />
                </ProtectedRoute>
              ) : (
                <ProtectedRouteAuth loggedIn={loggedIn}>
                  <Login />
                </ProtectedRouteAuth>
              )
            }
          />
          <Route path="/profile/orders" element={<Profile />} />
          <Route
            path="/ingredients/:id"
            ingredientItem={ingredientItem}
            element={<Ingredient />}
          />
          <Route path="/" element={<Main />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
