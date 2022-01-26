import {  TItem } from 'utils/types';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  TGetIngredients,
} from '../actions/ingredients';

type TIngredientsState = {
  ingredients: ReadonlyArray<TItem>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsSucces: boolean;
};
const initialState: TIngredientsState = {
  ingredients: [] ,
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsSucces: false,
};

export const indredientsReducer = (
  state = initialState,
  action: TGetIngredients
) : TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsSucces: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredientsSucces: true,
        ingredients: action.data,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
