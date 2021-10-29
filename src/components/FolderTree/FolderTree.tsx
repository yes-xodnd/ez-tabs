import { useTypedSelector } from "src/hooks";
import { customScroll } from "src/style";
import styled from "styled-components";
import FolderListNode from "./FolderTreeNode";

const FolderTree = () => {
  const { rootNode } = useTypedSelector(state => state.bookmarks);

  return (
    <Wrapper>
      {
        rootNode.children &&
        rootNode.children
        .map(node => <FolderListNode node={node} key={node.id} />)
      }
    </Wrapper>
  ); 
};

export default FolderTree;

const Wrapper = styled.div`
  ${ customScroll }

  min-width: 200px;
  max-width: 250px;
  padding-right: 1rem;
  border-right: 1px solid lightgrey;
  overflow-y: scroll;
`;