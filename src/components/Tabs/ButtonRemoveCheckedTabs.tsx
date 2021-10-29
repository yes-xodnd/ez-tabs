import { Delete } from '@styled-icons/material-outlined';
import ToolbarButton from 'src/components/UI/ToolbarButton';
import { useTypedDispatch } from 'src/hooks';
import { removeChecked } from 'src/store/modules/tabsSlice';


const ButtonRemoveCheckedTabs = () => {
  const dispatch = useTypedDispatch();

  return (
    <ToolbarButton 
      title="선택된 탭 닫기"
      handleClick={() => { dispatch(removeChecked()) }}
      Icon={Delete}
      />
  );
};

export default ButtonRemoveCheckedTabs;