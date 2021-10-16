import { BookmarkNode } from 'src/constants/types';
import styled from 'styled-components';
import NodeListItemContainer from './NodeListItemContainer';

interface Props {
  nodes: BookmarkNode[];
}

const NodeList = ({ nodes }: Props) => {

  return (
    <Wrapper>
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