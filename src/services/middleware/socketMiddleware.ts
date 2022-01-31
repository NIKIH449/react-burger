import { MiddlewareAPI } from '@reduxjs/toolkit';
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetOrder,
  wsGetUserOrder,
} from 'services/actions/wsFeed';
import { TApplicationActions, TWsActions } from 'utils/types';

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | undefined;
    return (
        next: (arg0: { type: string; data: TApplicationActions }) => void
      ) =>
      (action: { type: string; data: TApplicationActions }) => {
        const { dispatch } = store;
        const { type } = action;
        const { wsInit, wsSendMessage, wsUserInit } = wsActions;
        const accessToken = localStorage.getItem('accessToken');
        if (type === wsUserInit || type === wsInit) {
          socket = new WebSocket(
            `${wsUrl}${type === wsInit ? '/all' : `?token=${accessToken}`}`
          );
        }
        if (socket) {
          socket.onopen = () => {
            dispatch(wsConnectionSuccess());
            if (type === wsSendMessage) {
              const { data } = action;
              socket?.send(JSON.stringify(data));
            }
          };
          socket.onerror = () => {
            dispatch(wsConnectionError());
          };

          socket.onmessage = (event: { data: string }) => {
            const regex = /all/g;
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            if (socket?.url.match(regex) !== null) {
              dispatch(wsGetOrder(restParsedData));
            } else {
              dispatch(wsGetUserOrder(restParsedData));
            }
          };
          socket.onclose = () => {
            dispatch(wsConnectionClosed());
          };
        }
        next(action);
      };
  };
};
