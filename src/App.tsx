import { useEffect } from 'react';
import styled from 'styled-components';
import { getTree } from 'src/store/modules/bookmarksSlice';
import { getTabs } from 'src/store/modules/tabsSlice';
import { useTypedDispatch } from './hooks';
import { addTabsChangeListener } from 'src/api';

import BookmarksWindow from './windows/BookmarksWindow';
import TabsWindow from './windows/TabsWindow';
import SideMenu from './components/SideMenu/SideMenuContainer';


function App() {
  const dispatch = useTypedDispatch();
  
  useEffect(() => { 
    dispatch(getTree());
    dispatch(getTabs());
    addTabsChangeListener(() => dispatch(getTabs()));  
  }, [dispatch]);

  return (
    <Wrapper className="App">
      <SideMenu />

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