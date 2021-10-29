import { useTypedSelector, useTypedDispatch } from "src/hooks";
import NodeList from './NodeList';
import { setCurrentFolderNodeId, selectCurrentFolderNode } from 'src/store/modules/bookmarksSlice';

const NodeListContainer = () => {
  const currentFolderNode = useTypedSelector(selectCurrentFolderNode);
  const dispatch = useTypedDispatch();

  const toParentNode = () => {
    const parentId = currentFolderNode?.parentId;
    if (parentId) dispatch(setCurrentFolderNodeId(parentId));
  }

  return (
    <NodeList 
      node={currentFolderNode}
      toParentNode={toParentNode}
      />
  );
};

export default NodeListContainer;