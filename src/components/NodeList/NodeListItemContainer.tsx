import { BookmarkNode } from "src/constants/types";
import { useScrollCenterFocused, useTypedDispatch, useTypedSelector } from "src/hooks";
import { setCurrentFolderNodeId } from "src/store/modules/bookmarksSlice";
import { selectIsRename, selectIsChecked, selectIsFocused, setFocusIndex, toggleCheck, toggleRename as toggleRenameAction } from 'src/store/modules/nodeListSlice';
import NodeListItem from "./NodeListItem";

interface Props {
  node: BookmarkNode;
  index: number;
}

const NodeListItemContainer = ({ node, index }: Props) => { 
  const dispatch = useTypedDispatch();
  const isBaseNode = ['1', '2'].includes(node.id);
  const isFocused = useTypedSelector(selectIsFocused(index));
  const isChecked = useTypedSelector(selectIsChecked(node.id));
  const isRenameNode = useTypedSelector(selectIsRename(node.id));
  const ref = useScrollCenterFocused<HTMLDivElement>(isFocused);

  const handleClick = () => {
    dispatch(setFocusIndex(index));
    if (!isBaseNode) dispatch(toggleCheck(node.id));
  };

  const handleDoubleClick = () => {
    node.url
    ? window.open(node.url)
    : dispatch(setCurrentFolderNodeId(node.id));
  };

  const toggleRename = () => dispatch(toggleRenameAction(node.id));
  
  return (
    <NodeListItem { ...{ 
      node, 
      isFocused,
      isChecked,
      isRenameNode,
      handleClick,
      handleDoubleClick,
      toggleRename,
      ref
    } } />  
  );
};

export default NodeListItemContainer;