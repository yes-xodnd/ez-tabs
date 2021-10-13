import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'src/reducers';

// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(logger);
// }

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;