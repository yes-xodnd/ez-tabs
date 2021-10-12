import { BookmarkNode } from "src/constants/types";

interface Props {
  node: BookmarkNode;
}

const DirectoryListItem = ({ node }: Props) => {
  
  return (
    <div>
      <div>{ node.title }</div>
      <div>
      { node.children?.length &&
        node.children
        .filter(node => node.children)
        .map(childNode => <DirectoryListItem node={childNode} key={childNode.id} />) }
      </div>
    </div>  
  );  
}

export default DirectoryListItem;