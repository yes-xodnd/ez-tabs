import styled from "styled-components";
import { Close } from '@styled-icons/material-outlined';

interface Props {
  title: string;
  hideWindow: () => void;
}

const WindowHeader = ({ title, hideWindow}: Props) => {
  
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
`;

const Title = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const HideButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
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