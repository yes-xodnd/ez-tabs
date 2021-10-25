import { configureStore, combineReducers } from '@reduxjs/toolkit';
import bookmarksReducer from './modules/bookmarksSlice';
import logger from 'redux-logger';

const reducer = combineReducers({
  bookmarks: bookmarksReducer,
});

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