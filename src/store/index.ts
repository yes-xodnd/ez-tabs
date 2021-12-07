import { configureStore, combineReducers } from '@reduxjs/toolkit';
import bookmarks from './modules/bookmarksSlice';
import tabs from './modules/tabsSlice';
import interfaces from './modules/windowsSlice';
import nodeList from './modules/nodeListSlice';
import logger from 'redux-logger';
import api from 'src/api';

const reducer = combineReducers({ bookmarks, tabs, interfaces, nodeList });

const middleware = process.env.NODE_ENV !== 'production'
  ? [ logger ]
  : [];

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({ thunk: { extraArgument: { api } } })
    .concat(middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type ThunkApiConfig = { 
  state: RootState,
  dispatch: Dispatch,
  extra: { api: typeof api }
}

export default store;