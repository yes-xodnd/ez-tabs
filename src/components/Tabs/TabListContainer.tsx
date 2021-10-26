import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tab } from 'src/constants/types';

import useCheck, { createCheckContext } from 'src/hooks/useCheck';
import api, { onTabsChange } from 'src/api';
import { createFromTabs } from 'src/store/modules/bookmarksSlice';
import TabList from './TabList';

export const checkContext = createCheckContext();

const TabListContainer = () => {
  const [ tabs, setTabs ] = useState<Tab[]>([]);
  const [ checkedItems, setCheckedItems ] = useCheck(tabs);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const updateTabs = () => api.tabs.query({})
    .then(res => res.filter(tab => !tab.url?.match(/chrome:\/\/bookmarks/g)))
    .then(setTabs);
    onTabsChange(updateTabs);
    updateTabs();
  }, []);

  const addBookmarks = () => {
    const checkedTabs = checkedItems
      .map(id => tabs.find(tab => tab.id?.toString() === id)) as chrome.tabs.Tab[];
    console.log(checkedTabs);

    dispatch(createFromTabs(checkedTabs));
  };

  return (
    <checkContext.Provider value={{ checkedItems, setCheckedItems }}>
      <TabList tabs={tabs} addBookmarks={addBookmarks} />
    </checkContext.Provider>
  );
};

export default TabListContainer;