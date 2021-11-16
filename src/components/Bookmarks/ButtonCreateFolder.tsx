import { CreateNewFolder } from '@styled-icons/material-outlined';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { createFolder } from 'src/store/modules/bookmarksSlice';
import ToolbarButton from "../UI/ToolbarButton";

const ButtonCreateFolder = () => {
  const disabled = useTypedSelector(state => state.bookmarks.view === 'SEARCH');
  const dispatch = useTypedDispatch();

  const handleClick = () => dispatch(createFolder());

  return (
    <ToolbarButton 
      title={'New Folder (Ctrl + Insert)'}
      Icon={CreateNewFolder}
      handleClick={handleClick}
      disabled={disabled}
      />
  );
};

export default ButtonCreateFolder;

