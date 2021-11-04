import NodeListItem from 'src/components/NodeList/NodeListItem';
import { BookmarkNode } from 'src/constants/types';
import { customScroll } from 'src/style';
import styled from 'styled-components';

const SearchResult = ({ nodes }: { nodes: BookmarkNode[] }) => {

  return (
    <Wrapper>
      { nodes.map(node => <NodeListItem node={node} key={node.id} />) }
    </Wrapper>
  );
};

export default SearchResult;

const Wrapper = styled.div`
  flex-grow: 2;
  max-height: 100%;
  padding: 1rem;
  overflow-y: auto;
  ${ customScroll }
`;