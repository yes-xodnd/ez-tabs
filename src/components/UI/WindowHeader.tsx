import styled from "styled-components";
import { Minimize, Fullscreen } from '@styled-icons/material-outlined';
import { WindowTypes } from 'src/constants/types';
import { useTypedDispatch } from 'src/hooks';
import { deactivateWindow, activateWindowAlone } from 'src/store/modules/intefaceSlice';

interface Props {
  title: string;
  windowType: WindowTypes;
}

const WindowHeader = ({ title, windowType }: Props) => {
  const dispatch = useTypedDispatch();
  
  const hide = () => { dispatch(deactivateWindow(windowType)); };
  const openFull = () => { dispatch(activateWindowAlone(windowType)); };
  
  return (
    <Header>
      <Title>{ title }</Title>
      <ButtonList>
        <Button title="최대로 보기"  onClick={openFull} >
          <Fullscreen size="20"/>
        </Button>

        <Button title="닫기" onClick={hide} >
          <Minimize size="20"/>
        </Button>
      </ButtonList>
    </Header>
  );
};

export default WindowHeader;

const Header = styled.header`
  position: relative;
`;

const Title = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Button = styled.button`
  border-radius: 5px;
  background-color: transparent;
  border: none;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: royalblue;
    color: white;
  }
`
const ButtonList = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;

  display: flex;
  gap: 5px;
`