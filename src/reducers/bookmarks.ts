import { createAsyncThunk, createReducer, createAction } from '@reduxjs/toolkit';
import { BookmarkNode } from 'src/constants/types';
import api from 'src/api';

interface State {
  rootNode: BookmarkNode;
  selectedDirId: string;
}

const initState: State = {
  rootNode: {} as BookmarkNode,
  selectedDirId: "1",
};

// action types
const GET_TREE = 'GET_TREE';
const SELECT_DIR = 'SELECT_DIR';

// actions 
export const getTree = createAsyncThunk(
  GET_TREE, 
  async () => {
    const tree = await api.bookmarks.getTree();
    return tree[0];
  }
);

export const selectDir = createAction(
  SELECT_DIR,
  (id: string) => ({ payload: id })
);

const reducer = createReducer(initState, builder => {
  builder
    .addCase(
      getTree.fulfilled,
      (state, action) => { state.rootNode = action.payload; }
    )
    .addCase(
      selectDir,
      (state, action) => { state.selectedDirId = action.payload; }
    )
});

export default reducer;