import React, { useEffect, useState } from 'react';
import { AuthForm } from 'components/auth-form/auth-form';
import {
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../utils/hooks';
import { useNavigate } from 'react-router';
import { onResetPassword } from 'services/actions/auth';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const { resetPasswordSuccess, recoveryPasswordSuccess, loggedIn } =
    useSelector((store) => store.auth);

  function resetPassword(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    dispatch(onResetPassword(password, code));
  }

  useEffect(() => {
    if (resetPasswordSuccess) {
      navigate('/');
      setPassword('');
      setCode('');
    }
  }, [resetPasswordSuccess, navigate]);

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function handleChangeCode(e: React.ChangeEvent<HTMLInputElement>): void {
    setCode(e.target.value);
  }

  useEffect(() => {
    if (loggedIn === true) {
      navigate('/');
    }
    if (recoveryPasswordSuccess === false) {
      navigate('/forgot-password');
    }
  }, [loggedIn, navigate, recoveryPasswordSuccess]);

  return (
    <AuthForm
      onSubmit={resetPassword}
      title={russian ? 'Восстановление пароля' : 'Password recovery'}
      button={russian ? 'Сохранить' : 'Save'}
      question={russian ? 'Вспомнили пароль?' : 'Rembered password?'}
      questionLink={russian ? 'Войти' : 'Log in'}
      recovery={''}
      recoveryLink={''}
    >
      {!loggedIn && (
        <>
          <div className="mb-6 mt-6">
            <PasswordInput
              value={password}
              onChange={handleChangePassword}
              size={'default'}
              name={''}
            />
          </div>
          <div className="mb-6">
            <Input
              value={code}
              onChange={handleChangeCode}
              placeholder={
                russian
                  ? 'Введите код из письма'
                  : 'Enter the code from the letter'
              }
              size={'default'}
            />
          </div>
        </>
      )}
    </AuthForm>
  );
};
export { ResetPassword };
