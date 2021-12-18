import { onCheckAuth } from './check_auth';
import { onEditUserInfo } from './edit_profile';
import { onLogin } from './login';
import { onRecoveryPassword } from './recovery_password';
import { onRefreshToken } from './refresh_token';
import { onRegister } from './register';
import { onResetPassword } from './reset_password';
import { onSignOut } from './signout';

export const GET_LOGGED_IN = 'GET_LOGGED_IN';
export const LOADING_END = 'LOADING_END';
export const LOADING_START = 'LOADING_START';

export {
  onCheckAuth,
  onEditUserInfo,
  onLogin,
  onRecoveryPassword,
  onRefreshToken,
  onRegister,
  onResetPassword,
  onSignOut,
};
