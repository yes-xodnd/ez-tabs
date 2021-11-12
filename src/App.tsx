import styled from 'styled-components';
import { useTypedSelector, useInitData } from './hooks';  

import BookmarksWindow from './windows/BookmarksWindow';
import TabsWindow from './windows/TabsWindow';
import SearchWindow from './windows/SearchWindow';
import Menubar from './components/Menubar/MenuContainer';

function App() {
  useInitData();
  const isPopup = useTypedSelector(state => state.interfaces.isPopup);

  return (
    <Wrapper isPopup={isPopup}>
      <Menubar isPopup={isPopup} />
      
      <Windows isPopup={isPopup}>
        <TabsWindow />
        <BookmarksWindow />
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