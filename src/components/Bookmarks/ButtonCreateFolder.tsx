import { CreateNewFolder } from '@styled-icons/material-outlined';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { createFolder } from 'src/store/modules/bookmarksSlice';
import ToolbarButton from "../UI/ToolbarButton";

const ButtonCreateFolder = () => {
  const currentFolderNodeId = useTypedSelector(state => state.bookmarks.currentFolderNodeId);
  const dispatch = useTypedDispatch();

  const handleClick = () => {
    dispatch(createFolder({
      title: '새 폴더',
      parentId: currentFolderNodeId,
    }));
  }

  return (
    <ToolbarButton title={'새 폴더'} Icon={CreateNewFolder} handleClick={handleClick} />
  );
};

export default ButtonCreateFolder;

