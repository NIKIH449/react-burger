import * as modalTypes from '../actions/modal';
import { modalReducer } from './modal';

const initialState = {
  isModalOpen: false,
  isIngredient: false,
  isOrder: false,
};

describe('Auth reducer', () => {
  it('should return the initinal state', () => {
    expect(modalReducer(initialState, {} as any)).toEqual(initialState);
  });
  it('handler loading should run', () => {
    expect(
      modalReducer(initialState, { type: modalTypes.OPEN_MODAL_ORDER })
    ).toEqual(
      expect.objectContaining({
        isModalOpen: true,
        isIngredient: false,
        isOrder: true,
      })
    );
  });
  it('handler loading should run', () => {
    expect(
      modalReducer(initialState, { type: modalTypes.CLOSE_MODAL_ORDER })
    ).toEqual(
      expect.objectContaining({
        isModalOpen: false,
        isIngredient: false,
        isOrder: false,
      })
    );
  });
  it('handler loading should run', () => {
    expect(
      modalReducer(initialState, { type: modalTypes.OPEN_MODAL_INGREDIENT })
    ).toEqual(
      expect.objectContaining({
        isModalOpen: true,
        isIngredient: true,
        isOrder: false,
      })
    );
  });
  it('handler loading should run', () => {
    expect(
      modalReducer(initialState, { type: modalTypes.CLOSE_MODAL_INGREDIENT })
    ).toEqual(
      expect.objectContaining({
        isModalOpen: false,
        isIngredient: false,
        isOrder: false,
      })
    );
  });
});
