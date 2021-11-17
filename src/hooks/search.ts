import { ChangeEventHandler, useRef } from 'react';
import { useTypedSelector, useTypedDispatch } from 'src/hooks';
import { setView } from 'src/store/modules/bookmarksSlice';

import { setSearchResult } from 'src/store/modules/nodeListSlice';
import { debounce } from 'src/util';
import api from 'src/api';
import { getTabs, search } from 'src/store/modules/tabsSlice';

export const useBookmarkSearch = () => {
  const dispatch = useTypedDispatch();
  const isSearchView = useTypedSelector(state => state.bookmarks.view === 'SEARCH');

  const searchRef = useRef(debounce((query: string) => {
    api.bookmarks.search(query)
    .then(res => dispatch(setSearchResult(res)));
  }, 500));
  
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target;

    if (!isSearchView) dispatch(setView('SEARCH'));
    
    value
    ? searchRef.current(value)
    : dispatch(setView('TREE'));
  }
  
  return handleChange;
} 

export const useTabsSearch = () => {
  const dispatch = useTypedDispatch();

  const searchRef = useRef(debounce((query: string) => {
    dispatch(search(query));
  }, 500));

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target;
    
    !value
    ? dispatch(getTabs())
    : searchRef.current(value);
  }

  return handleChange;
}