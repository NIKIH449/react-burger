import React from 'react';
import authFormStyle from './auth-form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

export function AuthForm(props) {
  const location = useLocation();
  return (
    <section className={authFormStyle.auth}>
      <form onSubmit={props.onSubmit} className={authFormStyle.form}>
        <div className={authFormStyle.container}>
          <p className={`text text_type_main-medium ${authFormStyle.title}`}>
            {props.title}
          </p>
          <div className={`mb-6 ${authFormStyle.inputContainer}`}>
            {props.children}
          </div>
          <div className={authFormStyle.button}>
            <Button type="primary" size="medium">
              {props.button}
            </Button>
          </div>
        </div>
        <div>
          <p
            className={`mb-4 text text_type_main-default text_color_inactive ${authFormStyle.paragraph}`}
          >
            {props.question}{' '}
            <Link
              className={authFormStyle.link}
              to={location.pathname === '/login' ? '/register' : '/login'}
            >
              {props.questionLink}
            </Link>
          </p>
          <p
            className={`mb-4 text text_type_main-default text_color_inactive ${authFormStyle.paragraph}`}
          >
            {props.recovery}{' '}
            <Link
              className={authFormStyle.link}
              to={
                location.pathname === '/login' ? '/forgot-password' : '/login'
              }
            >
              {props.recoveryLink}
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
