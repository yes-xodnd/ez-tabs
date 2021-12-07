import { 
  createAsyncThunk,
  createAction,
  createSlice,
  createSelector 
} from '@reduxjs/toolkit';
import { BookmarkNode } from 'src/constants/types';
import { selectCheckedTabs } from './tabsSlice';
import { RootState, ThunkApiConfig } from 'src/store';
import api from 'src/api';

interface BookmarksState {
  rootNode: BookmarkNode;
  currentFolderNodeId: string;
  openFolderNodeIds: string[];
  view: 'TREE' | 'SEARCH';
}

const initialState: BookmarksState = {
  rootNode: {} as BookmarkNode,
  currentFolderNodeId: "0",
  openFolderNodeIds: [],
  view: 'TREE',
};

// actions 
export const getTree = createAsyncThunk(
  'BOOKMARKS/GET_TREE', 
  async () => {
    const tree = await api.bookmarks.getTree();
    return tree[0];
  }
);

export const setCurrentFolderNodeId = createAsyncThunk<string, string, ThunkApiConfig>(
  'BOOKMARKS/SET_CURRENT_FOLDER_NODE_ID',
  (id: string, { dispatch }) => {
    dispatch(openFolderNode(id));

    return id;
  }
);

export const createFolder = createAsyncThunk<void, void, ThunkApiConfig>(
  'BOOOKMARKS/CREATE_FOLDER',
  async (_, { getState, dispatch }) => {
    const parentId = getState().bookmarks.currentFolderNodeId;
    await api.bookmarks.create({ title: 'new folder', parentId });

    dispatch(getTree());
  }
)

export const createFromTabs = createAsyncThunk<void, void, ThunkApiConfig>(
  'BOOKMARKS/CREATE_FROM_TABS',
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
    dispatch(setCurrentFolderNodeId(FolderNode.id));
    dispatch(openFolderNode(FolderNode.id));
  }
);

export const openFolderNode = createAsyncThunk<string[], string, ThunkApiConfig>(
  'BOOKMARKS/OPEN_FOLDER_NODE',
  (id: string, { getState }) => {
    const parentListIds = selectParentIdList(getState(), id);
    return parentListIds;
  }
);

export const closeFolderNode = createAction(
  'BOOKMARKS/CLOSE_FOLDER_NODE',
  (id: string) => ({ payload: id })
);

export const rename = createAsyncThunk<void, { id: string, title: string }, ThunkApiConfig>(
  'BOOKMARKS/RENAME',
  async (details, { dispatch }) => {
    const { id, title } = details;
    await api.bookmarks.update(id, { title });
    
    dispatch(getTree());
  }
)

export const remove = createAsyncThunk<void, BookmarkNode | string, ThunkApiConfig>(
  'BOOKMARKS/REMOVE',
  async (node: BookmarkNode | string, { dispatch }) => {
    
    if (typeof node === 'string') {
      const id = node;
      await api.bookmarks.remove(id);
      return;
    }

    node.url 
      ? await api.bookmarks.remove(node.id)
      : await api.bookmarks.removeTree(node.id);

    dispatch(getTree());
  }
);

export const moveChecked = createAsyncThunk<void, string, { state: RootState }>(
  'BOOKMARKS/MOVE_CHECKED',
  async (parentId, { dispatch, getState }) => {
    getState()
      .nodeList
      .checkedNodeIds
      .forEach(id => api.bookmarks.move(id, { parentId }));
    dispatch(getTree());
  }
);

export const setView = createAction(
  'BOOKMARKS_SET_VIEW', 
  (type: 'TREE' | 'SEARCH') => ({ payload: type })
);

export const toParentNode = createAsyncThunk<void, void, ThunkApiConfig>(
  'BOOKMARKS/TO_PARENT_NODE',
  (_, { getState, dispatch }) => {
    const parentId = selectCurrentFolderNode(getState()).parentId;
    parentId && dispatch(setCurrentFolderNodeId(parentId));
  }
);

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

export const selectAllNodeList = createSelector(
  selectNodeDict,
  (nodeDict) => Object
    .keys(nodeDict)
    .map(key => nodeDict[key])
    .filter(node => node.url)
);

export const selectParentIdList = createSelector(
  selectNodeDict,
  (_: RootState, id: string) => id,
  (nodeDict, id) => {
    const node = nodeDict[id];
    let result = [ node.id ];
    let { parentId } = node;
    
    while (parentId) {
      const parentNode = nodeDict[parentId];
      result = [ parentNode.id, ...result ];
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
  name: 'BOOKMARKS',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        getTree.fulfilled,
        (state, action) => { 
          state.rootNode = action.payload;
        }
      )
      .addCase(
        setCurrentFolderNodeId.fulfilled,
        (state, action) => { 
          state.currentFolderNodeId = action.payload;
        }
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
      .addCase(
        setView,
        (state, action) => { 
          state.view = action.payload;
        }
      )
  }
});

export default bookmarksSlice.reducer;