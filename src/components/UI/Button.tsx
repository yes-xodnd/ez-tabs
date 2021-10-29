import { MouseEventHandler } from "react";
import styled from "styled-components";


interface Props {
  content: string;
  handleClick?: MouseEventHandler;
  icon?: JSX.Element;
  disabled?: boolean;
}

const ButtonWithIcon = ({ content, handleClick, icon, disabled }: Props) => {

  return (
    <Wrapper
      onClick={disabled ? () => {} : handleClick}
      disabled={disabled || false}
      >
      { !!icon && icon }
      {content}
    </Wrapper>
  );
};

export default ButtonWithIcon;

const Wrapper = styled.button<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: ${
    ({ disabled, theme }) => disabled 
      ? 'darkgrey'
      : theme.colors.mainLight
  };
  color: white;

  &:hover {
    cursor: pointer;
    background-color: ${
      ({ disabled, theme }) => disabled 
        ? 'darkgrey' 
        : theme.colors.main
    };
  }
`;