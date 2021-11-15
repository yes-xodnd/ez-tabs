import { createAction, createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { BookmarkNode } from 'src/constants/types';
import { RootState } from "..";
import { selectAllNodeList, remove, toggleCheck, removeChecked } from "./bookmarksSlice";

interface SearchState {
  nodeList: BookmarkNode[];
  focusIndex: number;
}

const initialState: SearchState = {
  nodeList: [],
  focusIndex: -1,
};

export const setNodeList = createAction(
  'SEARCH/SET_NODE_LIST',
  (nodeList: BookmarkNode[]) => ({ payload: nodeList })
);

export const showAllNodeList = createAsyncThunk<void, void, { state: RootState }>(
  'SEARCH/SHOW_ALL_NODE_LIST',
  (_, { getState, dispatch }) => {
    const allNodeList = selectAllNodeList(getState());
    dispatch(setNodeList(allNodeList));
  }
);

export const setFocusIndex = createAction(
  'SEARCH/SET_NODE_INDEX',
  (index: number) => ({ payload: index })
);

export const moveFocusIndex = createAction(
  'SEARCH/MOVE_NODE_INDEX',
  (diff: 1 | -1) => ({ payload: diff })
);

export const removeHotkey = createAsyncThunk<void, void, { state: RootState }>(
  'SEARCH/REMOVE_HOTKEY',
  (_, { getState, dispatch }) => {
    const {checkedNodeIds} = getState().bookmarks;

    if (checkedNodeIds.length) {
      dispatch(setNodeList(selectFilteredNodeList(getState(), checkedNodeIds)));
      dispatch(removeChecked());
    } else {
      const node = selectFocusNode(getState());
      dispatch(setNodeList(selectFilteredNodeList(getState(), [ node.id ])));
      dispatch(remove(node));
    }
  }
);

export const toggleCheckFocusNode = createAsyncThunk<void, void, { state: RootState }>(
  'SEARCH/TOGGLE_FOCUS_NODE',
  (_, { getState, dispatch }) => {
    const node = selectFocusNode(getState());
    console.log(node);
    node.id && dispatch(toggleCheck(node.id));
  }
);

const selectFocusNode = createSelector(
  (state: RootState) => state.search.nodeList,
  (state: RootState) => state.search.focusIndex,
  (nodeList, focusIndex) => nodeList[focusIndex]
);

const selectFilteredNodeList = (state: RootState, idList: string[]) => {
  return state.search.nodeList.filter(node => !idList.includes(node.id));
};

const slice = createSlice({
  name: 'SEARCH',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        setNodeList,
        (state, action) => { 
          state.nodeList = action.payload;
          state.focusIndex = -1;
        }
      )
      .addCase(
        setFocusIndex,
        (state, action) => { state.focusIndex = action.payload; }
      )
      .addCase(
        moveFocusIndex,
        (state, action) => {
          const nextIndex = state.focusIndex + action.payload;
          if (nextIndex > -1 && nextIndex < state.nodeList.length) {
            state.focusIndex = nextIndex;
          }
        }
      )
  }
})

export default slice.reducer;