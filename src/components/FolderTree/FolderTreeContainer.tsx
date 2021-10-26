import { useTypedDispatch, useTypedSelector } from "src/hooks";
import FolderTree from "./FolderTree";
import { setFocusedFolderId } from "src/store/modules/bookmarksSlice";

const FolderListContainer = () => {
  const { rootNode } = useTypedSelector(({ bookmarks }) => bookmarks);
  const dispatch = useTypedDispatch();
  const handleClickTitle = (id: string) => () => dispatch(setFocusedFolderId(id));

  return (
    <FolderTree
      rootNode={rootNode}
      handleClickTitle={handleClickTitle} />
  );
};

export default FolderListContainer;