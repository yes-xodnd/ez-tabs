import { useMemo } from "react";
import { treeKeyMap as keyMap } from 'src/constants/keyMap';
import { useTypedDispatch, useTypedSelector } from ".";
import { 
  closeFolderNode, 
  openFolderNode, 
  setCurrentFolderNodeId, 
  moveFocusIndex, 
  onSelect, 
  toParentNode, 
  openFocusNodeUrl, 
  setFocusIndexEnd, 
  createFolder, 
  toggleCheckAll, 
  removeChecked, 
  removeFocusNode,
  setView
} from "src/store/modules/bookmarksSlice";
import { showAllNodeList } from "src/store/modules/searchSlice";

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

export const useTreeKeyHandlers = () => {
  const dispatch = useTypedDispatch();
  const showAll = useShowAll();

  return useMemo(() => ({
    // List
    [keyMap.MOVE_UP]: () => dispatch(moveFocusIndex(-1)),
    [keyMap.MOVE_DOWN]: () => dispatch(moveFocusIndex(1)),
    [keyMap.MOVE_TOP]: () => dispatch(setFocusIndexEnd('START')),
    [keyMap.MOVE_BOTTOM]: () => dispatch(setFocusIndexEnd('END')),

    // ListItem
    [keyMap.OPEN_URL]: () => dispatch(openFocusNodeUrl()),
    [keyMap.CHECK]: () => dispatch(onSelect()), 
    [keyMap.DELETE_NODE]: () => dispatch(removeFocusNode()),
    [keyMap.TO_PARENT_NODE]: () => dispatch(toParentNode()),

    // Toolbar
    [keyMap.NEW_FOLDER]: () => dispatch(createFolder()),
    [keyMap.CHECK_ALL]: () => dispatch(toggleCheckAll()),
    [keyMap.DELETE_CHECKED_NODES]: () => dispatch(removeChecked()),
    [keyMap.SHOW_ALL]: showAll,
    [keyMap.FOCUS_SEARCHBAR]: () => {
      document.querySelector<HTMLInputElement>('#search-input')?.focus();
    }
  }), [ dispatch, showAll ]);
}