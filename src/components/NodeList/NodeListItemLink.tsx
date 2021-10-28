import { BookmarkNode } from 'src/constants/types';
import styled from 'styled-components';
import { MoreVert } from '@styled-icons/material-outlined';
import { MouseEventHandler } from 'react';
import Favicon from 'src/components/UI/Favicon';

interface Props {
  node: BookmarkNode;
  handleDoubleClick: MouseEventHandler;
}

const NodeListItemLink = ({ node, handleDoubleClick }: Props) => {
  const isSelected = false;
  
  return (
    <div>
      <NodeContentContainer isSelected={isSelected} onDoubleClick={handleDoubleClick}>
        <Favicon url={node.url} snatcher />
        <Title>
          { node.title }
        </Title>
        <MoreVert size="16" />
        <Hostname>{ new URL(node.url as string).hostname }</Hostname>
      </NodeContentContainer>
    </div>
  );
};

export default NodeListItemLink;

const NodeContentContainer = styled.div<{ isSelected: boolean }>`
  display: grid;
  grid-template-columns: 24px auto 32px;
  place-items: center center;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 5px;
  background-color: ${({ isSelected }) => isSelected ? 'royalblue' : 'transparent'};
  color: ${({ isSelected }) => isSelected ? 'white' : 'unset'};
  font-size: 0.8rem;
  overflow: hidden;
`;

const Title = styled.div`
  justify-self: start;
  max-width: 100%;
  height: 1rem;
  white-space: nowrap;
  overflow-x: hidden;
`;

const Hostname = styled.div`
  grid-column: 2 / span 2;
  justify-self: start;
  color: lightgrey;
`;