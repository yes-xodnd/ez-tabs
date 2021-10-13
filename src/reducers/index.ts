import { combineReducers } from '@reduxjs/toolkit';
import bookmarks from './bookmarks';

const rootReducer = combineReducers({
  bookmarks
});

export default rootReducer;