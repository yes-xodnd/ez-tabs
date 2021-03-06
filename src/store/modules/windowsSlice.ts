import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WindowTypes } from 'src/constants/types';
import { RootState, ThunkApiConfig } from "..";

interface interfaceState {
  visibleWindow: WindowTypes;
}

const initialState: interfaceState = {
  visibleWindow: 'TABS',
};

export const openWindow = createAction(
  'WINODWS/OPEN_WINDOW',
  (type) => ({ payload: type })
);

export const toggleWindow = createAsyncThunk<void, void, ThunkApiConfig>(
  'WINDOWS/TOGGLE_WINDOW',
  (_, { getState, dispatch }) => {
    const next: WindowTypes = getState().interfaces.visibleWindow === 'TABS'
    ? 'BOOKMARKS'
    : 'TABS';
    dispatch(openWindow(next));
  }
);

export const selectIsVisibleWindow = (type: WindowTypes) => (state: RootState) => state.interfaces.visibleWindow === type;

const slice = createSlice({
  name: 'interface',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        openWindow,
        (state, action) => { 
          state.visibleWindow = action.payload;
        }
      )
  }
});

export default slice.reducer;