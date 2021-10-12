import { BookmarkNode } from "src/constants/types";
import DirectoryListItem from "./DirectoryListItem";

interface Props {
  rootNode: BookmarkNode;
}

const Sidebar = ({ rootNode }: Props) => {
  
  return (
    <DirectoryListItem node={rootNode} />
  ); 
};

export default Sidebar;