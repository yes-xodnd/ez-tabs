import Checkbox from "src/components/UI/Checkbox";
import TabListItem from './TabListItem';
import api from 'src/api';
import { useTypedSelector, useTypedDispatch } from 'src/hooks';
import { toggleCheck as toggleCheckAction } from 'src/store/modules/tabsSlice';

interface Props {
  tab: chrome.tabs.Tab;
}

const TabListItemContainer = ({ tab }: Props) => {
  const { checkedTabIds } = useTypedSelector(state => state.tabs);
  const dispatch = useTypedDispatch();
  const id = tab.id as number;

  const isChecked = checkedTabIds.includes(id);
  const toggleCheck = () => dispatch(toggleCheckAction(id));
  const closeTab = () => { tab.id && api.tabs.remove(tab.id); };
  
  const checkbox = <Checkbox isChecked={isChecked} handleChange={() => { }} />;
  

  return (
    <div onClick={toggleCheck}>
      <TabListItem tab={tab} checkbox={checkbox} closeTab={closeTab} />
    </div>
  );
};

export default TabListItemContainer;