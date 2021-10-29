import { 
  createAsyncThunk,
  createAction,
  createSlice,
  createSelector 
} from '@reduxjs/toolkit';
import { BookmarkNode } from 'src/constants/types';
import { selectCheckedTabs } from './tabsSlice';
import { activateWindow } from './intefaceSlice';
import { RootState } from 'src/store';
import api from 'src/api';

interface BookmarksState {
  rootNode: BookmarkNode;
  currentFolderNodeId: string;
  openFolderNodeIds: string[];
}

const initialState: BookmarksState = {
  rootNode: {} as BookmarkNode,
  currentFolderNodeId: "0",
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

export const setCurrentFolderNodeId = createAction(
  'SET_CURRENT_FOLDER_NODE_ID',
  (id: string) => ({ payload: id })
);

export const createFromTabs = createAsyncThunk<void, void, { state: RootState }>(
  'CREATE_FROM_TABS',
  async (_, { dispatch, getState }) => {
    const state = getState();
    const checkedTabs = selectCheckedTabs(state);
    const children = await api.bookmarks.getChildren('1');

    const tabsRootNode = children
      ?.find(childNode => childNode.title === 'Tabs')
      || await api.bookmarks.create({ title: 'Tabs', parentId: '1' });

    const FolderNode = await api.bookmarks.create({ 
      title: new Date().toLocaleString(),
      parentId: tabsRootNode.id,
    });

    for (const { url, title } of checkedTabs) {
      await api.bookmarks.create({ url, title, parentId: FolderNode.id });
    }

    await dispatch(getTree());
    dispatch(activateWindow('BOOKMARKS'));
    dispatch(setCurrentFolderNodeId(FolderNode.id));
    dispatch(openFolderNode(FolderNode.id));
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
    await api.bookmarks.update(id, { title });
    
    dispatch(getTree());
  }
)

export const remove = createAsyncThunk(
  'REMOVE',
  async (node: BookmarkNode, { dispatch }) => {
    
    node.url 
      ? await api.bookmarks.remove(node.id)
      : await api.bookmarks.removeTree(node.id);

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

export const selectCurrentFolderNode = createSelector(
  selectNodeDict,
  (state: RootState) => state.bookmarks.currentFolderNodeId,
  (nodeDict, id) => nodeDict[id]
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
        setCurrentFolderNodeId,
        (state, action) => { state.currentFolderNodeId = action.payload; }
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