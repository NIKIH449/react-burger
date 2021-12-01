export const OPEN_MODAL_ORDER = 'OPEN_MODAL_ORDER';
export const CLOSE_MODAL_ORDER = 'CLOSE_MODAL_ORDER';
export const OPEN_MODAL_INGREDIENT = 'OPEN_MODAL_INGREDIENT';
export const CLOSE_MODAL_INGREDIENT = 'CLOSE_MODAL_INGREDIENT';

export function openOrderModal(dispatch) {
  dispatch({
    type: OPEN_MODAL_ORDER,
  });
}

export function openIngredientModal(dispatch) {
  dispatch({
    type: OPEN_MODAL_INGREDIENT,
  });
}

export function closeIngredientModal(dispatch) {
  dispatch({
    type: CLOSE_MODAL_INGREDIENT,
  });
}
export function closeOrderModal(dispatch) {
  dispatch({
    type: CLOSE_MODAL_ORDER,
  });
}
