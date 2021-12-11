import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { BookmarkNode } from "src/constants/types";
import { RootState, ThunkApiConfig } from "..";
import { remove, setCurrentFolderNodeId, toParentNode, selectAllNodeList } from "./bookmarksSlice";

interface State {
  nodes: BookmarkNode[];
  focusIndex: number;
  checkedNodeIds: string[];
  renameNodeId: string;
}

const initialState: State = {
  nodes: [],
  focusIndex: -1,
  checkedNodeIds: [],
  renameNodeId: '',
};

export const setNodeList = createAction(
  'NODELIST/SET_NODELIST',
  (nodes: BookmarkNode[]) => ({ payload: nodes })
);

export const setSearchResult = createAsyncThunk<void, BookmarkNode[], ThunkApiConfig>(
  'NODELIST/SET_SEARCH_RESULT',
  (nodes, { dispatch, getState }) => {
    if (getState().bookmarks.view === 'SEARCH') {
      dispatch(setNodeList(nodes));
    }
  }
);

export const moveFocusIndex = createAsyncThunk<void, 'UP' | 'DOWN', ThunkApiConfig>(
  'NODELIST/MOVE_FOCUS_INDEX',
  (direction, { dispatch, getState }) => {
    const diff = direction === 'UP' ? -1 : 1;
    const nextIndex = getState().nodeList.focusIndex + diff;
    dispatch(setFocusIndex(nextIndex));
  }
);

export const setFocusIndex = createAction(
  'NODELIST/SET_FOCUS_INDEX',
  (index: number) => ({ payload: index })
);

export const setFocusIndexEnd = createAction(
  'NODELIST/SET_FOCUS_INDEX_END',
  (target: 'TOP' | 'BOTTOM') => ({ payload: target })
);

export const checkNode = createAction(
  'NODELIST/CHECK_NODE',
  (id: string) => ({ payload: id })
);

export const uncheckNode = createAction(
  'NODELIST/UNCHECK_NODE',
  (id: string) => ({ payload: id })
)

export const toggleCheck = createAsyncThunk<void, string, ThunkApiConfig>(
  'NODELIST/TOGGLE_CHECK',
  (id, { getState, dispatch }) => {
    const isChecked = getState().nodeList.checkedNodeIds.includes(id);
    isChecked
    ? dispatch(uncheckNode(id))
    : dispatch(checkNode(id))
  }
)

export const duplicateCheck = createAsyncThunk<void, 'UP' | 'DOWN', ThunkApiConfig>(
  'NODELIST/DUPLICATE_CHECK',
  (direction, { getState, dispatch }) => {
    const { nodes, checkedNodeIds, focusIndex } = getState().nodeList;
    const diff = direction === 'UP' ? -1 : 1;
    const nextIndex = focusIndex + diff;

    if (nextIndex < 0 || nextIndex >= nodes.length) return;

    const isChecked = checkedNodeIds.includes(nodes[focusIndex].id);
    const nextNodeId = nodes[nextIndex].id;
    
    dispatch(moveFocusIndex(direction));
    
    isChecked
    ? dispatch(checkNode(nextNodeId))
    : dispatch(uncheckNode(nextNodeId));
  }
);

export const toggleCheckFocused = createAsyncThunk<void, void, ThunkApiConfig>(
  'NODELIST/CHECK_FOCUSED_NODE',
  (_, { dispatch, getState }) => {
    if (getState().nodeList.focusIndex === -1) {
      dispatch(toParentNode());
      return;
    }

    const node = selectFocusedNode(getState());
    node.url 
    ? dispatch(toggleCheck(node.id))
    : dispatch(setCurrentFolderNodeId(node.id))
  }
);

export const checkAllNodes = createAction('NODELIST/CHECK_ALL_NODES');
export const uncheckAllNodes = createAction('NODELIST/UNCHECK_ALL_NODES');

export const openUrlFocused = createAsyncThunk<void, void, ThunkApiConfig>(
  'NODELIST/OPEN_FOCUS_NODE_URL',
  (_, { getState }) => {
    const url = selectFocusedNode(getState()).url;
    url && window.open(url);
  }
);

export const removeFocused = createAsyncThunk<void, void, ThunkApiConfig>(
  'NODELIST/REMOVE_FOCUS_NODE',
  (_, { dispatch, getState }) => {
    const node = selectFocusedNode(getState());
    dispatch(remove(node));
  }
);

export const removeChecked = createAsyncThunk<void, void, ThunkApiConfig>(
  'NODELIST/REMOVE_CHECKED',
  (_, { dispatch, getState }) => {
    const ids = getState().nodeList.checkedNodeIds.slice();
    
    dispatch(uncheckAllNodes());
    for (const id of ids) dispatch(remove(id));
  }
);

export const toggleRename = createAction(
  'NODELIST/TOGGLE_RENAME',
  (id: string) => ({ payload: id })
);

export const toggleRenameFocused = createAsyncThunk<void, void, ThunkApiConfig>(
  'NODELIST/TOGGLE_RENAME_FOCUSED',
  (_, { dispatch, getState }) => {
    const id = selectFocusedNode(getState()).id;
    dispatch(toggleRename(id));
  }
);

export const showAllNodeList = createAsyncThunk<void, void, ThunkApiConfig>(
  'NODELIST/SHOW_ALL_NODE_LIST',
  (_, { getState, dispatch }) => {
    const allNodeList = selectAllNodeList(getState());
    dispatch(setNodeList(allNodeList));
  }
);

const selectFocusedNode = ({ nodeList }: RootState) => nodeList.nodes[nodeList.focusIndex];

export const selectIsChecked = (id: string) => ({ nodeList }: RootState) => 
  nodeList.checkedNodeIds.includes(id);

export const selectIsFocused = (index: number) => ({ nodeList }: RootState) => 
  nodeList.focusIndex === index;

export const selectIsRename = (id: string) => ({ nodeList }: RootState) => 
  nodeList.renameNodeId === id;

export const selectIsAllChecked = ({ nodeList }: RootState) => 
  nodeList.checkedNodeIds.length === nodeList.nodes.length;

const slice = createSlice({
  name: 'nodeList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(
      setNodeList,
      (state, action) => { 
        state.focusIndex = -1;
        state.checkedNodeIds = [];
        state.renameNodeId = '';
        state.nodes = action.payload;
      }
    )
    .addCase(
      setFocusIndex,
      (state, action) => {
        const nextIndex = action.payload;
        if (nextIndex >= -1 && nextIndex < state.nodes.length) {
          state.focusIndex = nextIndex;
        }
      }
    )
    .addCase(
      setFocusIndexEnd,
      (state, action) => {
        if (!state.nodes.length) return;
        state.focusIndex = action.payload === 'TOP'
          ? 0
          : state.nodes.length - 1;
      }
    )
    .addCase(
      checkNode,
      (state, action) => {
        state.checkedNodeIds.push(action.payload);
      }
    )
    .addCase(
      uncheckNode,
      (state, action) => {
        state.checkedNodeIds = state.checkedNodeIds
          .filter(id => id !== action.payload);
      }
    )
    .addCase(
      checkAllNodes,
      state => {
        state.checkedNodeIds = state.checkedNodeIds.length === state.nodes.length
        ? []
        : state.nodes.map(node => node.id);
      }
    )
    .addCase(
      uncheckAllNodes,
      state => { state.checkedNodeIds = []; }
    )
    .addCase(
      toggleRename,
      (state, action) => {
        state.renameNodeId = state.renameNodeId === action.payload
        ? ''
        : action.payload;
      }
    )
  }
});

export default slice.reducer;