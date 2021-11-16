import { Save } from '@styled-icons/material-outlined';
import { useTypedSelector } from 'src/hooks';
import ToolbarButton from '../UI/ToolbarButton';
import { useSnapshotTabs } from 'src/hooks/tabs';

const ButtonSnapshot = () => {
  const disabled = useTypedSelector(state => !state.tabs.checkedTabIds.length);
  const snapshotTabs = useSnapshotTabs();
  const handleClick = () => !disabled && snapshotTabs();

  return (
    <ToolbarButton
      title='save checked tabs in bookmark (Ctrl+Enter)'
      handleClick={handleClick}
      Icon={Save}
      disabled={disabled}
      />
  );
};

export default ButtonSnapshot;