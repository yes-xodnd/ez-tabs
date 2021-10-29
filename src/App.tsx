import { useEffect } from 'react';
import styled from 'styled-components';
import { getTree } from 'src/store/modules/bookmarksSlice';
import { useTypedDispatch } from './hooks';
import BookmarksWindow from './windows/BookmarksWindow';
import TabsWindow from './windows/TabsWindow';
import SideMenuContainer from './components/SideMenu/SideMenuContainer';

function App() {
  const dispatch = useTypedDispatch();
  useEffect(() => { dispatch(getTree()) }, [dispatch]);

  return (
    <Wrapper className="App">
      <SideMenuContainer />

      <Windows>
        <BookmarksWindow />
        <TabsWindow />
      </Windows>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Windows = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem 2rem;
`