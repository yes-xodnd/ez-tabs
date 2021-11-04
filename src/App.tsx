import { useEffect } from 'react';
import styled from 'styled-components';

import {
  useTypedDispatch,
  useTypedSelector,
  useKeyboard
} from './hooks';
import { getTree } from 'src/store/modules/bookmarksSlice';
import { getTabs } from 'src/store/modules/tabsSlice';
import { addTabsChangeListener } from 'src/api';

import BookmarksWindow from './windows/BookmarksWindow';
import TabsWindow from './windows/TabsWindow';
import SearchWindow from './windows/SearchWindow';
import Menubar from './components/Menubar/MenuContainer';

function App() {
  const dispatch = useTypedDispatch();
  const { isPopup } = useTypedSelector(state => state.interfaces);
  
  useEffect(() => { 
    dispatch(getTree());
    dispatch(getTabs());
    addTabsChangeListener(() => dispatch(getTabs()));
  }, [dispatch]);

  useKeyboard();

  return (
    <Wrapper className="App" isPopup={isPopup}>
      <Menubar isPopup={isPopup} />
      
      <Windows isPopup={isPopup}>
        <BookmarksWindow />
        <TabsWindow />
        <SearchWindow />
      </Windows>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div<{ isPopup: boolean }>`
  ${props => !props.isPopup && 'display: flex;'} 
  height: 100%;
`;

const Windows = styled.div<{ isPopup: boolean }>`
  flex-grow: 2;
  height: 100%;
  padding: 1.5rem 5%;

  display: flex;
  justify-content: center;
  gap: 1rem;

  ${props => props.isPopup && `
    padding: 0;
    max-height: 560px;
  `}
`