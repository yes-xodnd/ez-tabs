import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WindowTypes } from 'src/constants/types';
import { RootState } from "..";

interface interfaceState {
  visibleWindows: WindowTypes[];
  isPopup: boolean;
  activeWindow: WindowTypes | null;
}

const isPopup = window.location.hash === '#popup';

const initialState: interfaceState = {
  visibleWindows: isPopup ? [ 'TABS' ] : [ 'BOOKMARKS', 'TABS' ],
  isPopup,
  activeWindow: isPopup ? 'TABS' : null
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
);

export const closeWindow = createAction(
  'CLOSE_WINDOW',
  prepareWindowType
);

export const openWindowAlone = createAction(
  'OPEN_WINDOW_ALONE',
  prepareWindowType
);

export const activateWindow = createAction(
  'ACTIVATE_WINDOW',
  prepareWindowType
);

export const selectIsVisibleWindow = (state: RootState, type: WindowTypes) => state.interfaces.visibleWindows.includes(type);

export const selectIsActiveWindow = (type: WindowTypes) => (state: RootState) => state.interfaces.activeWindow === type;

const slice = createSlice({
  name: 'interface',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        openWindow,
        (state, action) => { 
          state.visibleWindows.push(action.payload);
          state.activeWindow = action.payload;
        }
      )
      .addCase(
        closeWindow,
        (state, action) => { 
          state.visibleWindows = state.visibleWindows
            .filter(item => item !== action.payload);
          
          if (state.activeWindow === action.payload) {
            state.activeWindow = null;
          }
        }
      )
      .addCase(
        openWindowAlone,
        (state, action) => { 
          state.visibleWindows = [ action.payload ];
          state.activeWindow = action.payload;
        }
      )
      .addCase(
        activateWindow,
        (state, action) => { state.activeWindow = action.payload; }
      )
  }
});

export default slice.reducer;