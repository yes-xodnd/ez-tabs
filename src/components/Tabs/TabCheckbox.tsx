import Checkbox from 'src/components/UI/Checkbox';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { toggleCheck } from 'src/store/modules/tabsSlice';

interface Props {
  id?: number;
  prevent?: boolean;
}

const TabCheckbox = ({ id, prevent = false }: Props) => {
  const isChecked = useTypedSelector(state => 
    !!id && state.tabs.checkedTabIds.includes(id));
  const dispatch = useTypedDispatch();

  return (
    <Checkbox 
      isChecked={isChecked} 
      handleChange={() => { !prevent && id && dispatch(toggleCheck(id)) }}
      />
  );
};

export default TabCheckbox;