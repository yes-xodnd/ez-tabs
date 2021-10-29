import styled from "styled-components";
import { Close } from '@styled-icons/material-outlined';

interface Props {
  title: string;
  hideWindow: () => void;
  children?: JSX.Element;
}

const WindowHeader = ({ title, hideWindow }: Props) => {
  
  return (
    <Header>
      <Title>{ title }</Title>
      <HideButton title="창 닫기" onClick={hideWindow}>
        <Close size="16" />
      </HideButton>
    </Header>
  );
};

export default WindowHeader;

const Header = styled.header`
  position: relative;
  padding-bottom: 1rem;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const HideButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  
  &:hover {
    cursor: pointer;
    background-color: crimson;
    color: white;
  }
`