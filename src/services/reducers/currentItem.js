import { SET_CURRENT_ITEM } from '../actions/currentItem';

const initialState = {
  currentItem: [],
};

export const curretItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: action.currentItem,
      };
    }
    default: {
      return state;
    }
  }
};
