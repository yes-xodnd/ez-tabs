import styled, { DefaultTheme } from "styled-components";
import { Fullscreen, Close } from '@styled-icons/material-outlined';
import { WindowTypes } from 'src/constants/types';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { closeWindow, openWindowAlone } from 'src/store/modules/intefaceSlice';

interface Props {
  title: string;
  windowType: WindowTypes;
}

const WindowHeader = ({ title, windowType }: Props) => {
  const dispatch = useTypedDispatch();
  const { isPopup, activeWindow }  = useTypedSelector(state => state.interfaces);
  const isActive = windowType === activeWindow;

  const openAlone = () => { dispatch(openWindowAlone(windowType)); };
  const openInNewTab = () => { 
    chrome && chrome.tabs
    .create({ url: 'chrome://bookmarks' })
    .then(tab => { tab.id && chrome.tabs.reload(tab.id) });
  };

  const open = isPopup ? openInNewTab : openAlone;
  const close = () => { dispatch(closeWindow(windowType)); };
  
  return (
    <Header onDoubleClick={open} isActive={isActive} isPopup={isPopup}>
      <Title>{ title }</Title>
      <ButtonList>
        <Button title="최대로 보기" onClick={open} >
          <Fullscreen size="20"/>
        </Button>
        { 
          !isPopup &&
          <Button title="닫기" onClick={close} >
            <Close size="20"/>
          </Button>
        }
      </ButtonList>
    </Header>
  );
};

export default WindowHeader;

const Header = styled.header<{ isPopup: boolean, isActive: boolean, theme: DefaultTheme }>`
  position: relative;
  padding: 0.5rem 1rem;

  ${props => (!props.isPopup && props.isActive) && `
    background-image: linear-gradient(
      100deg, 
      ${props.theme.colors.mainDark},
      ${props.theme.colors.main}
    );
    color: white;
  `}
`;

const Title = styled.div`
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid transparent;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: inherit;

  &:hover {
    cursor: pointer;
    border-color: lightgrey;
  }
`
const ButtonList = styled.div`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;

  display: flex;
  gap: 5px;
`