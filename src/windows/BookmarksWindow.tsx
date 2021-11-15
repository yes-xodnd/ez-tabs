import styled from 'styled-components';
import { useSearchKeyHandlers, useTypedSelector } from 'src/hooks';

import WindowWrapper from 'src/components/UI/WindowWrapper';
import Toolbar from 'src/components/Bookmarks/BookmarksToolbar';
import FolderTree from 'src/components/FolderTree/FolderTree';
import NodeListContainer from 'src/components/NodeList/NodeListContainer';
import SearchResult from 'src/components/Search/SearchResult';
import { useTreeKeyHandlers } from 'src/hooks/bookmarks';


const BookmarksWindow = () => {
  const view = useTypedSelector(state => state.bookmarks.view);
  const searchKeyHandlers = useSearchKeyHandlers();
  const treeKeyHandlers = useTreeKeyHandlers();

  const keyHandlers = view === 'SEARCH'
    ? searchKeyHandlers
    : treeKeyHandlers;

  return (
    <WindowWrapper windowType={'BOOKMARKS'} keyHandlers={keyHandlers}>
      <Toolbar />
      {
        view === 'SEARCH'
        ? <SearchResult />
        : <ContentContainer>
            <FolderTree />
            <NodeListContainer />
          </ContentContainer>
      }
    </WindowWrapper>
  );
};

export default BookmarksWindow;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 2;
  overflow: hidden;
  border-radius: 5px;
`;