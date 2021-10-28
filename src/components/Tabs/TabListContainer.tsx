import { useEffect } from 'react';
import { onTabsChange } from 'src/api';
import { createFromTabs } from 'src/store/modules/bookmarksSlice';
import { getTabs, clear } from 'src/store/modules/tabsSlice';
import TabList from './TabList';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';

const TabListContainer = () => {
  const { tabs } = useTypedSelector(state => state.tabs);
  const dispatch = useTypedDispatch();
  
  useEffect(() => {
    const updateTabs = () => dispatch(getTabs());
    onTabsChange(updateTabs);
    updateTabs();
  }, [ dispatch ]);

  const addBookmarks = () => { 
    dispatch(createFromTabs());
    dispatch(clear());
  }

  return (
    <TabList tabs={tabs} addBookmarks={addBookmarks} />
  );
};

export default TabListContainer;