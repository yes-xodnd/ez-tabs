import { BookmarkNode } from "src/constants/types";
import { useCurrentFolder, useTypedDispatch } from "src/hooks";
import NodeListItemLink from './NodeListItem';
import styled from "styled-components";
import { openFolderNode } from "src/store/modules/bookmarksSlice";

interface Props {
  node: BookmarkNode;
}

const NodeListItemContainer = ({ node }: Props) => {  
  const dispatch = useTypedDispatch();
  const { setCurrentFolder } = useCurrentFolder(node.id);

  const handleDoubleClick = () => {
    if (node.url) {
      window.open(node.url);
    } else {
      dispatch(openFolderNode(node.id));
      setCurrentFolder(); 
    }
  };  

  return (
    <NodeListItemLink node={node} handleDoubleClick={handleDoubleClick}/>
  );
};

export default NodeListItemContainer;