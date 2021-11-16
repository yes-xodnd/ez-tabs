import { CheckBox, CheckBoxOutlineBlank } from '@styled-icons/material-outlined';
import ToolbarButton from 'src/components/UI/ToolbarButton';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { checkAll, uncheckAll, selectIsAllChecked } from 'src/store/modules/bookmarksSlice';

const ButtonSelectAll = () => {
  const currentFolderNodeId = useTypedSelector(state => state.bookmarks.currentFolderNodeId);
  const isAllChecked = useTypedSelector(selectIsAllChecked);
  const dispatch = useTypedDispatch();

  const handleClick = () => {
    if (currentFolderNodeId === '0') return;

    isAllChecked
    ? dispatch(uncheckAll())
    : dispatch(checkAll());
  }

  return (
    <ToolbarButton 
      title={isAllChecked ? 'uncheck all (Ctrl + a)' : 'check all (Ctrl + a)'}
      handleClick={handleClick}
      Icon={isAllChecked ? CheckBoxOutlineBlank : CheckBox} />
  );
};

export default ButtonSelectAll;