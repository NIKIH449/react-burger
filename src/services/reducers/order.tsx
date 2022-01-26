import { TOrder } from 'utils/types';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  TGetOrder,
} from '../actions/order';

type TOrderState = {
  order: TOrder;
  orderRequest: boolean;
  orderFailed: boolean;
};
const initialState: TOrderState = {
  order: {} as TOrder,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TGetOrder) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.data,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
