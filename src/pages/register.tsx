import React, { useEffect, useState } from 'react';
import { AuthForm } from 'components/auth-form/auth-form';
import {
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { onRegister } from 'services/actions/auth';
import { useDispatch, useSelector } from '../utils/hooks';
import { useNavigate } from 'react-router';


const Register = () => {
  const russian = localStorage.getItem('rus');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { accessToken, registerSuccess, refreshToken, loggedIn } = useSelector(
    (store) => store.auth
  );
  useEffect(() => {
    if (loggedIn === true) {
      navigate('/');
    }
  }, [loggedIn,navigate]);

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value);
  }

  function signUp(e: { preventDefault: () => void }) {
    e.preventDefault();
    dispatch(onRegister(email, password, name));
  }

  useEffect(() => {
    if (registerSuccess) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate('/');
      setEmail('');
      setName('');
      setPassword('');
    }
  }, [registerSuccess, navigate, refreshToken, accessToken]);

  return (
    <AuthForm
      title={russian ? 'Регистрация' : 'Sign up'}
      button={russian ? 'Зарегистрироваться' : 'Sign up'}
      question={russian ? 'Уже зарегистрированы?' : 'Have an account already?'}
      questionLink={russian ? 'Войти' : 'Log in '}
      onSubmit={signUp}
      recovery={''}
      recoveryLink={''}
    >
      <div className="mb-6 mt-6">
        <Input
          value={name}
          onChange={handleChangeName}
          errorText={russian ? 'Ошибка' : 'Error'}
          placeholder={russian ? 'Имя' : 'Name'}
          size={'default'}
          icon={'EditIcon'}
        />
      </div>
      <div className="mb-6">
        <Input
          onChange={handleChangeEmail}
          value={email}
          errorText={russian ? 'Ошибка' : 'Error'}
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
    </AuthForm>
  );
};
export { Register };
