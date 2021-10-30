import { BookmarkNode } from "src/constants/types";
import { useCurrentFolder, useTypedDispatch, useTypedSelector } from "src/hooks";
import { openFolderNode, selectIsChecked, toggleCheck } from "src/store/modules/bookmarksSlice";
import NodeListItem from './NodeListItem';
import Checkbox from 'src/components/UI/Checkbox';

interface Props {
  node: BookmarkNode;
}

const NodeListItemContainer = ({ node }: Props) => {  
  const dispatch = useTypedDispatch();
  const { setCurrentFolder } = useCurrentFolder(node.id);
  const isChecked = useTypedSelector(state => selectIsChecked(state, node.id));

  const handleDoubleClick = () => {
    if (node.url) {
      window.open(node.url);
    } else {
      dispatch(openFolderNode(node.id));
      setCurrentFolder(); 
    }
  };  

  const checkbox = <Checkbox 
    isChecked={isChecked}
    handleChange={() => { dispatch(toggleCheck(node.id)) }}
    />

  return (
    <NodeListItem 
      node={node} 
      handleDoubleClick={handleDoubleClick}
      checkbox={checkbox}
      />
  );
};

export default NodeListItemContainer;