import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WindowTypes } from 'src/constants/types';
import { RootState } from "..";

interface interfaceState {
  visibleWindows: WindowTypes[];
  isPopup: boolean;
}

const isPopup = window.location.hash === '#popup';

const initialState: interfaceState = {
  visibleWindows: isPopup ? [ 'TABS' ] : [ 'BOOKMARKS', 'TABS' ],
  isPopup,
};

const prepareWindowType = (type: WindowTypes) => ({ payload: type });

// actions
export const toggleActive = createAsyncThunk<void, WindowTypes, { state: RootState }>(
  'TOGGLE_ACTIVE',
  (type: WindowTypes, { getState, dispatch }) => {
    const isActive = selectIsVisibleWindow(getState(), type);

    isActive
    ? dispatch(closeWindow(type))
    : dispatch(openWindow(type));
  }
);

export const openWindow = createAction(
  'OPEN_WINDOW',
  prepareWindowType
)

export const closeWindow = createAction(
  'CLOSE_WINDOW',
  prepareWindowType
)

export const activateWindowAlone = createAction(
  'OPEN_WINDOW_ALONE',
  prepareWindowType
);

const selectIsVisibleWindow = (state: RootState, type: WindowTypes) => state.interfaces.visibleWindows.includes(type);

const slice = createSlice({
  name: 'interface',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        openWindow,
        (state, action) => { state.visibleWindows.push(action.payload); }
      )
      .addCase(
        closeWindow,
        (state, action) => { 
          state.visibleWindows = state.visibleWindows
            .filter(item => item !== action.payload);
        }
      )
      .addCase(
        activateWindowAlone,
        (state, action) => { state.visibleWindows = [ action.payload ]; }
      )
  }
});

export default slice.reducer;