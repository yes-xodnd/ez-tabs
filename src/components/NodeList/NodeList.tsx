import { BookmarkNode } from 'src/constants/types';
import styled from 'styled-components';
import { customScroll } from 'src/style';
import NodeListItemContainer from './NodeListItemContainer';
import ButtonToParentNode from './ButtonToParentNode';

interface Props {
  currentFolderNode: BookmarkNode | undefined;
}

const NodeList = ({ currentFolderNode }: Props) => {
  const nodes = currentFolderNode?.children || [];

  return (
    <Wrapper>
      {
        currentFolderNode?.parentId && 
        <ButtonToParentNode />
      }
      {
        !!nodes.length &&
        nodes
        .filter(node => !node.url)
        .map((node, index) => (
          <NodeListItemContainer node={node} index={index} key={node.id} />
        ))
      }
      {
        !!nodes.length &&
        nodes
        .filter(node => node.url)
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