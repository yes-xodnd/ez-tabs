import styled from 'styled-components';
import { WindowTypes } from 'src/constants/types';
import { useIsActiveWindow, useToggle, useTypedSelector } from 'src/hooks';
import { WindowWrapper, customScroll } from 'src/style';

import WindowHeader from 'src/components/UI/WindowHeader';
import Toolbar from 'src/components/Tabs/TabsToolbar';
import TabGrid from 'src/components/Tabs/TabGrid';
import TabList from 'src/components/Tabs/TabList';
import ButtonAdd from 'src/components/Tabs/ButtonAdd';

const TabsWindow = () => {
  const windowType: WindowTypes = 'TABS';
  
  const [ isListView, toggleView ] = useToggle(true);
  const tabs = useTypedSelector(state => state.tabs.tabs);
  const isActive = useIsActiveWindow(windowType);

  return (
    <>
      {
        isActive &&
        <Wrapper>
          <WindowHeader title={'탭'} windowType={windowType} />
          <Toolbar isListView={isListView} toggleView={toggleView} />

          <ContentWrapper isListView={isListView}>
            {
              isListView
              ? <TabList tabs={tabs} />
              : <TabGrid tabs={tabs} />

            }
          </ContentWrapper>

          <ButtonAdd  />
        </Wrapper>
      }
    </>
  );
};

export default TabsWindow;

const Wrapper = styled(WindowWrapper)`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div<{ isListView: boolean }>`
  flex-grow: 2;
  padding: 1rem;
  overflow-y: auto;
  border-bottom: 1px solid lightgrey;
  background-color: ${props => props.isListView ? 'white' : props.theme.colors.hover};
  z-index: 1;

  ${ customScroll }
`