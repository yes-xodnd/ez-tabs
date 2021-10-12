import api from 'src/api';
import { useEffect, useState } from 'react';

import Sidebar from './components/Sidebar/Sidebar';
import { BookmarkNode } from './constants/types';

function App() {
  const [tree, setTree] = useState({} as BookmarkNode);

  useEffect(() => {
    api
      .getTree()
      .then(([ rootNode ]) => setTree(rootNode));
  }, []);

  return (
    <div className="App">
      <Sidebar rootNode={tree} />
    </div>
  );
}

export default App;
