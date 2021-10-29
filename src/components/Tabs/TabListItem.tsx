import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Tab } from 'src/constants/types';
import { Close } from '@styled-icons/material-outlined';
import Favicon from 'src/components/UI/Favicon';

interface Props {
  tab: Tab;
  checkbox: JSX.Element;
  closeTab: MouseEventHandler;
}

const TabListItem = ({ tab, checkbox, closeTab }: Props) => {
  const hostname = (url: string) => new URL(url).hostname;

  return (
    <ContentContainer>
      { checkbox }
      <Favicon url={ tab.favIconUrl } />
      <Title title={tab.title} >{ tab.title }</Title>
      <CloseTab 
        size='16'
        title='탭 닫기'
        onClick={closeTab} />

      <Hostname>{ tab.url && hostname(tab.url) }</Hostname>
    </ContentContainer>
  );
};

export default TabListItem;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 24px 24px auto 32px;
  place-items: center center;
  column-gap: 0.5rem;
  row-gap: 5px;
  padding: 0.5rem 0;
  border-radius: 5px;
  font-size: 0.8rem;
  overflow: hidden;

  
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.colors.hover};
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

const CloseTab = styled(Close)`
  color: darkgrey;
  border-radius: 100%;
  transition: 200ms;

  &:hover {
    cursor: pointer;
    color: tomato;
    background: white;
  }
`;
