import { ChangeEventHandler, useMemo, useRef } from 'react';
import { useTypedSelector, useTypedDispatch } from 'src/hooks';
import { setView } from 'src/store/modules/bookmarksSlice';
import { setNodeList, showAllNodeList, moveFocusIndex, removeHotkey, toggleCheckFocusNode } from 'src/store/modules/searchSlice';
import { debounce } from 'src/util';
import api from 'src/api';

export const useSearch = () => {
  const dispatch = useTypedDispatch();
  const isSearchView = useTypedSelector(state => state.bookmarks.view === 'SEARCH');

  const searchRef = useRef(debounce((query: string) => {
    api.bookmarks.search(query)
    .then(res => dispatch(setNodeList(res)));
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

export const useShowAllNodeList = () => {
  const dispatch = useTypedDispatch();
  return () => { dispatch(showAllNodeList()) };
}

export const useSearchKeyHandlers = () => {
  const dispatch = useTypedDispatch();

  const handlers = useMemo(() => ({
    ArrowUp: () => dispatch(moveFocusIndex(-1)),
    ArrowDown: () => dispatch(moveFocusIndex(1)),
    Delete: () => dispatch(removeHotkey()),
    ' ': () => dispatch(toggleCheckFocusNode()),
  }), [ dispatch ]);

  return handlers;
}