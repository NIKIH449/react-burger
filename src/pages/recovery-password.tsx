import React, { FC, useEffect, useState } from 'react';
import { AuthForm } from 'components/auth-form/auth-form';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { onRecoveryPassword } from 'services/actions/auth';
import { useDispatch, useSelector } from '../utils/hooks';
import { useNavigate } from 'react-router';
const RecoveryPassword: FC<{}> = ({}) => {
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
  }, []);
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
      title="Восстановление пароля"
      button="Восстановить"
      question="Вспомнили пароль?"
      questionLink="Войти"
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
