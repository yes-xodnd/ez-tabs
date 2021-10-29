import { createAction, createSlice } from "@reduxjs/toolkit";
import { windowTypes } from 'src/constants/types';

interface interfaceState {
  activeWindows: windowTypes[];
}

const initialState: interfaceState = {
  activeWindows: [ 'BOOKMARKS', 'TABS' ],
}

// actions
export const toggleActive = createAction(
  'TOGGLE_ACTIVE',
  (type: windowTypes) => ({ payload: type })
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
  }
});

export default slice.reducer;