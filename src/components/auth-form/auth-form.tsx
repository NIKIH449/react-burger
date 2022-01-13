import React, { FC, ReactNode } from 'react';
import authFormStyle from './auth-form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

export const AuthForm: FC<{
  onSubmit: any;
  title: string;
  children: ReactNode;
  button: string;
  question: string;
  questionLink: string;
  recovery: string;
  recoveryLink: string;
}> = ({
  onSubmit,
  title,
  children,
  button,
  question,
  questionLink,
  recovery,
  recoveryLink,
}) => {

  const location = useLocation();
  return (
    <section className={authFormStyle.auth}>
      <form onSubmit={onSubmit} className={authFormStyle.form}>
        <div className={authFormStyle.container}>
          <p className={`text text_type_main-medium ${authFormStyle.title}`}>
            {title}
          </p>
          <div className={`mb-6 ${authFormStyle.inputContainer}`}>
            {children}
          </div>
          <div className={authFormStyle.button}>
            <Button type="primary" size="medium">
              {button}
            </Button>
          </div>
        </div>
        <div>
          <p
            className={`mb-4 text text_type_main-default text_color_inactive ${authFormStyle.paragraph}`}
          >
            {question}{' '}
            <Link
              className={authFormStyle.link}
              to={location.pathname === '/login' ? '/register' : '/login'}
            >
              {questionLink}
            </Link>
          </p>
          <p
            className={`mb-4 text text_type_main-default text_color_inactive ${authFormStyle.paragraph}`}
          >
            {recovery}{' '}
            <Link
              className={authFormStyle.link}
              to={
                location.pathname === '/login' ? '/forgot-password' : '/login'
              }
            >
              {recoveryLink}
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};
