import { BookmarkNode } from "src/constants/types";
import BookmarkItem from "./BookmarkItem";

interface Props {
  rootNode: BookmarkNode;
}

const Sidebar = ({ rootNode }: Props) => {
  
  return (
    <BookmarkItem node={rootNode} />
  ); 
};

export default Sidebar;