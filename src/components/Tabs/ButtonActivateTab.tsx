import styled from "styled-components";
import { OpenInBrowser } from '@styled-icons/material-outlined'

const ButtonActivateTab = ({ activateTab }: { activateTab: () => void }) => {
  return (
    <Button 
      onClick={e => {
        activateTab();
        e.stopPropagation();
      }} 
      title="open tab (Enter or double click)">
      <OpenInBrowser size="16" />
    </Button>
  );
};

export default ButtonActivateTab;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
  padding: 2px;
  border: none;
  background-color: lightgrey;
  color: white;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.main};
  }
`;