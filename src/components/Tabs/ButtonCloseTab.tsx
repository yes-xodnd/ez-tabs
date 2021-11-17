import styled from "styled-components";
import { Close } from '@styled-icons/material-outlined';
import { useCloseTab } from "src/hooks/tabs";


const ButtonCloseTab = ({ id }: { id: number | undefined }) => {
  const closeTab = useCloseTab(id);

  return (
    <Button onClick={e => {closeTab(); e.stopPropagation();}} title="close tab (Delete)">
      <Close size="16" />
    </Button>
  );
};

export default ButtonCloseTab;

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
    background-color: ${props => props.theme.colors.danger};
  }
`;