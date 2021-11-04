import styled from "styled-components";
import { Fullscreen, Close } from '@styled-icons/material-outlined';
import { WindowTypes } from 'src/constants/types';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { closeWindow, activateWindowAlone } from 'src/store/modules/intefaceSlice';

interface Props {
  title: string;
  windowType: WindowTypes;
}

const WindowHeader = ({ title, windowType }: Props) => {
  const dispatch = useTypedDispatch();
  const { isPopup }  = useTypedSelector(state => state.interfaces);

  const openAlone = () => { dispatch(activateWindowAlone(windowType)); };
  const openInNewTab = () => { 
    chrome && chrome.tabs
    .create({ url: 'chrome://bookmarks' })
    .then(tab => { tab.id && chrome.tabs.reload(tab.id) });
  };

  const open = isPopup ? openInNewTab : openAlone;
  const close = () => { dispatch(closeWindow(windowType)); };
  
  return (
    <Header onDoubleClick={open}>
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

const Header = styled.header`
  position: relative;
  padding: 0.5rem 1rem;
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