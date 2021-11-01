import { BookmarkNode } from 'src/constants/types';
import styled from 'styled-components';
import NodeListItem from './NodeListItem';
import { NodeContentContainer } from './NodeListItem';
import { ArrowUpward } from '@styled-icons/material-outlined';
import { customScroll } from 'src/style';

interface Props {
  node: BookmarkNode | undefined;
  toParentNode: () => void;
}

const NodeList = ({ node, toParentNode }: Props) => {
  const nodes = node?.children || [];

  return (
    <Wrapper>
      {
        node?.parentId && 
        <NodeContentContainer onClick={toParentNode}>
          <ArrowUpward size="16" />
          <div></div>
          <div>상위 폴더</div>
        </NodeContentContainer>
      }
      {
        !!nodes.length &&
        nodes
        .filter(childNode => !childNode.url)
        .map(childNode => (
          <NodeListItem key={childNode.id} node={childNode}/>
        ))
      }
      {
        !!nodes.length &&
        nodes
        .filter(childNode => childNode.url)
        .map(childNode => (
          <NodeListItem key={childNode.id} node={childNode}/>
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