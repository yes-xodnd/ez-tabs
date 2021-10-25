import { BookmarkNode } from "src/constants/types";
import { useTypedDispatch } from "src/hooks";
import { selectDir } from "src/store/modules/bookmarksSlice";
import NodeListItemLink from './NodeListItemLink';
import NodeListItemDirectory from './NodeListItemDirectory';
import styled from "styled-components";

interface Props {
  node: BookmarkNode;
}

const NodeListItemContainer = ({ node }: Props) => {  
  const dispatch = useTypedDispatch();

  return (
    <Wrapper>
      {
        node.url
        ? <NodeListItemLink 
            node={node} 
            handleDoubleClick={() => window.open(node.url)} />
        : <NodeListItemDirectory 
            node={node} 
            handleDoubleClick={() => dispatch(selectDir(node.id))} />
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