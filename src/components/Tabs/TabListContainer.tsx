import { Tab } from 'src/constants/types';
import { useEffect, useState } from 'react';
import api, { onTabsChange } from 'src/api';
import TabList from './TabList';

const TabsContainer = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  
  useEffect(() => {
    const updateTabs = () => api.tabs.query({}).then(setTabs);
    onTabsChange(updateTabs);
    updateTabs();
  }, []);

  return (
    <TabList tabs={tabs} />
  );
};

export default TabsContainer;