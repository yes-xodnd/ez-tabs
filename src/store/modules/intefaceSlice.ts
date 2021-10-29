import { createAction, createSlice } from "@reduxjs/toolkit";
import { WindowTypes } from 'src/constants/types';

interface interfaceState {
  activeWindows: WindowTypes[];
}

const initialState: interfaceState = {
  activeWindows: [ 'BOOKMARKS', 'TABS' ],
}

// actions
export const toggleActive = createAction(
  'TOGGLE_ACTIVE',
  (type: WindowTypes) => ({ payload: type })
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