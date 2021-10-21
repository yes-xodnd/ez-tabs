import { Tab } from 'src/constants/types';
import styled from 'styled-components';
import CheckboxContainer from './CheckboxContainer';

interface Props {
  tab: Tab;
}

const TabListItem = ({ tab }: Props) => {
  const hostname = (url: string) => new URL(url).hostname;
  const faviconSrc = tab.favIconUrl || 'https://www.google.com/s2/favicons?domain=www';
  const tabId = tab.id?.toString() || '';

  return (
    <ContentContainer>
      <CheckboxContainer id={tabId} />
      <img src={faviconSrc} alt="favicon" width="16" height="16" />
      <Title title={tab.title} >{ tab.title }</Title>
      <div></div>

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
`