import { useTypedSelector } from "src/hooks";
import NodeList from './NodeList';
import { selectNodeDict,  } from 'src/store/modules/bookmarksSlice'

const NodeListContainer = () => {
  const { focusedFolderId } = useTypedSelector(({ bookmarks }) => bookmarks);
  const nodeDict = useTypedSelector(selectNodeDict);

  return <NodeList nodes={nodeDict[focusedFolderId]?.children || []} />;
};

export default NodeListContainer;