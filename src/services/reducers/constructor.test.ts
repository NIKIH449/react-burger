import { authReducer } from './auth';
import * as constructorTypes from '../actions/constructor';
import { constructorReducer } from './constructor';
const initialState = {
  constructor: { bun: [], other: [] },
  constructorRequest: false,
  constructorFailed: false,
};

describe('Сonstructor reducer', () => {
  it('should return the initinal state', () => {
    expect(constructorReducer(initialState, {} as any)).toEqual(initialState);
  });
  it('handler delete ingredient should run', () => {
    expect(
      constructorReducer(initialState, {
        type: constructorTypes.DELETE_INGREDIENT,
        item: '123',
      })
    ).toEqual(
      expect.objectContaining({
        constructor: { bun: [], other: [] },
        constructorFailed: false,
        constructorRequest: false,
      })
    );
  });
  it('handler delete all ingredient should run', () => {
    expect(
      constructorReducer(initialState, {
        type: constructorTypes.DELETE_ALL_INGREDIENTS,
      })
    ).toEqual(
      expect.objectContaining({
        constructor: { bun: [], other: [] },
      })
    );
  });
});
