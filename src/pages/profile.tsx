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
const Profile: FC<{}> = ({}) => {
  const {
    name,
    email,
    accessToken,
    refreshToken,
    refreshTokenSuccess,
    signOutSuccess,
    editProfileSuccess,
    loggedIn,
  } = useSelector((store: any) => store.auth);
  const russian = localStorage.getItem('rus');
  const [userEmail, setUserEmail] = useState(email);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState(name);
  const [isInputChange, setIsInputChange] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    setUserEmail(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
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
        <ProfileButton
          link="/profile"
          title={russian ? 'Профиль' : 'Profile'}
          onSignOut={undefined}
          children={undefined}
        />
        <ProfileButton
          link="/profile/orders"
          title={russian ? 'История заказов' : 'Order history'}
          onSignOut={undefined}
          children={undefined}
        />
        <ProfileButton
          onSignOut={signOut}
          link=""
          title={russian ? 'Выход' : 'Log out'}
          children={undefined}
        />
        <p
          className={`mt-20 text text_type_main-small text_color_inactive ${profileStyles.paragraph}`}
        >
          {russian
            ? 'В этом разделе вы можете изменить свои персональные данные'
            : 'In this section you can change your personal data'}
        </p>
      </div>
      {location.pathname === '/profile' ? (
        <form onSubmit={onEditProfile}>
          <div className="mb-6">
            <Input
              value={userName}
              onChange={handleChangeName}
              type={'text'}
              placeholder={russian ? 'Имя' : 'Name'}
              icon={'EditIcon'}
            />
          </div>
          <div className="mb-6">
            <EmailInput
              onChange={handleChangeEmail}
              value={userEmail}
              name={''}
            />
          </div>
          <div>
            <PasswordInput
              onChange={handleChangePassword}
              value={password}
              name={''}
            />
          </div>
          {isInputChange && (
            <div className={`mt-6 ${profileStyles.buttonContainer}`}>
              <button
                onClick={cancelChanges}
                className={profileStyles.cancelButton}
                type="button"
              >
                {russian ? 'Отмена' : 'Cancel'}
              </button>
              <Button type="primary" size="medium">
                {russian ? 'Сохранить' : 'Save'}
              </Button>
            </div>
          )}
        </form>
      ) : (
        <div></div>
      )}
    </section>
  );
};
export { Profile };
