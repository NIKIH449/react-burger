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
  ingredientsLoading: boolean;
};
const initialState: TIngredientsState = {
  ingredients: [] ,
  ingredientsLoading:false,
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
        ingredientsLoading:true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredientsSucces: true,
        ingredientsLoading:false,
        ingredients: action.data,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsLoading:false,
        ingredientsFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
