import { useTypedDispatch, useTypedSelector } from ".";
import { closeFolderNode, openFolderNode, setFocusedFolderId } from "src/store/modules/bookmarksSlice";


const useFolderOpen = (id: string): { isOpen: boolean, toggleOpen: () => void } => {
  const { openFolderNodeIds } = useTypedSelector(({ bookmarks }) => bookmarks);
  const dispatch = useTypedDispatch();

  const isOpen = openFolderNodeIds.includes(id);
  const toggleOpen = () => {
    isOpen
    ? dispatch(closeFolderNode(id))
    : dispatch(openFolderNode(id));
  };

  return { isOpen, toggleOpen };
};

const useFocus = (id: string): { isFocused: boolean, setFocus: () => void } => { 
  const { focusedFolderId } = useTypedSelector(({ bookmarks }) => bookmarks);
  const dispatch = useTypedDispatch();

  const isFocused = focusedFolderId === id;
  const setFocus = () => dispatch(setFocusedFolderId(id));
  
  return { isFocused, setFocus };
};

export { 
  useFolderOpen,
  useFocus,
};