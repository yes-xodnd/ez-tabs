import styled from 'styled-components';
import { useInitData } from './hooks';  

import BookmarksWindow from './windows/BookmarksWindow';
import TabsWindow from './windows/TabsWindow';
import Menubar from './components/Menubar/MenuContainer';

function App() {
  useInitData();

  return (
    <Wrapper>
      <Menubar />
      
      <Windows>
        <TabsWindow />
        <BookmarksWindow />
      </Windows>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  height: 600px;
`;

const Windows = styled.div`
  flex-grow: 2;
  height: 100%;

  display: flex;
  justify-content: center;
  gap: 1rem;
`