import { useTypedDispatch, useTypedSelector } from "src/hooks";
import DirectoryList from "./DirectoryList";
import { selectDir } from "src/reducers/bookmarks";

const DirectoryListContainer = () => {
  const { rootNode } = useTypedSelector(({ bookmarks }) => bookmarks);
  const dispatch = useTypedDispatch();
  const handleClickTitle = (id: string) => () => dispatch(selectDir(id));

  return (
    <DirectoryList
      rootNode={rootNode}
      handleClickTitle={handleClickTitle} />
  );
};

export default DirectoryListContainer;