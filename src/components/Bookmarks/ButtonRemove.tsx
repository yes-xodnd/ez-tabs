import { useTypedDispatch } from "src/hooks";
import { removeChecked } from "src/store/modules/bookmarksSlice";
import { Delete } from '@styled-icons/material-outlined';
import ToolbarButton from 'src/components/UI/ToolbarButton';


const ButtonRemove = () => {
  const dispatch = useTypedDispatch();

  return (
    <ToolbarButton 
      title='선택 항목 삭제'
      handleClick={() => dispatch(removeChecked())}
      Icon={Delete}
      />
  );
};

export default ButtonRemove;