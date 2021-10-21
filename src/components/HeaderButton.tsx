import { MouseEventHandler } from "react";
import styled from "styled-components";

interface Props {
  content: string;
  handleClick?: MouseEventHandler;
}

const HeaderButton = ({ content, handleClick }: Props) => {
  return (
    <Button onClick={handleClick}>
      {content}
    </Button>
  );
};

export default HeaderButton;

const Button = styled.button`
  padding: 0.5rem;
  border: 1px solid darkgrey;
  border-radius: 5px;
`;