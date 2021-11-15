import { BookmarkNode } from "src/constants/types";
import { useTypedDispatch, useTypedSelector } from "src/hooks";
import { setFocusIndex, toggleCheck } from "src/store/modules/bookmarksSlice";
import NodeListItem from "./NodeListItem";

interface Props {
  node: BookmarkNode;
  index: number;
}

const NodeListItemContainer = ({ node, index }: Props) => { 
  const dispatch = useTypedDispatch();
  const isBaseNode = ['1', '2'].includes(node.id);
  const isFocused = useTypedSelector(state => state.bookmarks.focusIndex === index);

  const handleClick = () => {
    dispatch(setFocusIndex(index));
    if (!isBaseNode) dispatch(toggleCheck(node.id));
  };
  
  return (
    <NodeListItem { ...{ node, isFocused, handleClick } } />  
  );
};

export default NodeListItemContainer;