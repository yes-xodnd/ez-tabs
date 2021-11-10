import { createAction, createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import api from "src/api";
import { RootState } from '../index';

interface TabsState {
  tabs: chrome.tabs.Tab[];
  checkedTabIds: number[];
  tabIndex: number;
}

const initialState: TabsState = {
  tabs: [],
  checkedTabIds: [],
  tabIndex: -1,
}

export const getTabs = createAsyncThunk(
  'TABS/GET_TABS',
  async () => {
    const tabs = await api.tabs.query({});
    return tabs.filter(tab => !tab.url?.match(/chrome:\/\/bookmarks/g));
  }
);

// actions
export const checkAll = createAction('CHECK_ALL');
export const clearCheck = createAction('CLEAR');
export const toggleCheck = createAction(
  'TABS/TOGGLE_CHECK',
  (id: number) => ({ payload: id })
);

export const closeCheckedTabs = createAsyncThunk<void, void, { state: RootState }>(
  'TABS/REMOVE_CHECKED',
  async (_, { getState, dispatch }) => {
    const { checkedTabIds, tabs } = getState().tabs;
    const idSet = new Set(tabs.map(tab => tab.id));
    api.tabs.remove(checkedTabIds.filter(id => idSet.has(id)));
    dispatch(clearCheck());
  }
);

export const closeTab = createAsyncThunk(
  'TABS/CLOSE_TAB',
  async (id: number) => {
    api.tabs.remove(id);
  }
);

export const closeFocusedTab = createAsyncThunk<void, void, { state: RootState }>(
  'TABS/CLOSE_FOCUSED_TABS',
  async (_, { dispatch, getState }) => {
    const targetId = selectFocusedId(getState());
    targetId && dispatch(closeTab(targetId));
  }
)

export const moveTabIndex = createAction(
  'TABS/MOVE_TAB_INDEX',
  (diff: -1 | 1) => ({ payload: diff })
);

export const setTabIndex = createAction(
  'TABS/SET_TAB_INDEX',
  (index: number) => ({ payload: index })
);

export const toggleCheckFocused = createAsyncThunk<void, void, { state: RootState }>(
  'TABS/TOGGLE_CHECK_FOCUSED',
  (_, { dispatch, getState }) => {
    const id = selectFocusedId(getState());
    id && dispatch(toggleCheck(id));
  }
);

// selectors
export const selectAllChecked = ({ tabs }: RootState) => {
  return tabs.tabs.length === tabs.checkedTabIds.length;
};

export const selectFocusedId = createSelector(
   (state: RootState) => state.tabs,
   ({ tabs, tabIndex }) => tabs[tabIndex]?.id
);

const slice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        getTabs.fulfilled,
        (state, action) => { 
          state.tabs = action.payload; 
          state.tabIndex = -1;
        }
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
        clearCheck,
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
      .addCase(
        closeCheckedTabs.fulfilled,
        (state) => {
          state.checkedTabIds = [];
        }
      )
      .addCase(
        moveTabIndex,
        (state, action) => {
          const nextIndex = state.tabIndex + action.payload;
          if (nextIndex >= state.tabs.length || nextIndex < 0) return;
          else state.tabIndex = nextIndex;
        }
      )
      .addCase(
        setTabIndex,
        (state, action) => { state.tabIndex = action.payload; }
      )
  }
});

export const selectCheckedTabs = (state: RootState) => {
  const { tabs, checkedTabIds } = state.tabs;
  return tabs.filter(tab => tab.id && checkedTabIds.includes(tab.id));
};

export default slice.reducer;