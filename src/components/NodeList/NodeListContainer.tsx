import { useTypedSelector } from "src/hooks";
import NodeList from './NodeList';
import { selectCurrentFolderNode } from 'src/store/modules/bookmarksSlice';

const NodeListContainer = () => {
  const currentFolderNode = useTypedSelector(selectCurrentFolderNode);

  return (
    <NodeList currentFolderNode={currentFolderNode} />
  );
};

export default NodeListContainer;