import { TFeedOrders } from 'utils/types';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_START_FOR_USER: 'WS_CONNECTION_START_FOR_USER' =
  'WS_CONNECTION_START_FOR_USER';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' =
  'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' =
  'WS_CONNECTION_CLOSED';
export const WS_GET_ORDER: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_ORDER: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_GET_USER_ORDER: 'WS_GET_USER_ORDER' = 'WS_GET_USER_ORDER';

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionStartForUserAction {
  readonly type: typeof WS_CONNECTION_START_FOR_USER;
}
export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsGetOrderAction {
  readonly type: typeof WS_GET_ORDER;
  readonly data: TFeedOrders;
}

export interface IWsGetUserOrderAction {
  readonly type: typeof WS_GET_USER_ORDER;
  readonly data: TFeedOrders;
}
export type TWsFeedAction =
  | IWsConnectionSuccessAction
  | IWsConnectionStartAction
  | IWsConnectionClosedAction
  | IWsConnectionErrorAction
  | IWsGetOrderAction
  | IWsConnectionStartForUserAction
  | IWsGetUserOrderAction;

export const wsConnectionStartForUser = (): TWsFeedAction => {
  return {
    type: WS_CONNECTION_START_FOR_USER,
  };
};
export const wsConnectionStart = (): TWsFeedAction => {
  return {
    type: WS_CONNECTION_START,
  };
};
export const wsConnectionSuccess = (): TWsFeedAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): TWsFeedAction => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = (): TWsFeedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetOrder = (data: TFeedOrders): TWsFeedAction => {
  return {
    type: WS_GET_ORDER,
    data,
  };
};

export const wsGetUserOrder = (data: TFeedOrders): TWsFeedAction => {
  return {
    type: WS_GET_USER_ORDER,
    data,
  };
};
