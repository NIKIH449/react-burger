import {  TItem } from 'utils/types';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const DELETE_ALL_INGREDIENTS: 'DELETE_ALL_INGREDIENTS' =
  'DELETE_ALL_INGREDIENTS';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';

export interface IAddIngredients {
  readonly type: typeof ADD_INGREDIENT;
  readonly newItem: TItem;
}
export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly item: string;
}
export interface IDeleteAllIngredients {
  readonly type: typeof DELETE_ALL_INGREDIENTS;
}
export interface IMoveIngredients {
  readonly type: typeof MOVE_INGREDIENT;
  readonly newConstructor: TItem[];
}

export type TConsctructorAction =
  | IAddIngredients
  | IDeleteIngredient
  | IDeleteAllIngredients
  | IMoveIngredients;

export const getAddIngredientsAction = (
  newItem: TItem
): TConsctructorAction => ({
  type: ADD_INGREDIENT,
  newItem,
});

export const getMoveIngredientsAction = (newConstructor: TItem[]): TConsctructorAction => ({
  type: MOVE_INGREDIENT,
  newConstructor
});

export const getDeleteIngredientAction = (
  item: string
): TConsctructorAction => ({
  type: DELETE_INGREDIENT,
  item,
});

export const getDeleteAllIngredientsAction = (): TConsctructorAction => ({
  type: DELETE_ALL_INGREDIENTS,
});
