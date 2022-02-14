import * as orderTypes from '../actions/order';
import { orderReducer } from './order';

const initialState: any = {
  order: {},
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,
};

describe('Order reducer', () => {
  it('should return the initinal state', () => {
    expect(orderReducer(initialState, {} as any)).toEqual(initialState);
  });
  it('handler orderRequest should run', () => {
    expect(
      // @ts-ignore
      orderReducer(initialState, { type: orderTypes.GET_ORDER_REQUEST })
    ).toEqual(
      expect.objectContaining({
        orderRequest: true,
      })
    );
  });
  it('handler orderSuccess should run', () => {
    expect(
      orderReducer(initialState, {
        type: orderTypes.GET_ORDER_SUCCESS,
        // @ts-ignore
        data: {},
      })
    ).toEqual(
      expect.objectContaining({
        orderRequest: false,
        orderFailed: false,
        orderSuccess: true,
        order: {},
      })
    );
  });
  it('handler orderFailed should run', () => {
    expect(
      // @ts-ignore
      orderReducer(initialState, { type: orderTypes.GET_ORDER_FAILED })
    ).toEqual(
      expect.objectContaining({
        orderRequest: false,
        orderFailed: true,
      })
    );
  });
});
