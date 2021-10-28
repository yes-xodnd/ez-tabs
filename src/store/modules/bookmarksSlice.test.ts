import { configureStore, combineReducers } from '@reduxjs/toolkit';
import bookmarksReducer, { 
  getTree, 
  setFocusedFolderId,
  nodeDictSelector, 
  parentListSelector
} from './bookmarksSlice';


const reducer = combineReducers({ bookmarks: bookmarksReducer });
const store = configureStore({ reducer });

describe('Store Bookmarks slice: Actions', () => {

  test('handle getTree async thunk', async () => {
    const action = await store.dispatch(getTree());
    store.dispatch(action);

    expect(store.getState().bookmarks.rootNode).not.toEqual({});
  });

  test('handle selectDir action', () => {
    store.dispatch(setFocusedFolderId('2'));

    expect(store.getState().bookmarks.focusedFolderId).toBe('2');
  });

  test('nodeDictSelector', async () => {
    const nodeDict = nodeDictSelector(store.getState());
    expect(Object.keys(nodeDict)).toHaveLength(9);
  });
  
  test('parentListSelector', async () => {
    const parentList = parentListSelector(store.getState(), '523');
    expect(parentList.map(node => node.id)).toEqual(['0', '1', '523']);
  });
});