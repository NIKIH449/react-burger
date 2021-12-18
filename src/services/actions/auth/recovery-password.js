import { recoveryPassword } from 'utils/auth';
export const GET_RECOVERY_PASSWORD_REQUEST = 'GET_RECOVERY_PASSWORD_REQUEST';
export const GET_RECOVERY_PASSWORD_SUCCESS = 'GET_RECOVERY_PASSWORD_SUCCESS';
export const GET_RECOVERY_PASSWORD_FAILED = 'GET_RECOVERY_PASSWORD_FAILED';
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
