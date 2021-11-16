import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WindowTypes } from 'src/constants/types';
import { RootState } from "..";
import { uncheckAll as uncheckBookmarks } from "./bookmarksSlice";
import { uncheckAll as uncheckTabs } from "./tabsSlice";

interface interfaceState {
  visibleWindow: WindowTypes;
}

const initialState: interfaceState = {
  visibleWindow: 'TABS',
};

export const openWindow = createAsyncThunk<WindowTypes, WindowTypes, {}>(
  'WINODWS/OPEN_WINDOW',
  (type, { dispatch }) => {
    dispatch(uncheckBookmarks());
    dispatch(uncheckTabs());
    return type;
  }
);

export const toggleWindow = createAsyncThunk<void, void, { state: RootState }>(
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
        openWindow.fulfilled,
        (state, action) => { 
          state.visibleWindow = action.payload;
        }
      )
  }
});

export default slice.reducer;