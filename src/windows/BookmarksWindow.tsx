import styled from 'styled-components';
import { WindowTypes } from 'src/constants/types';
import { WindowWrapper } from 'src/style';
import { useWindow } from 'src/hooks';

import WindowHeader from 'src/components/UI/WindowHeader';
import Toolbar from 'src/components/Bookmarks/BookmarksToolbar';
import FolderTree from 'src/components/FolderTree/FolderTree';
import NodeListContainer from 'src/components/NodeList/NodeListContainer';

const BookmarksWindow = () => {
  const windowType: WindowTypes = 'BOOKMARKS';
  const { isActive, hideWindow } = useWindow(windowType);

  return (
    <>
    {
      isActive && 
      <Wrapper>
        <WindowHeader title={'북마크'} hideWindow={hideWindow} />
        <Toolbar />
        <ContentContainer>
          <FolderTree />
          <NodeListContainer />
        </ContentContainer>
      </Wrapper>
    }
    </>
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
  gap: 1rem;
  overflow: hidden;
  border-radius: 5px;
`;