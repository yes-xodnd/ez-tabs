import { 
  createAsyncThunk,
  createAction,
  createSlice,
  createSelector 
} from '@reduxjs/toolkit';
import { BookmarkNode } from 'src/constants/types';
import api from 'src/api';
import { RootState } from 'src/store';

interface BookmarksState {
  rootNode: BookmarkNode;
  selectedDirId: string;
}

interface NodeDict {
  [id: string]: BookmarkNode;
}

const initialState: BookmarksState = {
  rootNode: {} as BookmarkNode,
  selectedDirId: "1",
};

// actions 
export const getTree = createAsyncThunk(
  'GET_TREE', 
  async () => {
    const tree = await api.bookmarks.getTree();
    return tree[0];
  }
);

export const setTree = createAction(
  'SET_TREE',
  (tree: BookmarkNode[]) => ({ payload: tree[0] })
)

export const selectDir = createAction(
  'SELECT_DIR',
  (id: string) => ({ payload: id })
);

// slice
const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        getTree.fulfilled,
        (state, action) => { state.rootNode = action.payload; }
      )
      .addCase(
        setTree,
        (state, action) => { state.rootNode = action.payload; }
      )
      .addCase(
        selectDir,
        (state, action) => { state.selectedDirId = action.payload; }
      )
  }
});

// selectors
const rootNode = (state: RootState): BookmarkNode => state.bookmarks.rootNode;


export const nodeDictSelector = createSelector(
  rootNode,
  (rootNode): NodeDict => {
    const dict: NodeDict = {};
    let queue: BookmarkNode[] = [ rootNode ];
    
    while (queue.length) {
      const node = queue.shift() as BookmarkNode;
      dict[node.id] = node;
      if (node.children) queue = [ ...queue, ...node.children ];
    }

    return dict;
});

export default bookmarksSlice.reducer;