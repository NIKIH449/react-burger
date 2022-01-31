import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from 'services/middleware/socketMiddleware';
import { rootReducer } from 'services/reducers';
import { WS_URL } from 'utils/constants';
import {
  WS_SEND_ORDER,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_GET_ORDER,
  WS_CONNECTION_START_FOR_USER,
  WS_GET_USER_ORDER,
} from '../actions/wsFeed';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsUserInit: WS_CONNECTION_START_FOR_USER,
  wsUserOrder: WS_GET_USER_ORDER,
  wsSendMessage: WS_SEND_ORDER,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDER,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(WS_URL, wsActions))
);
const store = createStore(rootReducer, enhancer);

export { store };
