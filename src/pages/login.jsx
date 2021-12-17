import React, { useEffect, useState } from 'react';
import { AuthForm } from 'components/auth-form/auth-form';
import { onLogin } from 'services/actions/auth';
import {
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
export function Login() {
  const loggedSuccess = useSelector((store) => store.auth.loginSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((store) => store.auth);
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function signIn(e) {
    e.preventDefault();
    dispatch(onLogin(email, password));
  }

  useEffect(() => {
    if (loggedSuccess) {
      localStorage.setItem('accessToken', auth.token);
      localStorage.setItem('refreshToken', auth.refreshToken);

      navigate('/');
      setEmail('');
      setPassword('');
    }
  }, [loggedSuccess, auth.refreshToken, password, auth.token, navigate]);

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
        />
      </div>
    </AuthForm>
  );
}
