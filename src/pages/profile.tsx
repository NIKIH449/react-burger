import React, { FC, useEffect, useState } from 'react';
import profileStyles from './profile.module.css';
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileButton } from 'components/profile-button/profile-button';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { onEditUserInfo, onSignOut } from 'services/actions/auth';
import { GET_EDITPROFILE_RESET } from 'services/actions/auth/edit-profile';
const Profile:FC <{}> = ({}) => {
  const {
    name,
    email,
    accessToken,
    refreshToken,
    refreshTokenSuccess,
    signOutSuccess,
    editProfileSuccess,
    loggedIn,
  } = useSelector((store:any) => store.auth);

  const [userEmail, setUserEmail] = useState(email);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState(name);
  const [isInputChange, setIsInputChange] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void  {
    setUserEmail(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>): void  {
    setPassword(e.target.value);
  }

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void  {
    setUserName(e.target.value);
  }
  useEffect(() => {
    if (loggedIn === false) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (!(userEmail === email && password === '' && userName === name)) {
      setIsInputChange(true);
    } else {
      setIsInputChange(false);
    }
  }, [userEmail, password, userName]);

  function onEditProfile(e: { preventDefault: () => void }) {
    e.preventDefault();
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(
      onEditUserInfo(userEmail, userName, password, accessToken, refreshToken)
    );
  }

  useEffect(() => {
    if (refreshTokenSuccess) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(
        onEditUserInfo(userEmail, userName, password, accessToken, refreshToken)
      );
    }
  }, [accessToken, refreshTokenSuccess, refreshToken, dispatch]);

  useEffect(() => {
    if (signOutSuccess) {
      navigate('/login');
      setUserEmail('');
      setPassword('');
      setUserName('');
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
    setUserName(localStorage.getItem('userName'));
    setUserEmail(localStorage.getItem('userEmail'));
    setPassword('');
  }

  function signOut() {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(onSignOut(refreshToken));
  }

  return (
    <section className={`mt-30 ${profileStyles.profile}`}>
      <div className={`mr-15 ${profileStyles.container}`}>
        <ProfileButton link="/profile" title="Профиль" onSignOut={undefined} children={undefined} />
        <ProfileButton link="/profile/orders" title="История заказов" onSignOut={undefined} children={undefined} />
        <ProfileButton onSignOut={signOut} link="" title="Выход" children={undefined} />
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
              value={userName}
              onChange={handleChangeName}
              type={'text'}
              placeholder={'Имя'}
              icon={'EditIcon'}
            />
          </div>
          <div className="mb-6">
            <EmailInput onChange={handleChangeEmail} value={userEmail} name={''} />
          </div>
          <div>
            <PasswordInput onChange={handleChangePassword} value={password} name={''} />
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
export {Profile}
