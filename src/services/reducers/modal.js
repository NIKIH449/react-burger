import {
  CLOSE_MODAL_ORDER,
  OPEN_MODAL_ORDER,
  OPEN_MODAL_INGREDIENT,
  CLOSE_MODAL_INGREDIENT,
} from '../actions/modal';

const initialState = {
  isModalOpen: false,
  isIngredient: false,
  isOrder: false,
};
export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_ORDER: {
      return {
        ...state,
        isModalOpen: true,
        isIngredient: false,
        isOrder: true,
      };
    }
    case CLOSE_MODAL_ORDER: {
      return {
        ...state,
        isModalOpen: false,
        isIngredient: false,
        isOrder: false,
      };
    }
    case OPEN_MODAL_INGREDIENT: {
      return {
        ...state,
        isModalOpen: true,
        isIngredient: true,
        isOrder: false,
      };
    }
    case CLOSE_MODAL_INGREDIENT: {
      return {
        ...state,
        isModalOpen: false,
        isIngredient: false,
        isOrder: false,
      };
    }
    default: {
      return state;
    }
  }
};
