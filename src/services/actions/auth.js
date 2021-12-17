import {
  signUp,
  signIn,
  signOut,
  updateUserInfo,
  recoveryPassword,
  resetPassword,
  refreshingToken,
  checkValidity,
} from 'utils/auth';
export const GET_REGISTER_REQUEST = 'GET_REGISTER_REQUEST';
export const GET_REGISTER_SUCCESS = 'GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAILED = 'GET_REGISTER_FAILED';
export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED = 'GET_LOGIN_FAILED';
export const GET_SIGNOUT_REQUEST = 'GET_SIGNOUT_REQUEST';
export const GET_SIGNOUT_SUCCESS = 'GET_SIGNOUT_SUCCESS';
export const GET_SIGNOUT_FAILED = 'GET_SIGNOUT_FAILED';
export const GET_EDITPROFILE_REQUEST = 'GET_EDITPROFILE_REQUEST';
export const GET_EDITPROFILE_SUCCESS = 'GET_EDITPROFILE_SUCCESS';
export const GET_EDITPROFILE_FAILED = 'GET_EDITPROFILE_FAILED';
export const GET_RECOVERY_PASSWORD_REQUEST = 'GET_RECOVERY_PASSWORD_REQUEST';
export const GET_RECOVERY_PASSWORD_SUCCESS = 'GET_RECOVERY_PASSWORD_SUCCESS';
export const GET_RECOVERY_PASSWORD_FAILED = 'GET_RECOVERY_PASSWORD_FAILED';
export const GET_RESET_PASSWORD_REQUEST = 'GET_RESET_PASSWORD_REQUEST';
export const GET_RESET_PASSWORD_SUCCESS = 'GET_RESET_PASSWORD_SUCCESS';
export const GET_RESET_PASSWORD_FAILED = 'GET_RESET_PASSWORD_FAILED';
export const GET_REFRESH_TOKEN_REQUEST = 'GET_REFRESH_TOKEN_REQUEST';
export const GET_REFRESH_TOKEN_SUCCESS = 'GET_REFRESH_TOKEN_SUCCESS';
export const GET_REFRESH_TOKEN_FAILED = 'GET_REFRESH_TOKEN_FAILED';
export const GET_CHECK_AUTH_REQUEST = 'GET_CHECK_AUTH_REQUEST';
export const GET_CHECK_AUTH_SUCCESS = 'GET_CHECK_AUTH_SUCCESS';
export const GET_CHECK_AUTH_FAILED = 'GET_CHECK_AUTH_FAILED';
export const GET_EDITPROFILE_RESET = 'GET_EDITPROFILE_RESET';
export const GET_LOGGED_IN = 'GET_LOGGED_IN';
export const LOADING_END = 'LOADING_END';
export const LOADING_START = 'LOADING_START';
export function onCheckAuth(accessToken, refreshToken) {
  return function (dispatch) {
    dispatch({
      type: LOADING_START,
    });
    dispatch({
      type: GET_CHECK_AUTH_REQUEST,
    });
    checkValidity(accessToken)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_LOGGED_IN,
          });
          dispatch({
            type: GET_CHECK_AUTH_SUCCESS,
            data: data,
          });
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
          dispatch({
            type: LOADING_END,
          });
        } else if (data && !data.success) {
          dispatch(onRefreshToken(refreshToken));
        } else {
          dispatch({ type: GET_CHECK_AUTH_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: GET_CHECK_AUTH_FAILED });
      });
  };
}

export function onRefreshToken(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: GET_REFRESH_TOKEN_REQUEST,
    });
    refreshingToken(refreshToken)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_REFRESH_TOKEN_SUCCESS,
            data: data,
          });
        } else {
          dispatch({ type: GET_REFRESH_TOKEN_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: GET_REFRESH_TOKEN_FAILED });
      });
  };
}

export function onEditUserInfo(email, name, password, token, refreshToken) {
  return function (dispatch) {
    dispatch({
      type: GET_EDITPROFILE_REQUEST,
    });
    updateUserInfo(email, name, password, token)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_EDITPROFILE_SUCCESS,
            data: data,
          });
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
        } else if (data && !data.success) {
          console.log(data);
          dispatch(onRefreshToken(refreshToken));
        } else {
          dispatch({ type: GET_EDITPROFILE_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: GET_EDITPROFILE_FAILED });
      });
  };
}

export function onRegister(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: GET_REGISTER_REQUEST,
    });
    signUp(email, password, name)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_REGISTER_SUCCESS,
            data: data,
          });
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem(
            'accessToken',
            data.accessToken.split('Bearer ')[1]
          );
          localStorage.setItem('refreshToken', data.refreshToken);
        } else {
          dispatch({ type: GET_REGISTER_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: GET_REGISTER_FAILED });
      });
  };
}

export function onLogin(email, password) {
  return function (dispatch) {
    dispatch({
      type: GET_LOGIN_REQUEST,
    });
    signIn(email, password)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_LOGIN_SUCCESS,
            data: data,
          });
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem(
            'accessToken',
            data.accessToken.split('Bearer ')[1]
          );
          localStorage.setItem('refreshToken', data.refreshToken);
        } else {
          dispatch({ type: GET_LOGIN_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: GET_LOGIN_FAILED });
      });
  };
}

export function onSignOut(token) {
  return function (dispatch) {
    dispatch({
      type: GET_SIGNOUT_REQUEST,
    });
    signOut(token)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_SIGNOUT_SUCCESS,
            data: data,
          });
        } else {
          dispatch({ type: GET_SIGNOUT_FAILED });
        }
        localStorage.removeItem('password');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
      })
      .catch(() => {
        dispatch({ type: GET_SIGNOUT_FAILED });
      });
  };
}

export function onRecoveryPassword(email) {
  return function (dispatch) {
    dispatch({
      type: GET_RECOVERY_PASSWORD_REQUEST,
    });
    recoveryPassword(email)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_RECOVERY_PASSWORD_SUCCESS,
            data: data,
          });
        } else {
          dispatch({ type: GET_RECOVERY_PASSWORD_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: GET_RECOVERY_PASSWORD_FAILED });
      });
  };
}

export function onResetPassword(password, token) {
  return function (dispatch) {
    dispatch({
      type: GET_RESET_PASSWORD_REQUEST,
    });
    resetPassword(password, token)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_RESET_PASSWORD_SUCCESS,
            data: data,
          });
        } else {
          dispatch({ type: GET_RESET_PASSWORD_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: GET_RESET_PASSWORD_FAILED });
      });
  };
}
