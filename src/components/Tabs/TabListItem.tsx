import { useState, memo } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Tab } from 'src/constants/types';

import { toggleCheck, setFocusIndex } from 'src/store/modules/tabsSlice';
import { useScrollCenterFocused, useTypedDispatch, useTypedSelector } from 'src/hooks';
import { getHostname } from 'src/util';

import Favicon from 'src/components/UI/Favicon';
import TabCheckbox from './TabCheckbox';
import ButtonCloseTab from './ButtonCloseTab';

interface Props {
  tab: Tab;
  index: number;
}

const TabListItem = ({ tab, index }: Props) => {
  const isFocused = useTypedSelector(state => state.tabs.tabIndex === index);
  const ref = useScrollCenterFocused<HTMLDivElement>(isFocused);

  const [ isHover, setHover ] = useState(false);
  const dispatch = useTypedDispatch();

  const handleClick = () => {
    tab.id && dispatch(toggleCheck(tab.id));
    dispatch(setFocusIndex(index));
  }

  return ( 

    <ContentContainer
      ref={ref}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      isFocused={isFocused}
      >
      <Content tab={tab} />

      <ButtonWrapper>
        { isHover && <ButtonCloseTab id={tab.id} /> }
      </ButtonWrapper>
    </ContentContainer>
  );
};

const Content = memo(({ tab }: { tab: Tab }) => {

  return (
    <>
      <TabCheckbox id={tab.id} prevent />
      <Favicon url={ tab.favIconUrl } />
      <Title title={tab.title} >{ tab.title }</Title>
      <Hostname>{ tab.url && getHostname(tab.url) }</Hostname>
    </>
  );
})

export default TabListItem;

const ContentContainer = styled.div<{ isFocused: boolean, theme: DefaultTheme }>`
  position: relative;
  display: grid;
  grid-template-columns: 24px 24px auto;
  grid-template-rows: 24px auto;
  place-items: center center;
  column-gap: 0.5rem;
  row-gap: 5px;
  
  padding: 0.5rem 0;
  border-radius: 5px;
  border: 1px solid transparent;
  background: white;
  font-size: 0.8rem;
  overflow-x: hidden;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.hover};
  }

  ${props => props.isFocused && `
    border-color: ${props.theme.colors.main}
  `}
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

const ButtonWrapper = styled.div`
  position: absolute;
  right: 10px;
`;