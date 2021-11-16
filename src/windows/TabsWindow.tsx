import styled from 'styled-components';
import { useTypedSelector } from 'src/hooks';
import { customScroll } from 'src/style';

import WindowWrapper from 'src/components/UI/WindowWrapper';
import Toolbar from 'src/components/Tabs/TabsToolbar';
import TabList from 'src/components/Tabs/TabList';

const TabsWindow = () => {
  const tabs = useTypedSelector(state => state.tabs.tabs);

  return (    
    <WindowWrapper windowType="TABS">
      <Toolbar />
      <ContentWrapper>
        <TabList tabs={tabs} />
      </ContentWrapper>
    </WindowWrapper>
  );
};

export default TabsWindow;

const ContentWrapper = styled.div`
  flex-grow: 2;
  padding: 15px;
  overflow-y: auto;
  border-bottom: 1px solid lightgrey;
  z-index: 1;

  ${ customScroll }
`