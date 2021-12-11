import { useMemo } from "react";
import { treeKeyMap as keyMap } from 'src/constants/keyMap';
import { useTypedDispatch, useTypedSelector } from ".";
import { 
  closeFolderNode, 
  openFolderNode, 
  setCurrentFolderNodeId, 
  toParentNode, 
  createFolder, 
  setView,
} from "src/store/modules/bookmarksSlice";

import {
  moveFocusIndex,
  setFocusIndexEnd,
  openUrlFocused,
  toggleCheckFocused,
  checkAllNodes, 
  removeFocused,
  removeChecked, 
  toggleRenameFocused,
  showAllNodeList,
  duplicateCheck,
} from 'src/store/modules/nodeListSlice';

export const useFolderOpen = (id: string): { isOpen: boolean, toggleOpen: () => void } => {
  const isOpen = useTypedSelector(({ bookmarks }) => bookmarks.openFolderNodeIds.includes(id));
  const dispatch = useTypedDispatch();
  const toggleOpen = () => {
    isOpen
    ? dispatch(closeFolderNode(id))
    : dispatch(openFolderNode(id));
  };

  return { isOpen, toggleOpen };
};

export const useCurrentFolder = (id: string): { 
  isCurrentFolder: boolean,
  setCurrentFolder: () => void
} => { 
  const isCurrentFolder = useTypedSelector(({ bookmarks }) => bookmarks.currentFolderNodeId === id);
  const dispatch = useTypedDispatch();
  const setCurrentFolder = () => dispatch(setCurrentFolderNodeId(id));
  
  return { isCurrentFolder, setCurrentFolder };
};

export const useShowAll = () => {
  const dispatch = useTypedDispatch();
  return () => {
    dispatch(showAllNodeList());
    dispatch(setView('SEARCH'));
  };
};

export const useBookmarksKeyHandlers = () => {
  const dispatch = useTypedDispatch();
  const showAll = useShowAll();

  return useMemo(() => ({
    // List
    [keyMap.MOVE_UP]: () => dispatch(moveFocusIndex('UP')),
    [keyMap.MOVE_DOWN]: () => dispatch(moveFocusIndex('DOWN')),
    [keyMap.MOVE_TOP]: () => dispatch(setFocusIndexEnd('TOP')),
    [keyMap.MOVE_BOTTOM]: () => dispatch(setFocusIndexEnd('BOTTOM')),
    [keyMap.DUPLICATE_CHECK_UP]: () => dispatch(duplicateCheck('UP')),
    [keyMap.DUPLICATE_CHECK_DOWN]:() => dispatch(duplicateCheck('DOWN')),

    // ListItem
    [keyMap.OPEN_URL]: () => dispatch(openUrlFocused()),
    [keyMap.CHECK]: () => dispatch(toggleCheckFocused()), 
    [keyMap.DELETE_NODE]: () => dispatch(removeFocused()),
    [keyMap.TO_PARENT_NODE]: () => dispatch(toParentNode()),
    [keyMap.RENAME]: () => dispatch(toggleRenameFocused()),

    // Toolbar
    [keyMap.NEW_FOLDER]: () => dispatch(createFolder()),
    [keyMap.CHECK_ALL]: () => dispatch(checkAllNodes()),
    [keyMap.DELETE_CHECKED_NODES]: () => dispatch(removeChecked()),
    [keyMap.SHOW_ALL]: showAll,
    [keyMap.FOCUS_SEARCHBAR]: () => {
      document.querySelector<HTMLInputElement>('#search-input')?.focus();
    },
  }), [ dispatch, showAll ]);
}