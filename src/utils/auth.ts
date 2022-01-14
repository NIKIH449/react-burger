import { BURGER_URL } from './constants';
import { checkResponse } from 'utils/utils';

export const signUp = (email: string, password: string, name: string) => {
  return fetch(BURGER_URL + 'auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email, name }),
  }).then(checkResponse);
};

export const signIn = (email: string, password: string) => {
  return fetch(BURGER_URL + 'auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

export const checkValidity = (token: string) => {
  return fetch(BURGER_URL + 'auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const refreshingToken = (token: string) => {
  return fetch(BURGER_URL + 'auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  }).then(checkResponse);
};

export const updateUserInfo = (
  email: string,
  name: string,
  password: string,
  token: string
) => {
  return fetch(BURGER_URL + 'auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, name, password, token }),
  }).then((res) => res.json());
};

export const signOut = (token: string) => {
  return fetch(BURGER_URL + 'auth/logout ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  }).then(checkResponse);
};

export const recoveryPassword = (email: string) => {
  return fetch(BURGER_URL + 'password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  }).then(checkResponse);
};

export const resetPassword = (password: string, token: string) => {
  return fetch(BURGER_URL + 'password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, token }),
  }).then(checkResponse);
};
