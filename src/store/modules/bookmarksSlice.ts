import { 
  createAsyncThunk,
  createAction,
  createSlice,
  createSelector 
} from '@reduxjs/toolkit';
import { BookmarkNode, Tab } from 'src/constants/types';
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

export const selectDir = createAction(
  'SELECT_DIR',
  (id: string) => ({ payload: id })
);

export const createFromTabs = createAsyncThunk<void, Tab[], { state: RootState }>(
  'CREATE_FROM_TABS',
  async (checkedTabs: Tab[], { dispatch, getState }) => {
    const state = getState();
    const rootNode = rootNodeSelector(state);

    const tabsRootNode = rootNode.children
      ?.filter(childNode => childNode.title === 'Tabs')[0]
      || await api.bookmarks.create({ title: 'Tabs', parentId: '0' });

    const FolderNode = await api.bookmarks.create({ 
      title: new Date().toLocaleString(),
      parentId: tabsRootNode.id,
    });

    for (const { url, title } of checkedTabs) {
      await api.bookmarks.create({ url, title, parentId: FolderNode.id });
    }

    dispatch(getTree());
  }
)

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
        selectDir,
        (state, action) => { state.selectedDirId = action.payload; }
      )
  }
});

// selectors
const rootNodeSelector = (state: RootState): BookmarkNode => state.bookmarks.rootNode;

export const nodeDictSelector = createSelector(
  rootNodeSelector,
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

export const parentListSelector = createSelector(
  nodeDictSelector,
  (_: RootState, id: string) => id,
  (nodeDict, id) => {
    const node = nodeDict[id];
    let result = [ node ];
    let { parentId } = node;
    
    while (parentId) {
      const parentNode = nodeDict[parentId];
      result = [ parentNode, ...result ];
      parentId = parentNode.parentId;
    }

    return result;
  }
);

export default bookmarksSlice.reducer;