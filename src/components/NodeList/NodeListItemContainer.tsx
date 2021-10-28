import { BookmarkNode } from "src/constants/types";
import { useFolderFocus, useFolderOpen } from "src/hooks";
import NodeListItemLink from './NodeListItem';
import styled from "styled-components";

interface Props {
  node: BookmarkNode;
}

const NodeListItemContainer = ({ node }: Props) => {  
  const { setFocus } = useFolderFocus(node.id);
  const { toggleOpen } = useFolderOpen(node.id);

  const handleDoubleClick = () => {
    if (node.url) {
      window.open(node.url);
    } else {
      setFocus(); 
      toggleOpen();
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