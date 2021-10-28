import { BookmarkNode } from "src/constants/types";
import { useFocus, useFolderOpen } from "src/hooks";
import NodeListItemLink from './NodeListItemLink';
import NodeListItemDirectory from './NodeListItemDirectory';
import styled from "styled-components";

interface Props {
  node: BookmarkNode;
}

const NodeListItemContainer = ({ node }: Props) => {  
  const { setFocus } = useFocus(node.id);
  const { toggleOpen } = useFolderOpen(node.id);

  const handleDoubleClick = () => {
    setFocus();
    toggleOpen();
  }

  return (
    <Wrapper>
      {
        node.url
        ? <NodeListItemLink 
            node={node} 
            handleDoubleClick={() => window.open(node.url)} />
        : <NodeListItemDirectory 
            node={node} 
            handleDoubleClick={handleDoubleClick} />
      }
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