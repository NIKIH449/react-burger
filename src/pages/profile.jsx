import React, { useEffect, useState } from 'react';
import profileStyles from './profile.module.css';
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileButton from 'components/profile-button/profile-button';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { onSignOut } from 'services/actions/auth';
import { onEditUserInfo } from 'services/actions/auth';
import { GET_EDITPROFILE_RESET } from 'services/actions/auth';
export function Profile() {
  const userName = useSelector((store) => store.auth.name);
  const userEmail = useSelector((store) => store.auth.email);
  const accessToken = useSelector((store) => store.auth.token);
  const refreshToken = useSelector((store) => store.auth.refreshToken);
  const refreshSuccess = useSelector((store) => store.auth.refreshTokenSuccess);
  const signOutSuccess = useSelector((store) => store.auth.signOutSuccess);
  const editProfileSuccess = useSelector(
    (store) => store.auth.editProfileSuccess
  );
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState('');
  const [name, setName] = useState(userName);
  const [isInputChange, setIsInputChange] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  useEffect(() => {
    if (!(userEmail === email && password === '' && userName === name)) {
      setIsInputChange(true);
    } else {
      setIsInputChange(false);
    }
  }, [email, password, name]);

  function onEditProfile(e) {
    e.preventDefault();
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(onEditUserInfo(email, name, password, accessToken, refreshToken));
  }

  useEffect(() => {
    if (refreshSuccess) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(
        onEditUserInfo(email, name, password, accessToken, refreshToken)
      );
    }
  }, [accessToken, refreshSuccess, refreshToken, dispatch]);

  useEffect(() => {
    if (signOutSuccess) {
      navigate('/');
      setEmail('');
      setPassword('');
      setName('');
      setIsInputChange(false);
    }
  }, [signOutSuccess, navigate]);

  useEffect(() => {
    if (editProfileSuccess) {
      setIsInputChange(false);
      dispatch({ type: GET_EDITPROFILE_RESET });
    }
  }, [editProfileSuccess, userName, userEmail, dispatch]);

  function cancelChanges() {
    setName(localStorage.getItem('userName'));
    setEmail(localStorage.getItem('userEmail'));
    setPassword('');
  }

  function signOut() {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(onSignOut(refreshToken));
  }

  return (
    <section className={`mt-30 ${profileStyles.profile}`}>
      <div className={`mr-15 ${profileStyles.container}`}>
        <ProfileButton link="/profile" title="Профиль" />
        <ProfileButton link="/profile/orders" title="История заказов" />
        <ProfileButton onSignOut={signOut} link="" title="Выход" />
        <p
          className={`mt-20 text text_type_main-small text_color_inactive ${profileStyles.paragraph}`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      {location.pathname === '/profile' ? (
        <form onSubmit={onEditProfile}>
          <div className="mb-6">
            <Input
              value={name}
              onChange={handleChangeName}
              type={'text'}
              placeholder={'Имя'}
              icon={'EditIcon'}
            />
          </div>
          <div className="mb-6">
            <EmailInput onChange={handleChangeEmail} value={email} />
          </div>
          <div>
            <PasswordInput onChange={handleChangePassword} value={password} />
          </div>
          {isInputChange && (
            <div className={`mt-6 ${profileStyles.buttonContainer}`}>
              <button
                onClick={cancelChanges}
                className={profileStyles.cancelButton}
                type="button"
              >
                Отмена
              </button>
              <Button type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      ) : (
        <div></div>
      )}
    </section>
  );
}
