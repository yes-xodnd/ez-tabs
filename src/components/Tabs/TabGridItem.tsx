import { Tab } from 'src/constants/types';
import styled from 'styled-components';

import { useCloseTab, useToggleCheckTab } from 'src/hooks/Tabs';

import Favicon from 'src/components/UI/Favicon';
import TabCheckbox from './TabCheckbox';
import Button from 'src/components/UI/Button';
import api from 'src/api';

const TabGridItem = ({ tab }: { tab: Tab }) => {
  const toggleCheck = useToggleCheckTab(tab.id);
  const closeTab = useCloseTab(tab.id);
  const openTab = () => { tab.id && api.tabs.update(tab.id, { active: true }); };

  return (
    <Wrapper>
      <Header onClick={toggleCheck}>
        <Favicon url={tab.favIconUrl} size="16" />
        <HostName title={tab.url} >{ tab.url && new URL(tab.url).hostname }</HostName>
        <TabCheckbox id={tab.id} prevent />
      </Header>
      
      <Body onDoubleClick={openTab}>
        <Title title={tab.title}>{ tab.title }</Title>
      </Body>

      <Footer>
        <Button content='이동' handleClick={openTab}  />
        <Button content='닫기' handleClick={closeTab} buttonType="DANGER" />
      </Footer>
    </Wrapper>
  );
};

export default TabGridItem;

const Wrapper = styled.div`
  border-radius: 5px;
  border: 1px solid lightgrey;
  width: 100%;

  display: flex;
  flex-direction: column;

  overflow: hidden;
  font-size: 0.8rem;
  background-color: white;
  
  &:hover {
    box-shadow: 2px 2px 5px lightgrey;
  }
`;

const Header = styled.div`
  padding: 5px;
  border-bottom: 1px solid lightgrey;

  display: grid;
  grid-template-columns: 16px auto 16px;
  grid-template-rows: repeat(auto-fill, 24px);
  place-items: center center;
  gap: 7px;


  &:hover {
    cursor: pointer;
  }
`;

const Body = styled.div`
  flex-grow: 2;
  padding: 10px 28px; 
`;

const Title = styled.div`
  line-height: 1.3rem;
  word-wrap: break-word;
`;

const HostName = styled.div`
  justify-self: start;
  color: grey;
  padding-bottom: 3px;
  white-space: nowrap;
  overflow-y: hidden;
`;

const Footer = styled.div`
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;