import { useTypedDispatch, useTypedSelector } from ".";
import { closeFolderNode, openFolderNode, setCurrentFolderNodeId } from "src/store/modules/bookmarksSlice";


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

const useCurrentFolder = (id: string): { 
  isCurrentFolder: boolean,
  setCurrentFolder: () => void
} => { 
  const { currentFolderNodeId } = useTypedSelector(({ bookmarks }) => bookmarks);
  const dispatch = useTypedDispatch();

  const isCurrentFolder = currentFolderNodeId === id;
  const setCurrentFolder = () => dispatch(setCurrentFolderNodeId(id));
  
  return { isCurrentFolder, setCurrentFolder };
};

export { 
  useFolderOpen,
  useCurrentFolder,
};