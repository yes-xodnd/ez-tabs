import { useEffect, useRef, memo } from 'react';
import styled, { DefaultTheme } from 'styled-components';

import { Tab } from 'src/constants/types';
import { useScrollCenterFocused, useTypedDispatch, useTypedSelector } from 'src/hooks';
import { setFocusIndex, toggleCheck, closeTab } from 'src/store/modules/tabsSlice';
import api from 'src/api';

import Favicon from 'src/components/UI/Favicon';
import TabCheckbox from './TabCheckbox';
import Button from 'src/components/UI/Button';



interface Props {
  tab: Tab;
  index: number;
}

const TabGridItem = ({ tab, index }: Props) => {
  const isFocused = useTypedSelector(state => state.tabs.tabIndex === index);
  const ref = useScrollCenterFocused<HTMLDivElement>(isFocused);
  
  const dispatch = useTypedDispatch();
  const close = () => { tab.id && dispatch(closeTab(tab.id)) };
  const open = () => { tab.id && api.tabs.update(tab.id, { active: true }); };
  
  const handleClick = () => {
    dispatch(setFocusIndex(index));
    tab.id && dispatch(toggleCheck(tab.id));
  }

  return (
    <Wrapper 
      ref={ref} 
      isFocused={isFocused}
      onClick={handleClick}
      >
      <Header>
        <Favicon url={tab.favIconUrl} size="16" />
        <HostName title={tab.url} >{ tab.url && new URL(tab.url).hostname }</HostName>
        <TabCheckbox id={tab.id} prevent />
      </Header>
      
      <Body onDoubleClick={open}>
        <Title title={tab.title}>{ tab.title }</Title>
      </Body>

      <Footer>
        <Button content='이동' handleClick={open}  />
        <Button content='닫기' handleClick={close} buttonType="DANGER" />
      </Footer>
    </Wrapper>
  );
};


export default memo(TabGridItem);

const Wrapper = styled.div<{ isFocused: boolean, theme: DefaultTheme }>`
  border-radius: 5px;
  border: 2px solid lightgrey;
  width: 100%;

  display: flex;
  flex-direction: column;

  overflow: hidden;
  font-size: 0.8rem;
  background-color: white;
  
  &:hover {
    box-shadow: 2px 2px 5px lightgrey;
    cursor: pointer;
  }

  ${props => props.isFocused && `
    border-color: ${props.theme.colors.main}
  `}
`;

const Header = styled.div`
  padding: 5px;
  border-bottom: 1px solid lightgrey;

  display: grid;
  grid-template-columns: 16px auto 16px;
  grid-template-rows: repeat(auto-fill, 24px);
  place-items: center center;
  gap: 7px;
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