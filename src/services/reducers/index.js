import { combineReducers } from 'redux';
import { indredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { curretItemReducer } from './currentItem';
import { modalReducer } from './modal';
import { constructorReducer } from './constructor';

export const rootReducer = combineReducers({
  constructorValue: constructorReducer,
  ingredients: indredientsReducer,
  order: orderReducer,
  currentItem: curretItemReducer,
  modal: modalReducer,
});
