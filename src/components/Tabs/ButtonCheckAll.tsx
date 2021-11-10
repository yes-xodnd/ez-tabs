import { CheckBox, CheckBoxOutlineBlank } from '@styled-icons/material-outlined';
import ToolbarButton from "src/components/UI/ToolbarButton";
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { checkAll, clearCheck, selectAllChecked } from 'src/store/modules/tabsSlice';


const ButtonCheckAll = () => {
  const isAllChecked = useTypedSelector(selectAllChecked);
  const dispatch = useTypedDispatch();

  const handleClick = () => {
    isAllChecked ? dispatch(clearCheck()) : dispatch(checkAll());
  };

  return (
    <ToolbarButton 
      title={isAllChecked ? '전체 취소' : '전체 선택'}
      handleClick={handleClick}
      Icon={isAllChecked ? CheckBoxOutlineBlank : CheckBox}
      /> 
  );
};

export default ButtonCheckAll;