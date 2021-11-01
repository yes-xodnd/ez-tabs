import Checkbox from 'src/components/UI/Checkbox';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { toggleCheck } from 'src/store/modules/tabsSlice';

interface Props {
  id?: number;
  prevent?: boolean;
}

const TabCheckbox = ({ id, prevent = false }: Props) => {
  const { checkedTabIds } = useTypedSelector(state => state.tabs);
  const dispatch = useTypedDispatch();
  
  const isChecked = !!id && checkedTabIds.includes(id);
  const handleChange = () => {
    if (prevent) return;
    id && dispatch(toggleCheck(id));
  }

  return (
    <Checkbox isChecked={isChecked} handleChange={handleChange}  />
  );
};

export default TabCheckbox;