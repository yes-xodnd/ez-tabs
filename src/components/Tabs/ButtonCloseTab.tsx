import styled from "styled-components";
import { Close } from '@styled-icons/material-outlined';
import { useCloseTab } from "src/hooks/Tabs";


const ButtonCloseTab = ({ id }: { id: number | undefined }) => {
  const closeTab = useCloseTab(id);

  return (
    <Button onClick={closeTab} title="탭 닫기">
      <Close size="16" />
    </Button>
  );
};

export default ButtonCloseTab;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  padding: 2px;
  border: none;
  border-radius: 100%;
  background-color: white;
  color: ${props => props.theme.colors.danger};

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.danger};
    color: white;
  }
`;