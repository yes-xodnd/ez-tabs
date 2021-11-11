import { useTypedSelector } from 'src/hooks';
import { customScroll } from 'src/style';
import styled from 'styled-components';
import SearchResultItem from './SearchResultItem';

const SearchResult = () => {
  const nodeList = useTypedSelector(state => state.search.nodeList);

  return (
    <Wrapper>
      { nodeList.map((node, index) => 
        <SearchResultItem { ...{ node, index, key: node.id } } />) }
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