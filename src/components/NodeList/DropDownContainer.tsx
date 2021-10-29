import { BookmarkNode } from "src/constants/types";
import { useTypedDispatch } from "src/hooks";
import { remove } from 'src/store/modules/bookmarksSlice';
import Dropdown from "src/components/UI/Dropdown";

interface Props {
  node: BookmarkNode;
  handleClickRename: () => void;
  closeDropDown: () => void;
}

const DropDownContainer = ({ node, handleClickRename, closeDropDown }: Props) => {
  const dispatch = useTypedDispatch();
  
  const wrap = (fn: () => void) => () => {
    fn();
    closeDropDown();
  };

  const createMenuItem = (title: string, handler: () => void) => {
    return {
      title,
      handleClick: wrap(handler)
    };
  };

  const menuItems = [
    createMenuItem('수정', handleClickRename),
    createMenuItem('삭제', () => dispatch(remove(node))),
  ];

  return (
    <Dropdown menuItems={menuItems} />
  );
};

export default DropDownContainer;