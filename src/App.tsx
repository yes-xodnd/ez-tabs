import { useEffect } from 'react';
import styled from 'styled-components';
import { getTree } from 'src/store/modules/bookmarksSlice';
import { useTypedDispatch } from './hooks';
import DirectoryListContainer from './components/DirectoryList/DirectoryListContainer';
import NodeListContainer from './components/NodeList/NodeListContainer';
import TabListContainer from './components/Tabs/TabListContainer';

function App() {
  const dispatch = useTypedDispatch();
  useEffect(() => { dispatch(getTree()) }, [dispatch]);

  return (
    <Wrapper className="App">
      <DirectoryListContainer />
      <NodeListContainer />
      <TabListContainer />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.main`
  display: flex;
  height: 100%;
  padding: 1rem;
  gap: 1rem;

  & > div {
    box-shadow: 0 0 5px lightgrey;
  }
`;