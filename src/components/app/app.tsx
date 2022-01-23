import React, { useEffect } from 'react';
import appStyles from './app.module.css';
import Main from '../main/main';
import { AppHeader } from 'components/header/app-header';
import '../../fonts/fonts.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onCheckAuth } from 'services/actions/auth';
import { Preloader } from 'components/preloader/preloader';
import { NotFound } from 'pages/not-found';
import { useLocation, useNavigate } from 'react-router';
import { ProtectedRoute } from 'components/protected-route/protected-route';
import {
  Login,
  Ingredient,
  Profile,
  RecoveryPassword,
  Register,
  ResetPassword,
} from 'pages';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const { refreshToken, refreshTokenSuccess, loading, accessToken } =
    useSelector((store: any) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('eng')) {
      localStorage.setItem('rus', 'rus');
    }
  }, []);

  const checkAuth = (
    accessToken: string | null,
    refreshToken: string | null
  ) => {
    dispatch(onCheckAuth(accessToken, refreshToken));
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
      checkAuth(accessToken, refreshToken);
    }
  }, []);

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<RecoveryPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/orders" element={<Profile />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/ingredients/:id" element={<Ingredient />} />
          {background && (
            <Route path="/ingredients/:id" element={<Ingredient />} />
          )}
        </Routes>
      )}
    </div>
  );
}

export default App;
