import { useTypedDispatch } from "src/hooks";
import { removeChecked } from "src/store/modules/bookmarksSlice";
import { Delete } from '@styled-icons/material-outlined';
import ToolbarButton from 'src/components/UI/ToolbarButton';


const ButtonRemove = () => {
  const dispatch = useTypedDispatch();

  return (
    <ToolbarButton 
      title='remove checked bookmarks (Ctrl + Delete)'
      handleClick={() => dispatch(removeChecked())}
      Icon={Delete}
      />
  );
};

export default ButtonRemove;