import { CheckBox, CheckBoxOutlineBlank } from '@styled-icons/material-outlined';
import ToolbarButton from 'src/components/UI/ToolbarButton';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';

import { toggleCheckAll, selectIsAllChecked } from 'src/store/modules/nodeListSlice';

const ButtonCheckAll = () => {
  const isAllChecked = useTypedSelector(selectIsAllChecked);
  const dispatch = useTypedDispatch();
  const handleClick = () => dispatch(toggleCheckAll());

  return (
    <ToolbarButton 
      title={isAllChecked ? 'uncheck all (Ctrl + a)' : 'check all (Ctrl + a)'}
      handleClick={handleClick}
      Icon={isAllChecked ? CheckBoxOutlineBlank : CheckBox} />
  );
};

export default ButtonCheckAll;