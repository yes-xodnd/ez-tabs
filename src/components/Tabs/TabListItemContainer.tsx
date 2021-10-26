import { ChangeEventHandler, useContext } from "react";
import { checkContext } from "src/components/Tabs/TabListContainer";
import Checkbox from "src/components/UI/Checkbox";
import TabListItem from './TabListItem';
import api from 'src/api';
import styled from "styled-components";

interface Props {
  tab: chrome.tabs.Tab;
}

const TabListItemContainer = ({ tab }: Props) => {
  const { checkedItems, setCheckedItems } = useContext(checkContext);
  const id = (tab.id as number).toString();
  
  const isChecked = checkedItems.includes(id);
  const toggleChecked = () => setCheckedItems([ id ], !isChecked);
  const closeTab = () => { tab.id && api.tabs.remove(tab.id); }
  
  const checkbox = <Checkbox isChecked={isChecked} handleChange={toggleChecked} />;
  

  return (
    <div onClick={toggleChecked}>
      <TabListItem tab={tab} checkbox={checkbox} closeTab={closeTab} />
    </div>
  );
};

export default TabListItemContainer;