import React, { FC, useEffect, useState } from 'react';
import { AuthForm } from 'components/auth-form/auth-form';
import {
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { onRegister } from 'services/actions/auth';
import { useDispatch, useSelector } from '../utils/hooks';
import { useNavigate } from 'react-router';

const Register: FC<{}> = ({}) => {
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
  }, []);

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
      title="Регистрация"
      button="Зарегистрироваться"
      question="Уже зарегистрированы?"
      questionLink="Войти"
      onSubmit={signUp}
      recovery={''}
      recoveryLink={''}
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
          name={''}
        />
      </div>
    </AuthForm>
  );
};
export { Register };
