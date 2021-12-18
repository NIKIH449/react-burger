import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import Main from '../main/main';
import AppHeader from '../header/app-header';
import '../../fonts/fonts.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onCheckAuth } from 'services/actions/auth';
import { Preloader } from 'components/preloader/preloader';
import { NotFound } from 'pages/not-found';
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
  const ingredientItem = JSON.parse(localStorage.getItem('ingredientItem'));
  const {
    loggedIn,
    loginSuccess,
    refreshToken,
    refreshTokenSuccess,
    loading,
    accessToken,
    recoveryPasswordSuccess,
    registerSuccess,
  } = useSelector((store) => store.auth);
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
  }, [loginSuccess, registerSuccess]);

  useEffect(() => {
    if (refreshTokenSuccess) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      checkAuth(accessToken, refreshToken);
    }
  }, [accessToken, refreshTokenSuccess, refreshToken]);
  return (
    <div className={appStyles.app}>
      <AppHeader />
      {loading ? (
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
            path="/reset-password"
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
            path="/profile"
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
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
