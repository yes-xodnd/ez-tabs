import { Tab } from 'src/constants/types';
import { useEffect, useState } from 'react';
import useCheck, { createCheckContext } from 'src/hooks/useCheck';
import api, { onTabsChange } from 'src/api';
import TabList from './TabList';

export const checkContext = createCheckContext();

const TabListContainer = () => {
  const [ tabs, setTabs ] = useState<Tab[]>([]);
  const [ checkedItems, setCheckedItems ] = useCheck(tabs);
  
  useEffect(() => {
    const updateTabs = () => api.tabs.query({}).then(setTabs);
    onTabsChange(updateTabs);
    updateTabs();
  }, []);

  return (
    <checkContext.Provider value={{ checkedItems, setCheckedItems }}>
      <TabList tabs={tabs} />
    </checkContext.Provider>
  );
};

export default TabListContainer;