import { useEffect } from 'react';
import styled from 'styled-components';

import { getTree } from 'src/store/modules/bookmarksSlice';
import { getTabs } from 'src/store/modules/tabsSlice';
import { useIsActiveWindow, useTypedDispatch } from './hooks';
import { addTabsChangeListener } from 'src/api';

import BookmarksWindow from './windows/BookmarksWindow';
import TabsWindow from './windows/TabsWindow';
import SideMenu from './components/SideMenu/SideMenuContainer';


function App() {
  const dispatch = useTypedDispatch();
  const isActive = useIsActiveWindow();
  
  useEffect(() => { 
    dispatch(getTree());
    dispatch(getTabs());
    addTabsChangeListener(() => dispatch(getTabs()));  
  }, [dispatch]);

  return (
    <Wrapper className="App">
      <SideMenu />

      <Windows>
        { isActive('BOOKMARKS') && <BookmarksWindow /> }
        { isActive('TABS') && <TabsWindow /> }
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