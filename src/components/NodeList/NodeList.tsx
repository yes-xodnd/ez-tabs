import { BookmarkNode } from 'src/constants/types';
import styled from 'styled-components';
import NodeListItem from './NodeListItem';
import { NodeContentContainer } from './NodeListItem';
import { ArrowUpward } from '@styled-icons/material-outlined';
import { customScroll } from 'src/style';

interface Props {
  currentFolderNode: BookmarkNode | undefined;
  toParentNode: () => void;
}

const NodeList = ({ currentFolderNode, toParentNode }: Props) => {
  const nodes = currentFolderNode?.children || [];

  return (
    <Wrapper>
      {
        currentFolderNode?.parentId && 
        <NodeContentContainer onClick={toParentNode}>
          <ArrowUpward size="16" />
          <div></div>
          <div>상위 폴더</div>
        </NodeContentContainer>
      }
      {
        !!nodes.length &&
        nodes
        .filter(node => !node.url)
        .map(node => (
          <NodeListItem node={node} key={node.id} />
        ))
      }
      {
        !!nodes.length &&
        nodes
        .filter(node => node.url)
        .map(node => (
          <NodeListItem node={node} key={node.id} />
        ))
      }   
    </Wrapper>
  );
};

export default NodeList;

const Wrapper = styled.div`
  ${ customScroll }

  padding: 1rem;
  flex-grow: 2;
  width: 400px;
  overflow-x: hidden;
  overflow-y: auto;
`;