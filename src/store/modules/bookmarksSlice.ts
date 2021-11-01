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
  checkedNodeIds: string[];
}

const initialState: BookmarksState = {
  rootNode: {} as BookmarkNode,
  currentFolderNodeId: "0",
  openFolderNodeIds: [],
  checkedNodeIds: []
};

const name = 'BOOKMARKS';

// actions 
export const getTree = createAsyncThunk(
  name + '/GET_TREE', 
  async () => {
    const tree = await api.bookmarks.getTree();
    return tree[0];
  }
);

export const setCurrentFolderNodeId = createAction(
  name + '/SET_CURRENT_FOLDER_NODE_ID',
  (id: string) => ({ payload: id })
);

export const createFromTabs = createAsyncThunk<void, void, { state: RootState }>(
  name + '/CREATE_FROM_TABS',
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
  name + '/OPEN_FOLDER_NODE',
  (id: string, { getState }) => {
    const parentListIds = selectParentIdList(getState(), id);
    return parentListIds;
  }
);

export const closeFolderNode = createAction(
  name + '/CLOSE_FOLDER_NODE',
  (id: string) => ({ payload: id })
);

export const rename = createAsyncThunk(
  name + '/RENAME',
  async (details: {id: string, title: string}, { dispatch }) => {
    const { id, title } = details;
    await api.bookmarks.update(id, { title });
    
    dispatch(getTree());
  }
)

export const remove = createAsyncThunk(
  name + '/REMOVE',
  async (node: BookmarkNode, { dispatch }) => {
    
    node.url 
      ? await api.bookmarks.remove(node.id)
      : await api.bookmarks.removeTree(node.id);

    dispatch(getTree());
  }
);

export const checkAll = createAsyncThunk<string[], void, { state: RootState }>(
  name + '/CHECK_ALL',
  async (_, { getState }) => {
    const node = selectCurrentFolderNode(getState());
    return node.children?.map(node => node.id) || [];
  }
);

export const toggleCheck = createAction(
  name + '/TOGGLE_CHECK',
  (id: string) => ({ payload: id })
);

export const uncheckAll = createAction(name + '/CHECK_CLEAR');

export const removeChecked = createAsyncThunk<void, void, { state: RootState }>(
  name + '/REMOVE_CHECKED',
  async (_, { getState, dispatch }) => {
    const { checkedNodeIds } = getState().bookmarks;
    for (const id of checkedNodeIds) {
      const [ node ] = await api.bookmarks.get(id);
      if (!node) continue;

      (node.children) 
      ? await api.bookmarks.removeTree(id)
      : await api.bookmarks.remove(id);
    }

    dispatch(getTree());
  }
);

export const moveChecked = createAsyncThunk<void, string, { state: RootState }>(
  'BOOKMARKS/MOVE_CHECKED',
  async (parentId, { dispatch, getState }) => {
    getState()
      .bookmarks
      .checkedNodeIds
      .forEach(id => api.bookmarks.move(id, { parentId }));
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

export const selectCurrentFolderDepth = createSelector(
  (state: RootState) => selectParentIdList(state, state.bookmarks.currentFolderNodeId),
  (parentList) => parentList.length - 1
);

export const selectCurrentFolderNode = createSelector(
  selectNodeDict,
  (state: RootState) => state.bookmarks.currentFolderNodeId,
  (nodeDict, id) => nodeDict[id]
);

export const selectIsChecked = (state: RootState, id: string) => {
  return state.bookmarks.checkedNodeIds.includes(id);
}

export const selectIsAllChecked = (state: RootState) => {
  return selectCurrentFolderNode(state)?.children?.length === state.bookmarks.checkedNodeIds.length;
}

// slice
const bookmarksSlice = createSlice({
  name,
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
        (state, action) => { 
          state.currentFolderNodeId = action.payload;
          state.checkedNodeIds = [];
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
        checkAll.fulfilled,
        (state, action) => { state.checkedNodeIds = action.payload; }
      )
      .addCase(
        toggleCheck,
        (state, action) => { 
          const id = action.payload;
          state.checkedNodeIds = state.checkedNodeIds.includes(id)
          ? state.checkedNodeIds.filter(item => item !== id)
          : [ ...state.checkedNodeIds, id ];
         }
      )
      .addCase(
        uncheckAll,
        state => { state.checkedNodeIds = []; }
      )
  }
});

export default bookmarksSlice.reducer;