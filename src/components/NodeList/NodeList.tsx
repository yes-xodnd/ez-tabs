import styled from 'styled-components';
import { customScroll } from 'src/style';
import NodeListItemContainer from './NodeListItemContainer';
import { useCurrentFolderNode } from 'src/hooks/nodeList';
import { useTypedSelector } from 'src/hooks';
import ButtonToParentNode from './ButtonToParentNode';

const NodeList = () => {
  const currentFolderNode = useCurrentFolderNode();
  const nodes = useTypedSelector(state => state.nodeList.nodes);

  return (
    <Wrapper>
      {
        currentFolderNode?.parentId && 
        <ButtonToParentNode />
      }
      {
        !!nodes.length &&
        nodes
        .map((node, index) => (
          <NodeListItemContainer node={node} index={index} key={node.id} />
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