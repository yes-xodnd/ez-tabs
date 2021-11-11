import { createAction, createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { BookmarkNode } from 'src/constants/types';
import { RootState } from "..";
import { selectAllNodeList, remove, toggleCheck } from "./bookmarksSlice";

interface SearchState {
  nodeList: BookmarkNode[];
  focusIndex: number;
}

const initialState: SearchState = {
  nodeList: [],
  focusIndex: -1
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
)

export const setNodeIndex = createAction(
  'SEARCH/SET_NODE_INDEX',
  (index: number) => ({ payload: index })
);

export const moveFocusIndex = createAction(
  'SEARCH/MOVE_NODE_INDEX',
  (diff: 1 | -1) => ({ payload: diff })
);

export const removeFocusNode = createAsyncThunk<void, void, { state: RootState }>(
  'SEARCH/REMOVE_FOCUS_NODE',
  (_, { getState, dispatch }) => {
    const { nodeList, focusIndex } = getState().search;
    dispatch(remove(nodeList[focusIndex]));
  }
);

export const toggleFocusNode = createAsyncThunk<void, void, { state: RootState }>(
  'SEARCH/TOGGLE_FOCUS_NODE',
  (_, { getState, dispatch }) => {
    const { id } = selectFocusNode(getState());
    dispatch(toggleCheck(id));
  }
);

const selectFocusNode = createSelector(
  (state: RootState) => state.search.nodeList,
  (state: RootState) => state.search.focusIndex,
  (nodeList, focusIndex) => nodeList[focusIndex]
)

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
        setNodeIndex,
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