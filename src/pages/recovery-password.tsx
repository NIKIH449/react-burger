import React, { useEffect, useState } from 'react';
import { AuthForm } from 'components/auth-form/auth-form';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { onRecoveryPassword } from 'services/actions/auth/helpers';
import { useDispatch, useSelector } from '../utils/hooks';
import { useNavigate } from 'react-router';

const RecoveryPassword = () => {
  const russian = localStorage.getItem('rus');
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { recoveryPasswordSuccess, loggedIn } = useSelector(
    (store) => store.auth
  );

  function recoveryPassword(e: { preventDefault: () => void }) {
    e.preventDefault();
    dispatch(onRecoveryPassword(email));
  }
  useEffect(() => {
    if (loggedIn === true) {
      navigate('/');
    }
  }, [loggedIn,navigate]);

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
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
      title={russian ? 'Восстановление пароля' : 'Password recovery '}
      button={russian ? 'Восстановить' : 'Recover'}
      question={russian ? 'Вспомнили пароль?' : 'Rembered password?'}
      questionLink={russian ? 'Войти' : 'Sign in'}
      recovery={''}
      recoveryLink={''}
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
};
export { RecoveryPassword };
