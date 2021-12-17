import React, { useEffect, useState } from 'react';
import { AuthForm } from 'components/auth-form/auth-form';
import {
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { onRegister } from 'services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
export function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerSuccess = useSelector((store) => store.auth.registerSuccess);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const auth = useSelector((store) => store.auth);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function signUp(e) {
    e.preventDefault();
    dispatch(onRegister(email, password, name));
  }

  useEffect(() => {
    if (registerSuccess) {
      localStorage.setItem('accessToken', auth.token);
      localStorage.setItem('refreshToken', auth.refreshToken);
      navigate('/');
      setEmail('');
      setName('');
      setPassword('');
    }
  }, [registerSuccess, navigate, auth.refreshToken, auth.token]);

  return (
    <AuthForm
      title="Регистрация"
      button="Зарегистрироваться"
      question="Уже зарегистрированы?"
      questionLink="Войти"
      onSubmit={signUp}
    >
      <div className="mb-6 mt-6">
        <Input
          value={name}
          onChange={handleChangeName}
          errorText={'Ошибка'}
          placeholder={'Имя'}
          size={'default'}
          icon={'EditIcon'}
        />
      </div>
      <div className="mb-6">
        <Input
          onChange={handleChangeEmail}
          value={email}
          errorText={'Ошибка'}
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
