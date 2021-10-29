import { WindowWrapper } from 'src/style';
import TabListContainer from 'src/components/Tabs/TabListContainer';
import WindowHeader from 'src/components/UI/WindowHeader';
import { useWindow } from 'src/hooks';
import { WindowTypes } from 'src/constants/types';
import styled from 'styled-components';

const TabsWindow = () => {
  const windowType: WindowTypes = 'TABS';
  const { isActive, hideWindow } = useWindow(windowType);

  return (
    <>
      {
        isActive &&
        <Wrapper>
          <WindowHeader title={'탭 관리'} hideWindow={hideWindow} />
          <TabListContainer />
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