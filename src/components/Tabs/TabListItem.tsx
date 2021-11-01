import { useState } from 'react';
import styled from 'styled-components';
import { Tab } from 'src/constants/types';
import Favicon from 'src/components/UI/Favicon';
import TabCheckbox from './TabCheckbox';
import ButtonCloseTab from './ButtonCloseTab';
import { useToggleCheckTab } from 'src/hooks/Tabs';
import { getHostname } from 'src/util';


const TabListItem = ({ tab }: { tab: Tab }) => {
  const [isHover, setHover] = useState(false);
  const toggleCheck = useToggleCheckTab(tab.id);

  return (
    <ContentContainer 
      onClick={toggleCheck}
      onMouseEnter={() => setHover(true)}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      >
      <TabCheckbox id={tab.id} prevent />
      <Favicon url={ tab.favIconUrl } />
      <Title title={tab.title} >{ tab.title }</Title>
      <div>{ isHover && <ButtonCloseTab id={tab.id} /> }</div>

      <Hostname>{ tab.url && getHostname(tab.url) }</Hostname>
    </ContentContainer>
  );
};

export default TabListItem;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 24px 24px auto 32px;
  grid-template-rows: 24px auto;
  place-items: center center;
  column-gap: 0.5rem;
  row-gap: 5px;
  
  padding: 0.5rem 0;
  border-radius: 5px;
  background: white;
  font-size: 0.8rem;
  overflow-x: hidden;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.hover};
  }
`;

const Title = styled.div`
  justify-self: start;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
`;

const Hostname = styled.div`
  grid-column: 3;
  justify-self: start;
  color: darkgrey;
`;