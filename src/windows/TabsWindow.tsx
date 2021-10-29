import styled from 'styled-components';
import { WindowTypes } from 'src/constants/types';
import { useIsActiveWindow } from 'src/hooks';
import { WindowWrapper } from 'src/style';

import WindowHeader from 'src/components/UI/WindowHeader';
import Toolbar from 'src/components/Tabs/TabsToolbar';
import TabListContainer from 'src/components/Tabs/TabListContainer';
import ButtonAdd from 'src/components/Tabs/ButtonAdd';

const TabsWindow = () => {
  const windowType: WindowTypes = 'TABS';
  const isActive = useIsActiveWindow(windowType);

  return (
    <>
      {
        isActive &&
        <Wrapper>
          <WindowHeader title={'탭'} windowType={windowType} />
          <Toolbar />
          <TabListContainer />
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