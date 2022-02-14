import { TLoadingAction } from 'services/actions/auth/helpers';
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
import { TWsFeedAction } from 'services/actions/wsFeed';

export type TItem = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
};

export type TFeedOrder = {
  createdAt: string;
  ingredients: TItem[] | string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TFeedOrders = {
  success: boolean;
  orders: TFeedOrder[];
  total: number;
  totalToday: number;
};
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

export type TRefreshToken = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
};

export type TWsActions = {
  wsInit: string;
  wsUserInit: string;
  wsUserOrder: string;
  wsSendMessage: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
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
  | TLoadingAction
  | TWsFeedAction;
