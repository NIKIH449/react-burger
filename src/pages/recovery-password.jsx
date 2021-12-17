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
  const recoverySuccess = useSelector(
    (store) => store.auth.recoveryPasswordRequest
  );

  function recoveryPassword(e) {
    e.preventDefault();
    dispatch(onRecoveryPassword(email));
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  useEffect(() => {
    if (recoverySuccess) {
      navigate('/reset-password');
      setEmail('');
    }
  }, [recoverySuccess, navigate]);

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
