import { signUp } from 'utils/auth';

export const GET_REGISTER_REQUEST = 'GET_REGISTER_REQUEST';
export const GET_REGISTER_SUCCESS = 'GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAILED = 'GET_REGISTER_FAILED';

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
