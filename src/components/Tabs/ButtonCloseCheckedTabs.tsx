import { Delete } from '@styled-icons/material-outlined';
import ToolbarButton from 'src/components/UI/ToolbarButton';
import { useCloseCheckedTabs } from 'src/hooks/tabs';


const ButtonRemoveCheckedTabs = () => {
  const handleClick = useCloseCheckedTabs();

  return (
    <ToolbarButton 
      title="close checked tabs (Ctrl + Delete)"
      handleClick={handleClick}
      Icon={Delete}
      />
  );
};

export default ButtonRemoveCheckedTabs;