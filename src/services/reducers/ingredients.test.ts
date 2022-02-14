import { authReducer } from './auth';
import * as indexTypes from '../actions/auth/helpers';
import { indredientsReducer } from './ingredients';
const initialState: any = {
  email: '',
  name: '',
  accessToken: '',
  refreshToken: '',
  authLoading: false,
  registerRequest: false,
  registerFailed: false,
  registerSuccess: false,

  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,

  signOutRequest: false,
  signOutFailed: false,
  signOutSuccess: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: false,

  recoveryPasswordRequest: false,
  recoveryPasswordFailed: false,
  recoveryPasswordSuccess: false,

  editProfileRequest: false,
  editProfileFailed: false,
  editProfileSuccess: false,

  refreshTokenRequest: false,
  refreshTokenFailed: false,
  refreshTokenSuccess: false,

  chekAuthRequest: false,
  chekAuthFailed: false,
  chekAuthSuccess: false,
  loading: false,
  loggedIn: false,
};

describe('Ingredients reducer', () => {
  it('should return the initinal state', () => {
    expect(indredientsReducer(initialState, {} as any)).toEqual(initialState);
  });
});
