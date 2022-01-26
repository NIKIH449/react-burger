import {  TConstructor, TItem } from 'utils/types';
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  TConsctructorAction,
} from '../actions/constructor';
type TConstructorState = {
  constructor: TConstructor
  constructorRequest: boolean;
  constructorFailed: boolean;
};
const initialState: TConstructorState = {
  constructor: { bun: [], other: [] },
  constructorRequest: false,
  constructorFailed: false,
};

export const constructorReducer = (
  state = initialState,
  action: TConsctructorAction
) : TConstructorState => {
  switch (action.type) {
    case MOVE_INGREDIENT: {
      return {
        ...state,
        constructor: {
          bun: [...state.constructor.bun],
          other: action.newConstructor,
        },
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        constructor: {
          bun: [...state.constructor.bun],
          other: [...state.constructor.other].filter(
            (ingredient: TItem, index: number) =>
              ingredient._id + index !== action.item
          ),
        },
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructor:
          action.newItem.type === 'bun'
            ? { bun: [action.newItem], other: [...state.constructor.other] }
            : {
                bun: [...state.constructor.bun],
                other: [...state.constructor.other, action.newItem],
              },
      };
    }
    default: {
      return state;
    }
  }
};
