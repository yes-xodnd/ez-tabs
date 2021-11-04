import styled from 'styled-components';

import WindowWrapper from 'src/components/UI/WindowWrapper';
import WindowHeader from 'src/components/UI/WindowHeader';
import Toolbar from 'src/components/Bookmarks/BookmarksToolbar';
import FolderTree from 'src/components/FolderTree/FolderTree';
import NodeListContainer from 'src/components/NodeList/NodeListContainer';

const BookmarksWindow = () => {

  return (
    <WindowWrapper windowType={'BOOKMARKS'} >
      <WindowHeader title='북마크' windowType={'BOOKMARKS'} />
      <Toolbar />
      <ContentContainer>
        <FolderTree />
        <NodeListContainer />
      </ContentContainer>
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