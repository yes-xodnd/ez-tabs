import { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { getTabs } from 'src/store/modules/tabsSlice';
import { onTabsChange } from 'src/api';
import TabList from './TabList';
import TabGrid from './TabGrid';

const TabsContainer = ({ isListView }: { isListView: boolean }) => {
  const { tabs } = useTypedSelector(state => state.tabs);
  const dispatch = useTypedDispatch();
  
  useEffect(() => {
    const updateTabs = () => dispatch(getTabs());
    onTabsChange(updateTabs);
    updateTabs();
  }, [ dispatch ]);


  return (
    <>
      {
        isListView
        ? <TabList tabs={tabs} />
        : <TabGrid tabs={tabs} />
      }
    </>
  );
};

export default TabsContainer;