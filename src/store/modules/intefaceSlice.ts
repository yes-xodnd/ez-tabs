import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WindowTypes } from 'src/constants/types';
import { RootState } from "..";

interface interfaceState {
  activeWindows: WindowTypes[];
}

const initialState: interfaceState = {
  activeWindows: [ 'BOOKMARKS', 'TABS' ],
}

const prepareWindowType = (type: WindowTypes) => ({ payload: type });


// actions
export const toggleActive = createAsyncThunk<void, WindowTypes, { state: RootState }>(
  'TOGGLE_ACTIVE',
  (type: WindowTypes, { getState, dispatch }) => {
    const isActive = selectIsActiveWindow(getState(), type);

    isActive
    ? dispatch(deactivateWindow(type))
    : dispatch(activateWindow(type));
  }
);

export const activateWindow = createAction(
  'ACTIVATE_WINDOW',
  prepareWindowType
)

export const deactivateWindow = createAction(
  'DEACTIVATE_WINDOW',
  prepareWindowType
)

export const activateWindowAlone = createAction(
  'ACTIVATE_WINDOW_ALONE',
  prepareWindowType
);

const selectIsActiveWindow = (state: RootState, type: WindowTypes) => state.interfaces.activeWindows.includes(type);

const slice = createSlice({
  name: 'interface',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        activateWindow,
        (state, action) => { state.activeWindows.push(action.payload); }
      )
      .addCase(
        deactivateWindow,
        (state, action) => { 
          state.activeWindows = state.activeWindows
            .filter(item => item !== action.payload);
        }
      )
      .addCase(
        activateWindowAlone,
        (state, action) => { state.activeWindows = [ action.payload ]; }
      )
  }
});

export default slice.reducer;