import { useEffect, useState } from "react";
import { BookmarkNode } from "src/constants/types";
import { useTypedSelector } from "src/hooks";
import NodeList from './NodeList';
import api from 'src/api';

const NodeListContainer = () => {
  const { selectedDirId } = useTypedSelector(({ bookmarks }) => bookmarks);
  const [nodeList, setNodeList] = useState<BookmarkNode[]>([]);
  
  useEffect(() => {
    api.bookmarks
    .get(selectedDirId)
    .then(([ node ]) => node && setNodeList(node.children as BookmarkNode[]));
  }, [ selectedDirId ]);

  return <NodeList nodes={nodeList} />;
};

export default NodeListContainer;