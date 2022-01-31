import React, { useEffect, useState, FC } from 'react';
import { AuthForm } from 'components/auth-form/auth-form';
import { onLogin } from 'services/actions/auth';
import {
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import '../index.css';
import { useDispatch, useSelector } from '../utils/hooks';
import { useLocation, useNavigate } from 'react-router';
const Login: FC = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { accessToken, refreshToken, loginSuccess, loginFailed, loggedIn } =
    useSelector((store) => store.auth);

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function signIn(e: { preventDefault: () => void }) {
    e.preventDefault();
    dispatch(onLogin(email, password));
  }

  useEffect(() => {
    if (loginSuccess) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate(state?.path || '/');
      setEmail('');
      setPassword('');
    }
  }, [
    loginSuccess,
    refreshToken,
    password,
    accessToken,
    navigate,
    state?.path,
  ]);

  useEffect(() => {
    if (loggedIn === true) {
      navigate('/profile');
    }
  }, [loggedIn, navigate]);

  return (
    <AuthForm
      title="Вход"
      button="Войти"
      question="Вы — новый пользователь?"
      recovery="Забыли пароль?"
      questionLink="Зарегистрироваться"
      recoveryLink="Восстановить пароль"
      onSubmit={signIn}
    >
      <div className="mb-6 mt-6">
        <Input
          onChange={handleChangeEmail}
          value={email}
          placeholder={'E-mail'}
          type={'email'}
          size={'default'}
        />
      </div>
      <div>
        <PasswordInput
          value={password}
          onChange={handleChangePassword}
          size={'default'}
          name={''}
        />
      </div>

      {loginFailed && (
        <p className="mt-5 text text_type_main-small">
          Ошибка. Возможно логин или пароль ошибочны.
        </p>
      )}
    </AuthForm>
  );
};
export { Login };
