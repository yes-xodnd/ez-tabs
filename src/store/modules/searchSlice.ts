import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BookmarkNode } from 'src/constants/types';
import { RootState } from "..";
import { selectAllNodeList } from "./bookmarksSlice";


interface SearchState {
  nodeList: BookmarkNode[];
  nodeIndex: number;
}

const initialState: SearchState = {
  nodeList: [],
  nodeIndex: -1,
};

export const setNodeList = createAction(
  'SEARCH/SET_NODE_LIST',
  (nodeList: BookmarkNode[]) => ({ payload: nodeList })
)

export const setNodeIndex = createAction(
  'SEARCH/SET_NODE_INDEX',
  (index: number) => ({ payload: index })
);

export const moveNodeIndex = createAction(
  'SEARCH/MOVE_NODE_INDEX',
  (diff: 1 | -1) => ({ payload: diff })
)

const slice = createSlice({
  name: 'SEARCH',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        setNodeIndex,
        (state, action) => { state.nodeIndex = action.payload; }
      )
      .addCase(
        moveNodeIndex,
        (state, action) => {
          const nextIndex = state.nodeIndex + action.payload;
          if (nextIndex > -1 && nextIndex < state.nodeList.length) {
            state.nodeIndex = nextIndex;
          }
        }
      )
      .addCase(
        setNodeList,
        (state, action) => { state.nodeList = action.payload; }
      )
  }
})

export default slice.reducer;