import styled from 'styled-components';
import { Tab } from 'src/constants/types';
import { Close } from '@styled-icons/material-outlined';
import { MouseEventHandler } from 'react';

interface Props {
  tab: Tab;
  checkbox: JSX.Element;
  closeTab: MouseEventHandler;
}

const TabListItem = ({ tab, checkbox, closeTab }: Props) => {
  const hostname = (url: string) => new URL(url).hostname;
  const faviconSrc = tab.favIconUrl || 'https://www.google.com/s2/favicons?domain=www';

  return (
    <ContentContainer>
      { checkbox }
      <img src={faviconSrc} alt="favicon" width="16" height="16" />
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
  padding: 0.5rem 0;
  border-radius: 5px;
  border: 1px solid transparent;
  overflow: hidden;
  font-size: 0.8rem;

  
  &:hover {
    cursor: pointer;
    background: royalblue;
    color: white;
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
  color: lightgrey;
`;

const CloseTab = styled(Close)`
  color: darkgrey;
  &:hover {
    cursor: pointer;
    color: tomato;
  }
`;
