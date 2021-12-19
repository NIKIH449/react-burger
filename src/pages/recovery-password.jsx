import React, { useEffect, useState } from 'react';
import { AuthForm } from 'components/auth-form/auth-form';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { onRecoveryPassword } from 'services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
export function RecoveryPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { recoveryPasswordSuccess, loggedIn } = useSelector(
    (store) => store.auth
  );

  function recoveryPassword(e) {
    e.preventDefault();
    dispatch(onRecoveryPassword(email));
  }
  useEffect(() => {
    if (loggedIn === true) {
      navigate('/');
    }
  }, []);
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  useEffect(() => {
    if (recoveryPasswordSuccess) {
      navigate('/reset-password');
      setEmail('');
    }
  }, [recoveryPasswordSuccess, navigate]);

  return (
    <AuthForm
      onSubmit={recoveryPassword}
      title="Восстановление пароля"
      button="Восстановить"
      question="Вспомнили пароль?"
      questionLink="Войти"
    >
      <div className="mb-6 mt-6">
        <Input
          value={email}
          onChange={handleChangeEmail}
          placeholder={'E-mail'}
          type={'email'}
          size={'default'}
        />
      </div>
    </AuthForm>
  );
}
