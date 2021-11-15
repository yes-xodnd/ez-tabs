import styled from 'styled-components';
import { useInitData, useHotkeys, useCombinedKeyHandlers, useAutoFocusRef } from './hooks';

import BookmarksWindow from './windows/BookmarksWindow';
import TabsWindow from './windows/TabsWindow';
import Menubar from './components/Menubar/Menubar';

function App() {
  useInitData();
  const keyHandlers = useCombinedKeyHandlers();
  const handleKeyDown = useHotkeys(keyHandlers);
  const ref = useAutoFocusRef<HTMLDivElement>();

  return (
    <Wrapper tabIndex={-1} onKeyDown={handleKeyDown} ref={ref}>
      <Menubar />
      <TabsWindow />
      <BookmarksWindow />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  height: 600px;
  overflow: hidden;
  &:focus {
    outline: 1px solid black;
  }
`;