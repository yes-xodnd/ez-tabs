import { useTypedDispatch, useTypedSelector } from ".";
import { closeFolderNode, openFolderNode, setCurrentFolderNodeId } from "src/store/modules/bookmarksSlice";


const useFolderOpen = (id: string): { isOpen: boolean, toggleOpen: () => void } => {
  const isOpen = useTypedSelector(({ bookmarks }) => bookmarks.openFolderNodeIds.includes(id));
  const dispatch = useTypedDispatch();
  const toggleOpen = () => {
    isOpen
    ? dispatch(closeFolderNode(id))
    : dispatch(openFolderNode(id));
  };

  return { isOpen, toggleOpen };
};

const useCurrentFolder = (id: string): { 
  isCurrentFolder: boolean,
  setCurrentFolder: () => void
} => { 
  const isCurrentFolder = useTypedSelector(({ bookmarks }) => bookmarks.currentFolderNodeId === id);
  const dispatch = useTypedDispatch();
  const setCurrentFolder = () => dispatch(setCurrentFolderNodeId(id));
  
  return { isCurrentFolder, setCurrentFolder };
};

export { 
  useFolderOpen,
  useCurrentFolder,
};