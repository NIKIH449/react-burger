import { combineReducers } from 'redux';
import { indredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { modalReducer } from './modal';
import { constructorReducer } from './constructor';
import { authReducer } from './auth';
import { wsFeedReducer } from './wsFeed';
export const rootReducer = combineReducers({
  auth: authReducer,
  constructorValue: constructorReducer,
  ingredients: indredientsReducer,
  order: orderReducer,
  modal: modalReducer,
  wsFeed: wsFeedReducer,
});
