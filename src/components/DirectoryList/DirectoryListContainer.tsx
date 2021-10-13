import { useTypedDispatch, useTypedSelector } from "src/hooks";
import DirectoryList from "./DirectoryList";
import { selectDir } from "src/reducers/bookmarks";
import { MouseEventHandler } from "react";

const DirectoryListContainer = () => {
  const rootNode = useTypedSelector(({ bookmarks }) => bookmarks.rootNode);
  const dispatch = useTypedDispatch();

  const handleClickTitle = (id: string): MouseEventHandler => () => {
    dispatch(selectDir(id));
  };

  return (
    <DirectoryList
      rootNode={rootNode}
      handleClickTitle={handleClickTitle} />
  );
};

export default DirectoryListContainer;