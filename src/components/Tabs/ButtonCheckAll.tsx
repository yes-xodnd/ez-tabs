import { CheckBox, CheckBoxOutlineBlank } from '@styled-icons/material-outlined';
import ToolbarButton from "src/components/UI/ToolbarButton";
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { checkAll, clear, selectAllChecked } from 'src/store/modules/tabsSlice';


const ButtonCheckAll = () => {
  const isAllChecked = useTypedSelector(selectAllChecked);
  const dispatch = useTypedDispatch();

  const handleClick = () => {
    isAllChecked ? dispatch(clear()) : dispatch(checkAll());
  };

  return (
    <ToolbarButton 
      title={isAllChecked ? '전체 선택 취소' : '전체 선택'}
      handleClick={handleClick}
      Icon={isAllChecked ? CheckBoxOutlineBlank : CheckBox}
      /> 
  );
};

export default ButtonCheckAll;