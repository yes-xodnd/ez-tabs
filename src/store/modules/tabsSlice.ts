import { createAction, createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import api from "src/api";
import { RootState } from '../index';


interface TabsState {
  tabs: chrome.tabs.Tab[];
  checkedTabIds: number[];
}

const initialState: TabsState = {
  tabs: [],
  checkedTabIds: [],
}

export const getTabs = createAsyncThunk(
  'GET_TABS',
  async () => {
    const tabs = await api.tabs.query({});
    return tabs.filter(tab => !tab.url?.match(/chrome:\/\/bookmarks/g));
  }
);

export const checkAll = createAction('CHECK_ALL');
export const clear = createAction('CLEAR');
export const toggleCheck = createAction(
  'TOGGLE_CHECK',
  (id: number) => ({ payload: id })
);

const slice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        getTabs.fulfilled,
        (state, action) => { state.tabs = action.payload; }
      )
      .addCase(
        checkAll,
        (state) => {
          state.checkedTabIds = state.tabs
            .filter(tab => tab.id)
            .map(tab => tab.id) as number[]
        }
      )
      .addCase(
        clear,
        (state) => { state.checkedTabIds = [] }
      )
      .addCase(
        toggleCheck,
        (state, action) => { 
          const id = action.payload;
          if (!state.checkedTabIds.includes(id)) state.checkedTabIds.push(id);
          else state.checkedTabIds = state.checkedTabIds.filter(item => item !== id);
        }
      )
  }
});

export const selectCheckedTabs = (state: RootState) => {
  const { tabs, checkedTabIds } = state.tabs;
  return tabs.filter(tab => tab.id && checkedTabIds.includes(tab.id));
};

export default slice.reducer;