import { BookmarkBorder } from '@styled-icons/material-outlined';
import { useTypedSelector } from 'src/hooks';
import ToolbarButton from '../UI/ToolbarButton';
import { useSnapshotTabs } from 'src/hooks/tabs';

const ButtonSnapshot = () => {
  const disabled = useTypedSelector(state => !state.tabs.checkedTabIds.length);
  const snapshotTabs = useSnapshotTabs();
  const handleClick = () => !disabled && snapshotTabs();

  return (
    <ToolbarButton
      title='북마크에 스냅샷 저장 (Ctrl+Enter)'
      handleClick={handleClick}
      Icon={BookmarkBorder}
      disabled={disabled}
      />
  );
};

export default ButtonSnapshot;