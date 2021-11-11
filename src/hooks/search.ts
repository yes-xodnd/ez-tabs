import { ChangeEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import { BookmarkNode } from 'src/constants/types';
import { useTypedSelector, useTypedDispatch } from 'src/hooks';
import { selectAllNodeList } from 'src/store/modules/bookmarksSlice';
import { setNodeList, showAllNodeList, moveFocusIndex, removeFocusNode, toggleFocusNode } from 'src/store/modules/searchSlice';
import { debounce } from 'src/util';
import api from 'src/api';

export const useSearch = () => {
  const dispatch = useTypedDispatch();
  const allNodeList = useTypedSelector(selectAllNodeList);
  const [ value, setValue ] = useState<string>('');

  const searchRef = useRef(debounce((query: string, allNodeList: BookmarkNode[]) => {
    if (query === '') {
      dispatch(setNodeList(allNodeList));
      return;
    }

    api.bookmarks.search(query)
    .then(res => dispatch(setNodeList(res)));
  }, 500));

  // keeps nodeList updated in searchSlice
  useEffect(() => {
    dispatch(setNodeList(allNodeList));
  }, [ allNodeList, dispatch ]);

  // search
  useEffect(() => { searchRef.current(value, allNodeList); }, [ value, allNodeList ]);
  
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value);
  }
  
  return { value, handleChange };
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
    Delete: () => dispatch(removeFocusNode()),
    Enter: () => dispatch(toggleFocusNode()),
  }), [ dispatch ]);

  return handlers;
}