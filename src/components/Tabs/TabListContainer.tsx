import { useEffect } from 'react';
import { onTabsChange } from 'src/api';
import { getTabs } from 'src/store/modules/tabsSlice';
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


  return (
    <TabList tabs={tabs} />
  );
};

export default TabListContainer;