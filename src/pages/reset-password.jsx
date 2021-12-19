import React, { useEffect, useState } from 'react';
import { AuthForm } from 'components/auth-form/auth-form';
import {
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { onResetPassword } from 'services/actions/auth';
export function ResetPassword() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const { resetPasswordSuccess, recoveryPasswordSuccess, loggedIn } =
    useSelector((store) => store.auth);

  function resetPassword(e) {
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

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeCode(e) {
    setCode(e.target.value);
  }

  useEffect(() => {
    if (loggedIn === true) {
      navigate('/');
    }
    if (recoveryPasswordSuccess === false) {
      navigate('/forgot-password');
    }
  }, []);

  return (
    <AuthForm
      onSubmit={resetPassword}
      title="Восстановление пароля"
      button="Сохранить"
      question="Вспомнили пароль?"
      questionLink="Войти"
    >
      {!loggedIn && (
        <>
          <div className="mb-6 mt-6">
            <PasswordInput
              value={password}
              onChange={handleChangePassword}
              placeholder={'Введите новый пароль'}
              size={'default'}
            />
          </div>
          <div className="mb-6">
            <Input
              value={code}
              onChange={handleChangeCode}
              placeholder={'Введите код из письма'}
              size={'default'}
            />
          </div>
        </>
      )}
    </AuthForm>
  );
}
