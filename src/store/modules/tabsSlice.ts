import { createAction, createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { Tab } from "src/constants/types";
import { RootState, ThunkApiConfig } from '..';

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

const setTabs = createAction(
  'TABS/SET_TABS',
  (tabs: Tab[]) => ({ payload: tabs })
);

export const getTabs = createAsyncThunk<void, void, ThunkApiConfig>(
  'TABS/GET_TABS',
  async (_, { dispatch, extra }) => {
    const tabs = await extra.api.tabs.query({});
    dispatch(setTabs(tabs));
  }
);

// actions
export const checkAll = createAction('CHECK_ALL');
export const uncheckAll = createAction('CLEAR');
export const toggleCheck = createAction(
  'TABS/TOGGLE_CHECK',
  (id: number) => ({ payload: id })
);

export const toggleCheckAll = createAsyncThunk<void, void, ThunkApiConfig>(
  'TABS/TOGGLE_CHECK_ALL',
  (_, { dispatch, getState }) => {
    const { tabs, checkedTabIds } = getState().tabs;
    if (tabs.length === checkedTabIds.length) dispatch(uncheckAll());
    else dispatch(checkAll());
  }
);

export const closeCheckedTabs = createAsyncThunk<void, void, ThunkApiConfig>(
  'TABS/REMOVE_CHECKED',
  async (_, { getState, extra }) => {
    const tabIds = getState().tabs.checkedTabIds.slice();
    extra.api.tabs.remove(tabIds);
  }
);

export const closeTab = createAsyncThunk<number, number, ThunkApiConfig>(
  'TABS/CLOSE_TAB',
  async (id, { extra }) => {
    extra.api.tabs.remove(id);
    return id;
  }
);

export const closeFocusTab = createAsyncThunk<void, void, ThunkApiConfig>(
  'TABS/CLOSE_TAB_HOTKEY',
  async (_, { dispatch, getState }) => {
    const targetId = selectFocusedId(getState());
    targetId && dispatch(closeTab(targetId));
  }
);

export const moveFocusIndex = createAction(
  'TABS/MOVE_FOCUS_INDEX',
  (diff: -1 | 1) => ({ payload: diff })
);

export const setFocusIndex = createAction(
  'TABS/SET_FOCUS_INDEX',
  (index: number) => ({ payload: index })
);

export const setFocusIndexEnd = createAction(
  'TABS/setFocusIndexEnd',
  (target: 'START' | 'END') => ({ payload: target })
);

export const toggleCheckFocused = createAsyncThunk<void, void, ThunkApiConfig>(
  'TABS/TOGGLE_CHECK_FOCUSED',
  (_, { dispatch, getState }) => {
    const id = selectFocusedId(getState());
    id && dispatch(toggleCheck(id));
  }
);

export const activateFocusedTab = createAsyncThunk<void, void, ThunkApiConfig>(
  'TABS/ACTIVATE_FOCUSED_TAB',
  (_, { getState, extra }) => {
    const id = selectFocusedId(getState());
    id && extra.api.tabs.update(id, { active: true });
  }
);

const isMatch = (query: string) => (tab: Tab) => {
  const regexp = new RegExp(query, 'i');
  return (tab.url && regexp.test(tab.url.toLowerCase()))
  || (tab.title && regexp.test(tab.title.toLowerCase()));
};

export const search = createAsyncThunk<void, string, ThunkApiConfig>(
  'TABS/SEARCH',
  (query, { getState, dispatch }) => {
    const { tabs } = getState().tabs;
    const filtered = tabs.filter(isMatch(query));
    if (tabs.length !== filtered.length) dispatch(setTabs(filtered));
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

export const selecFocusedNode = ({ tabs }: RootState) => tabs.tabs[tabs.tabIndex];

const slice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        setTabs,
        (state, action) => {
          state.tabs = action.payload;
          if (state.tabIndex >= state.tabs.length) {
            state.tabIndex = state.tabs.length - 1;
          }
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
        uncheckAll,
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
        closeTab.fulfilled,
        (state, action) => {
          const targetId = action.payload;
          if (state.checkedTabIds.includes(targetId)) {
            state.checkedTabIds = state.checkedTabIds.filter(id => id !== targetId);
          }
        }
      )
      .addCase(
        closeCheckedTabs.fulfilled,
        (state) => {
          state.checkedTabIds = [];
        }
      )
      .addCase(
        moveFocusIndex,
        (state, action) => {
          const nextIndex = state.tabIndex + action.payload;
          if (nextIndex >= state.tabs.length || nextIndex < 0) return;
          else state.tabIndex = nextIndex;
        }
      )
      .addCase(
        setFocusIndex,
        (state, action) => { state.tabIndex = action.payload; }
      )
      .addCase(
        setFocusIndexEnd,
        (state, action) => {
          state.tabIndex = action.payload === 'START'
            ? 0
            : state.tabs.length -1;
        }
      )
  }
});

export const selectCheckedTabs = (state: RootState) => {
  const { tabs, checkedTabIds } = state.tabs;
  return tabs.filter(tab => tab.id && checkedTabIds.includes(tab.id));
};

export default slice.reducer;