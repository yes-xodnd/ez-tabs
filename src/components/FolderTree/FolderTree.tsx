import { useTypedSelector } from "src/hooks";
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
  min-width: 200px;
  max-width: 250px;
  border-radius: 1rem;
  padding: 1rem;
  background: white;
`;