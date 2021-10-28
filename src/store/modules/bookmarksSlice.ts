import { 
  createAsyncThunk,
  createAction,
  createSlice,
  createSelector 
} from '@reduxjs/toolkit';
import { BookmarkNode } from 'src/constants/types';
import { selectCheckedTabs } from './tabsSlice';
import { RootState } from 'src/store';
import api from 'src/api';

interface BookmarksState {
  rootNode: BookmarkNode;
  focusedFolderId: string;
  openFolderNodeIds: string[];
}

const initialState: BookmarksState = {
  rootNode: {} as BookmarkNode,
  focusedFolderId: "1",
  openFolderNodeIds: [],
};

// actions 
export const getTree = createAsyncThunk(
  'GET_TREE', 
  async () => {
    const tree = await api.bookmarks.getTree();
    return tree[0];
  }
);

export const setFocusedFolderId = createAction(
  'SET_FOCUSED_FOLDER_ID',
  (id: string) => ({ payload: id })
);

export const createFromTabs = createAsyncThunk<void, void, { state: RootState }>(
  'CREATE_FROM_TABS',
  async (_, { dispatch, getState }) => {
    const state = getState();
    const checkedTabs = selectCheckedTabs(state);
    const rootNode = selectRootNode(state);

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
);

export const openFolderNode = createAsyncThunk<string[], string, { state: RootState }>(
  'OPEN_FOLDER_NODE',
  (id: string, { getState }) => {
    const parentListIds = selectParentList(getState(), id).map(node => node.id);
    return parentListIds;
  }
);

export const closeFolderNode = createAction(
  'CLOSE_FOLDER_NODE',
  (id: string) => ({ payload: id })
);

export const rename = createAsyncThunk(
  'RENAME',
  async (details: {id: string, title: string}, { dispatch }) => {
    const { id, title } = details;
    const node = await api.bookmarks.update(id, { title });
    
    dispatch(getTree());
  }
)

// selectors
const selectRootNode = (state: RootState): BookmarkNode => state.bookmarks.rootNode;

export const selectNodeDict = createSelector(
  selectRootNode,
  (rootNode) => {
    const dict: { [id: string]: BookmarkNode } = {};
    let queue: BookmarkNode[] = [ rootNode ];
    
    while (queue.length) {
      const node = queue.shift() as BookmarkNode;
      dict[node.id] = node;
      if (node.children) queue = [ ...queue, ...node.children ];
    }

    return dict;
});

export const selectParentList = createSelector(
  selectNodeDict,
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
        setFocusedFolderId,
        (state, action) => { state.focusedFolderId = action.payload; }
      )
      .addCase(
        openFolderNode.fulfilled,
        (state, action) => { 
          state.openFolderNodeIds = [ 
            ...new Set([ ...state.openFolderNodeIds, ...action.payload ])
          ];
        }
      )
      .addCase(
        closeFolderNode,
        (state, action) => {
          state.openFolderNodeIds = state.openFolderNodeIds
          .filter(id => id !== action.payload);
        }
      )
  }
});

export default bookmarksSlice.reducer;