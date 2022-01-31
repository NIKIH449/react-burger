import React, { useEffect } from 'react';
import appStyles from './app.module.css';
import Main from '../main/main';
import { AppHeader } from 'components/header/app-header';
import '../../fonts/fonts.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/hooks';
import { onCheckAuth, onRefreshToken } from 'services/actions/auth';
import { Preloader } from 'components/preloader/preloader';
import { NotFound } from 'pages/not-found';
import { useLocation } from 'react-router';
import { ProtectedRoute } from 'components/protected-route/protected-route';
import {
  Login,
  Ingredient,
  Profile,
  RecoveryPassword,
  Register,
  ResetPassword,
} from 'pages';
import { Feed } from 'pages/feed';
import { Order } from '../../pages/order';
import { getIngredients } from 'services/actions/ingredients';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const {
    refreshToken,
    refreshTokenSuccess,
    authLoading,
    accessToken,
    chekAuthFailed,
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  useEffect(() => {
    ingredients.length === 0 && dispatch(getIngredients());
  }, [dispatch, ingredients.length]);

  const checkAuth = (
    accessToken: string | null,
    refreshToken: string | null
  ) => {
    dispatch(onCheckAuth(accessToken, refreshToken));
  };

  useEffect(() => {
    const pathname = location.pathname;
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      checkAuth(accessToken, pathname);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (refreshTokenSuccess) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      checkAuth(accessToken, refreshToken);
    }
    // eslint-disable-next-line
  }, [accessToken, refreshTokenSuccess, refreshToken]);

  useEffect(() => {
    if (chekAuthFailed) {
      const refreshToken = localStorage.getItem('refreshToken');
      dispatch(onRefreshToken(refreshToken));
    }
  }, [chekAuthFailed, dispatch]);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      {authLoading ? (
        <Preloader />
      ) : (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<RecoveryPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile/orders" element={<Profile />} />
          <Route path="/profile/orders/:id" element={<Order />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:id" element={<Order />} />
          <Route path="/ingredients/:id" element={<Ingredient />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />}></Route>
          {background && (
            <>
              <Route path="/ingredients/:id" element={<Ingredient />} />
              <Route path="/feed/:id" element={<Order />} />
              <Route path="/profile/:id" element={<Order />} />
            </>
          )}
        </Routes>
      )}
    </div>
  );
}

export default App;
