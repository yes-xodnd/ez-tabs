import { useEffect } from 'react';
import styled from 'styled-components';
import { getTree } from 'src/reducers/bookmarks';
import { useTypedDispatch } from './hooks';
import DirectoryListContainer from './components/DirectoryList/DirectoryListContainer';

function App() {
  const dispatch = useTypedDispatch();
  useEffect(() => { dispatch(getTree()) }, [dispatch]);

  return (
    <Wrapper className="App">
      <DirectoryListContainer />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.main`
  display: flex;
  max-height: 100vh;
  padding: 1rem;
  gap: 1rem;

  & > div {
    box-shadow: 0 0 5px lightgrey;
  }
`;