import { BookmarkNode } from 'src/constants/types';
import styled from 'styled-components';
import NodeListItemContainer from './NodeListItemContainer';
import { NodeContentContainer } from './NodeListItem';
import { ArrowUpward } from '@styled-icons/material-outlined';

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
          <div>상위 폴더로 이동</div>
        </NodeContentContainer>
      }
      {
        !!nodes.length &&
        nodes.map(childNode => (
          <NodeListItemContainer key={childNode.id} node={childNode}/>
        ))
      }    
    </Wrapper>
  );
};

export default NodeList;

const Wrapper = styled.div`
  min-width: 300px;
  width: 30%;
  max-width: 30%;
  border-radius: 1rem;
  padding: 1rem;
  background: white;
`;