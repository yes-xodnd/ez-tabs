import styled from 'styled-components';
import { useGlobalHotkeys, useInitData, useGlobalKeyHandlers } from './hooks';  

import BookmarksWindow from './windows/BookmarksWindow';
import TabsWindow from './windows/TabsWindow';
import Menubar from './components/Menubar/Menubar';

function App() {
  useInitData();
  const keyHandlers = useGlobalKeyHandlers();
  useGlobalHotkeys(keyHandlers);

  return (
    <Wrapper>
      <Menubar />
      <TabsWindow />
      <BookmarksWindow />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  height: 600px;
`;