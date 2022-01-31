import {
  CLOSE_MODAL_ORDER,
  OPEN_MODAL_ORDER,
  OPEN_MODAL_INGREDIENT,
  CLOSE_MODAL_INGREDIENT,
  TOpenModals,
} from '../actions/modal';

type TModalState = {
  isModalOpen: boolean;
  isIngredient: boolean;
  isOrder: boolean;
};

const initialState: TModalState = {
  isModalOpen: false,
  isIngredient: false,
  isOrder: false,
};
export const modalReducer = (state = initialState, action: TOpenModals) => {
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
