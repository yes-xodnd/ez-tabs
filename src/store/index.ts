import { configureStore, combineReducers } from '@reduxjs/toolkit';
import bookmarks from './modules/bookmarksSlice';
import tabs from './modules/tabsSlice';
import interfaces from './modules/intefaceSlice';
import logger from 'redux-logger';

const reducer = combineReducers({ bookmarks, tabs, interfaces });

const middlewares = (process.env.NODE_ENV !== 'production') 
? [ logger ]
: [];

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => [ ...getDefaultMiddleware(), ...middlewares ],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;