import styled from "styled-components";
import { WindowTypes } from 'src/constants/types';
import { memo } from "react";

interface Props {
  title: string;
  windowType: WindowTypes;
}

const WindowHeader = ({ title }: Props) => {
  
  return (
    <Header>
      <Title>{ title }</Title>
    </Header>
  );
};

export default memo(WindowHeader);

const Header = styled.header`
  position: relative;
  padding: 0.5rem 1rem;
`;

const Title = styled.div`
  font-size: 1rem;
`;