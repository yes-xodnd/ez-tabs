import { Delete } from '@styled-icons/material-outlined';
import ToolbarButton from 'src/components/UI/ToolbarButton';
import { useCloseCheckedTabs } from 'src/hooks/Tabs';


const ButtonRemoveCheckedTabs = () => {
  const handleClick = useCloseCheckedTabs();

  return (
    <ToolbarButton 
      title="선택 탭 닫기"
      handleClick={handleClick}
      Icon={Delete}
      />
  );
};

export default ButtonRemoveCheckedTabs;