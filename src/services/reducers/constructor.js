import {
  GET_CONSTRUCTOR_FAILED,
  GET_CONSTRUCTOR_REQUEST,
  GET_CONSTRUCTOR_SUCCESS,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from '../actions/constructor';

const initialState = {
  constructor: { bun: [], other: [] },
  constructorRequest: false,
  constructorFailed: false,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_INGREDIENT: {
      return {
        ...state,
        constructor: {
          bun: [...state.constructor.bun],
          other: action.item,
        },
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        constructor: {
          bun: [...state.constructor.bun],
          other: [...state.constructor.other].filter(
            (item, index) => String(item._id) + index !== action.item
          ),
        },
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructor:
          action.currentItem.type === 'bun'
            ? { bun: [action.currentItem], other: [...state.constructor.other] }
            : {
                bun: [...state.constructor.bun],
                other: [...state.constructor.other, action.currentItem],
              },
      };
    }
    case GET_CONSTRUCTOR_REQUEST: {
      return {
        ...state,
        constructorRequest: true,
      };
    }
    case GET_CONSTRUCTOR_SUCCESS: {
      return {
        ...state,
        constructorRequest: false,
        constructorFailed: false,
        constructor: {
          bun: action.data.filter(
            (meat) => meat.name === 'Краторная булка N-200i'
          ),
          other: [],
        },
      };
    }
    case GET_CONSTRUCTOR_FAILED: {
      return {
        ...state,
        constructorRequest: false,
        constructorFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
