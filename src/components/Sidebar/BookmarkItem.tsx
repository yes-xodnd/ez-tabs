import { BookmarkNode } from "src/constants/types";

interface Props {
  node: BookmarkNode;
}

const BookmarkItem = ({ node }: Props) => {
  
  return (
    <div>
      <div>{ node.title }</div>
      <div>
      { node.children?.length &&
        node.children
        .map(childNode => <BookmarkItem node={childNode} key={childNode.id} />) }
      </div>
    </div>  
  );  
}

export default BookmarkItem;