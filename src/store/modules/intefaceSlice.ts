import { createAction, createSlice } from "@reduxjs/toolkit";
import { WindowTypes } from 'src/constants/types';

interface interfaceState {
  activeWindows: WindowTypes[];
}

const initialState: interfaceState = {
  activeWindows: [ 'BOOKMARKS', 'TABS' ],
}

const prepareWindowType = (type: WindowTypes) => ({ payload: type });

// actions
export const toggleActive = createAction(
  'TOGGLE_ACTIVE',
  prepareWindowType
);

export const deactivateWindow = createAction(
  'DEACTIVATE_WINDOW',
  prepareWindowType
)

export const activateWindowAlone = createAction(
  'ACTIVATE_WINDOW_ALONE',
  prepareWindowType
);

const slice = createSlice({
  name: 'interface',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        toggleActive,
        (state, action) => {
          const type = action.payload;

          state.activeWindows = (state.activeWindows.includes(type))
            ? state.activeWindows.filter(item => item !== type)
            : [ ...state.activeWindows, type ];
        }
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