export const OPEN_MODAL_ORDER: 'OPEN_MODAL_ORDER' = 'OPEN_MODAL_ORDER';
export const CLOSE_MODAL_ORDER: 'CLOSE_MODAL_ORDER' = 'CLOSE_MODAL_ORDER';
export const OPEN_MODAL_INGREDIENT: 'OPEN_MODAL_INGREDIENT' =
  'OPEN_MODAL_INGREDIENT';
export const CLOSE_MODAL_INGREDIENT: 'CLOSE_MODAL_INGREDIENT' =
  'CLOSE_MODAL_INGREDIENT';

export interface IOpenOrderModalAction {
  readonly type: typeof OPEN_MODAL_ORDER;
}
export interface IOpenIngredientModalAction {
  readonly type: typeof OPEN_MODAL_INGREDIENT;
}
export interface ICloseIngredientModalAction {
  readonly type: typeof CLOSE_MODAL_INGREDIENT;
}
export interface ICloseOrderModalAction {
  readonly type: typeof CLOSE_MODAL_ORDER;
}
export type TOpenModals =
  | IOpenOrderModalAction
  | IOpenIngredientModalAction
  | ICloseIngredientModalAction
  | ICloseOrderModalAction;

export const getOpenOrderModalAction = (): TOpenModals => ({
  type: OPEN_MODAL_ORDER,
});
export const getOpenIngredientModalAction = (): TOpenModals => ({
  type: OPEN_MODAL_INGREDIENT,
});
export const getCloseIngredientModalAction = (): TOpenModals => ({
  type: CLOSE_MODAL_INGREDIENT,
});
export const getCloseOrderModalAction = (): TOpenModals => ({
  type: CLOSE_MODAL_ORDER,
});
