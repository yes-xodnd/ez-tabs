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
      title={isAllChecked ? 'uncheck all (Ctrl + A)' : 'check all (Ctrl + A)'}
      handleClick={handleClick}
      Icon={isAllChecked ? CheckBoxOutlineBlank : CheckBox}
      /> 
  );
};

export default ButtonCheckAll;