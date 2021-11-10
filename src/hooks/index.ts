import { useState, useEffect } from 'react';

import { getTree } from 'src/store/modules/bookmarksSlice';
import { getTabs } from 'src/store/modules/tabsSlice';
import { addTabsChangeListener } from 'src/api';

import { useTypedDispatch, useTypedSelector } from './redux';
import { useFolderOpen, useCurrentFolder } from './FolderTree';

const useToggle = (initState: boolean): [ boolean, () => void ] => {
  const [ state, setState ] = useState(initState);
  return [ state, () => setState(!state) ];
}

const useInitData = () => {
  const dispatch = useTypedDispatch();
  
  useEffect(() => { 
    dispatch(getTree());
    dispatch(getTabs());
    addTabsChangeListener(() => dispatch(getTabs()));
  }, [ dispatch ]);
}

export {
  useInitData,
  useToggle,
  useTypedDispatch,
  useTypedSelector,
  useFolderOpen,
  useCurrentFolder,
};