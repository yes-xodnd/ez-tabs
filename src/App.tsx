import { useEffect } from 'react';
import styled from 'styled-components';
import { getTree } from 'src/store/modules/bookmarksSlice';
import { useTypedDispatch } from './hooks';
import FolderTree from './components/FolderTree/FolderTree';
import NodeListContainer from './components/NodeList/NodeListContainer';
import TabListContainer from './components/Tabs/TabListContainer';
import SideMenuContainer from './components/SideMenu/SideMenuContainer';

function App() {
  const dispatch = useTypedDispatch();
  useEffect(() => { dispatch(getTree()) }, [dispatch]);

  return (
    <Wrapper>
    <SideMenuContainer />
    <WindowsWrapper className="App">
      <FolderTree />
      <NodeListContainer />
      <TabListContainer />
    </WindowsWrapper>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const WindowsWrapper = styled.main`
  display: flex;
  height: 100%;
  padding: 1rem;
  gap: 1rem;

  & > div {
    box-shadow: 0 0 5px lightgrey;
  }
`;