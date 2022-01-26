import { store } from 'services/store/store';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TGetOrder } from 'services/actions/order';
import { TOpenModals } from 'services/actions/modal';
import { TGetIngredients } from 'services/actions/ingredients';
import { TGetSignoutAction } from 'services/actions/auth/signout';
import { TGetResetPasswordAction } from 'services/actions/auth/reset-password';
import { TGetRegisterAction } from 'services/actions/auth/register';
import { TGetRefreshTokenAction } from 'services/actions/auth/refresh-token';
import { TRecoveryPasswordAction } from 'services/actions/auth/recovery-password';
import { TLoginAction } from 'services/actions/auth/login';
import { TGetEditProfile } from 'services/actions/auth/edit-profile';
import { TGetCheckAuthAction } from 'services/actions/auth/check-auth';
import { TConsctructorAction } from 'services/actions/constructor';
import { TLoadingAction } from 'services/actions/auth';
import { TApplicationActions } from './types';


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
