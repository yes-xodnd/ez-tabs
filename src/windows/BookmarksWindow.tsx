import styled from 'styled-components';
import { WindowWrapper } from 'src/style';

import WindowHeader from 'src/components/UI/WindowHeader';
import Toolbar from 'src/components/Bookmarks/BookmarksToolbar';
import FolderTree from 'src/components/FolderTree/FolderTree';
import NodeListContainer from 'src/components/NodeList/NodeListContainer';

const BookmarksWindow = () => {

  return (
    <Wrapper>
      <WindowHeader title='북마크' windowType={'BOOKMARKS'} />
      <Toolbar />
      <ContentContainer>
        <FolderTree />
        <NodeListContainer />
      </ContentContainer>
    </Wrapper>
  );
};

export default BookmarksWindow;

const Wrapper = styled(WindowWrapper)`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 2;
  overflow: hidden;
  border-radius: 5px;
`;