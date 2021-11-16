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
  currentFolderNodeId: string;
  openFolderNodeIds: string[];
  checkedNodeIds: string[];
  view: 'TREE' | 'SEARCH';
  focusIndex: number;
}

const initialState: BookmarksState = {
  rootNode: {} as BookmarkNode,
  currentFolderNodeId: "0",
  openFolderNodeIds: [],
  checkedNodeIds: [],
  view: 'TREE',
  focusIndex: -1,
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

export const setCurrentFolderNodeId = createAsyncThunk<string, string, { state: RootState }>(
  name + '/SET_CURRENT_FOLDER_NODE_ID',
  (id: string, { dispatch }) => {
    dispatch(openFolderNode(id));

    return id;
  }
);

export const createFolder = createAsyncThunk<void, void, { state: RootState }>(
  'BOOOKMARKS/CREATE_FOLDER',
  async (_, { getState, dispatch }) => {
    const parentId = getState().bookmarks.currentFolderNodeId;
    await api.bookmarks.create({ parentId });

    dispatch(getTree());
  }
)

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
export const uncheckAll = createAction(name + '/CHECK_CLEAR');

export const toggleCheckAll = createAsyncThunk<void, void, { state: RootState }>(
  'BOOKMARKS/TOGGLE_CHECK_ALL',
  (_, { getState, dispatch }) => {
    selectIsAllChecked(getState())
    ? dispatch(uncheckAll()) 
    : dispatch(checkAll());
  }
)

export const toggleCheck = createAction(
  name + '/TOGGLE_CHECK',
  (id: string) => ({ payload: id })
);


export const removeChecked = createAsyncThunk<void, void, { state: RootState }>(
  name + '/REMOVE_CHECKED',
  async (_, { getState, dispatch }) => {
    
    const ids = getState().bookmarks.checkedNodeIds.slice();
    dispatch(uncheckAll());
    
    for (const id of ids) {
      await api.bookmarks.remove(id);
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
);

export const setView = createAction(
  'BOOKMARKS_SET_VIEW', 
  (type: 'TREE' | 'SEARCH') => ({ payload: type })
);

export const setFocusIndex = createAction(
  'BOOKMARKS/SET_FOCUS',
  (index: number) => ({ payload: index })
);

export const setFocusIndexEnd = createAsyncThunk<void, 'START' | 'END', { state: RootState }>(
  'BOOKMARKS/SET_FOCUS_INDEX_END',
  (target, { getState, dispatch }) => {
    const length = selectCurrentFolderNode(getState()).children?.length || 0;
    if (!length) return;

    target === 'START'
      ? dispatch(setFocusIndex(0))
      : dispatch(setFocusIndex(length - 1));
  }
)

export const moveFocusIndex = createAsyncThunk<void, 1 | -1, { state: RootState }>(
  'BOOKMARKS/MOVE_FOCUS_INDEX',
  (diff: 1 | -1, { getState, dispatch }) => {
    const nextIndex = getState().bookmarks.focusIndex + diff;
    const length = selectCurrentFolderNode(getState()).children?.length || 0;

    if (nextIndex >= -1 && nextIndex < length) {
      dispatch(setFocusIndex(nextIndex));
    }
  }
);

export const toParentNode = createAsyncThunk<void, void, { state: RootState }>(
  'BOOKMARKS/TO_PARENT_NODE',
  (_, { getState, dispatch }) => {
    const parentId = selectCurrentFolderNode(getState()).parentId;
    parentId && dispatch(setCurrentFolderNodeId(parentId));
  }
)

export const onSelect = createAsyncThunk<void, void, { state: RootState }>(
  'BOOKMARKS/ON_SELECT',
  (_, { getState, dispatch }) => {
    const index = getState().bookmarks.focusIndex;

    if (index === -1) {
      dispatch(toParentNode());
      return;
    }

    const node = selectFocusNode(getState());
    if (!node || !node.id) return;

    node.url
    ? dispatch(toggleCheck(node.id))
    : dispatch(setCurrentFolderNodeId(node.id));
  }
);

export const removeFocusNode = createAsyncThunk<void, void, { state: RootState }>(
  'BOOKMARKS/ON_DELETE',
  (_, { getState, dispatch }) => {
    const node = selectFocusNode(getState());
    node && dispatch(remove(node));
  }
);

export const openFocusNodeUrl = createAsyncThunk<void, void, { state: RootState }>(
  'BOOKMARKS/OPEN_FOCUS_NODE_URL',
  (_, { getState }) => {
    const url = selectFocusNode(getState())?.url;
    url && window.open(url);
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

export const selectIsChecked = (state: RootState, id: string) => {
  return state.bookmarks.checkedNodeIds.includes(id);
}

export const selectIsAllChecked = (state: RootState) => {
  return selectCurrentFolderNode(state)?.children?.length === state.bookmarks.checkedNodeIds.length;
}

export const selectFocusNode = (state: RootState): BookmarkNode | undefined => {
  const index = state.bookmarks.focusIndex;
  return selectCurrentFolderNode(state).children?.[index];
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
        (state, action) => { 
          state.rootNode = action.payload;
          state.focusIndex = -1;
        }
      )
      .addCase(
        setCurrentFolderNodeId.fulfilled,
        (state, action) => { 
          state.currentFolderNodeId = action.payload;
          state.checkedNodeIds = [];
          state.focusIndex = -1;
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
      .addCase(
        setView,
        (state, action) => { 
          state.view = action.payload;
          state.checkedNodeIds = [];
        }
      )
      .addCase(
        setFocusIndex,
        (state, action) => { state.focusIndex = action.payload }
      )
  }
});

export default bookmarksSlice.reducer;