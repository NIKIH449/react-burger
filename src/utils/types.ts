import { TLoadingAction } from 'services/actions/auth';
import { TGetCheckAuthAction } from 'services/actions/auth/check-auth';
import { TGetEditProfile } from 'services/actions/auth/edit-profile';
import { TLoginAction } from 'services/actions/auth/login';
import { TRecoveryPasswordAction } from 'services/actions/auth/recovery-password';
import { TGetRefreshTokenAction } from 'services/actions/auth/refresh-token';
import { TGetRegisterAction } from 'services/actions/auth/register';
import { TGetResetPasswordAction } from 'services/actions/auth/reset-password';
import { TGetSignoutAction } from 'services/actions/auth/signout';
import { TConsctructorAction } from 'services/actions/constructor';
import { TGetIngredients } from 'services/actions/ingredients';
import { TOpenModals } from 'services/actions/modal';
import { TGetOrder } from 'services/actions/order';

export type TItem = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
}
export type TOrder = {
  name: string;
  order: { number: number };
  success: boolean;
};

export type TConstructor = { bun: TItem[]; other: TItem[] };

export type TUser = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: {
    name: string;
    email: string;
  };
};

export type TLogin = TUser;

export type TRecoveryPassword = {
  success: boolean;
  user: Pick<TUser, 'success'>;
};

export type TRegister = TUser;

export type TDefaultResponse = {
  message: string;
  success: boolean;
};

export type TAction = {
  type: string;
};

export type TRefreshToken = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
};

export type TApplicationActions =
  | TGetEditProfile
  | TGetOrder
  | TOpenModals
  | TGetIngredients
  | TConsctructorAction
  | TGetSignoutAction
  | TGetResetPasswordAction
  | TGetRegisterAction
  | TGetRefreshTokenAction
  | TRecoveryPasswordAction
  | TLoginAction
  | TGetCheckAuthAction
  | TLoadingAction;
