import { useMemo } from "react";
import { useTypedDispatch, useTypedSelector } from ".";
import { closeFolderNode, openFolderNode, setCurrentFolderNodeId, moveFocusIndex, onDelete, onSelect, toParentNode, openFocusNodeUrl } from "src/store/modules/bookmarksSlice";


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

export const useTreeKeyHandlers = () => {
  const dispatch = useTypedDispatch();

  return useMemo(() => ({
    ArrowUp: () => dispatch(moveFocusIndex(-1)),
    ArrowDown: () => dispatch(moveFocusIndex(1)),
    ArrowRight: () => dispatch(openFocusNodeUrl()),
    ' ': () => dispatch(onSelect()), 
    Delete: () => dispatch(onDelete()),
    BackSpace: () => dispatch(toParentNode()),
  }), [ dispatch ]);
}