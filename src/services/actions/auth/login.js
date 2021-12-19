import { signIn } from 'utils/auth';
export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED = 'GET_LOGIN_FAILED';
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
