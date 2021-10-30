import { StyledIcon, ButtonTypes } from 'src/constants/types';
import styled from "styled-components";

interface Props {
  content: string;
  handleClick: () => void;
  Icon?: StyledIcon;
  title?: string;
  buttonType?: ButtonTypes;
}

const Button = ({ content, handleClick, Icon, title, buttonType = 'NORMAL' }: Props) => {

  return (
    <SButton onClick={handleClick} buttonType={buttonType} title={title} >
      { !!Icon && <Icon size="16" />}
      { content }
    </SButton>
  );
};

export default Button;

const SButton = styled.button<{ buttonType: string }>`
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  font-size: 0.8rem;
  background-color: white;
  color: #333333;
  
  &:hover {
    cursor: pointer;
    background-color: ${({ theme, buttonType }) => {

      switch(buttonType) {
        case 'DANGER': 
          return theme.colors.danger;

        default:
          return theme.colors.main;
      }
    }};
    color: white;
  }  
`