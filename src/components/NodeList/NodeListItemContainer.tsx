import { BookmarkNode } from "src/constants/types";
import { useFolderFocus, useTypedDispatch } from "src/hooks";
import NodeListItemLink from './NodeListItem';
import styled from "styled-components";
import { openFolderNode } from "src/store/modules/bookmarksSlice";

interface Props {
  node: BookmarkNode;
}

const NodeListItemContainer = ({ node }: Props) => {  
  const dispatch = useTypedDispatch();
  const { setFocus } = useFolderFocus(node.id);

  const handleDoubleClick = () => {
    if (node.url) {
      window.open(node.url);
    } else {
      dispatch(openFolderNode(node.id));
      setFocus(); 
    }
  };  

  return (
    <Wrapper>
      <NodeListItemLink node={node} handleDoubleClick={handleDoubleClick}/>
    </Wrapper>
  );
};

export default NodeListItemContainer;

const Wrapper = styled.div`
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background-color: royalblue;
    color: white;
  }
`