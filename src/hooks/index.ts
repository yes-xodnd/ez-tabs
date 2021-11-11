import { useState, useEffect } from 'react';

import { getTree } from 'src/store/modules/bookmarksSlice';
import { getTabs } from 'src/store/modules/tabsSlice';
import { addTabsChangeListener } from 'src/api';

import { useTypedDispatch, useTypedSelector } from './redux';

export { useFolderOpen, useCurrentFolder } from './FolderTree';
export { useSearch, useShowAllNodeList } from './search';
export { useTypedDispatch, useTypedSelector };

export const useToggle = (initState: boolean): [ boolean, () => void ] => {
  const [ state, setState ] = useState(initState);
  return [ state, () => setState(!state) ];
}

export const useInitData = () => {
  const dispatch = useTypedDispatch();
  
  useEffect(() => { 
    dispatch(getTree());
    dispatch(getTabs());
    addTabsChangeListener(() => dispatch(getTabs()));
  }, [ dispatch ]);
}