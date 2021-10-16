import { Folder } from "@styled-icons/material-outlined";
import { MouseEventHandler } from "react";
import { BookmarkNode } from "src/constants/types";
import styled from "styled-components";

interface Props {
  node: BookmarkNode;
  handleDoubleClick: MouseEventHandler;
}


const NodeListItemDirectory = ({ node, handleDoubleClick }: Props) => {
  return (
    <NodeContentContainer isSelected={false} onDoubleClick={handleDoubleClick}>
      <Folder size="16" />
      <Title>{ node.title }</Title>
    </NodeContentContainer>
  );
};

export default NodeListItemDirectory;

const NodeContentContainer = styled.div<{ isSelected: boolean }>`
  display: grid;
  grid-template-columns: 24px auto 32px;
  place-items: center center;
  column-gap: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 5px;
  background-color: ${({ isSelected }) => isSelected ? 'royalblue' : 'transparent'};
  color: ${({ isSelected }) => isSelected ? 'white' : 'unset'};
  overflow: hidden;
`;

const Title = styled.div`
  justify-self: start;
  max-width: 100%;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
`;