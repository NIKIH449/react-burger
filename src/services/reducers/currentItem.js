import { SET_CURRENT_ITEM } from '../actions/currentItem';
import { CLOSE_MODAL_INGREDIENT } from 'services/actions/modal';
const initialState = {
  currentItem: [],
};

export const curretItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_MODAL_INGREDIENT: {
      return {
        ...state,
        currentItem: [],
      };
    }
    case SET_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
