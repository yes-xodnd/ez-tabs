import { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import { MoreVert, Folder } from '@styled-icons/material-outlined';

import { BookmarkNode } from 'src/constants/types';
import Favicon from 'src/components/UI/Favicon';
import InputRename from "./InputRename";
import DropDownContainer from './DropDownContainer';

interface Props {
  node: BookmarkNode;
  handleDoubleClick: MouseEventHandler;
}

const NodeListItemLink = ({ node, handleDoubleClick }: Props) => {
  const [ isRename, setIsRename ] = useState(false);
  const [ dropDownVisible, setDropDownVisible ] = useState(false);

  return (
    <div>
      <NodeContentContainer onDoubleClick={handleDoubleClick} >
        {
          node.url 
          ? <Favicon url={node.url} snatcher />
          : <Folder size="16" />
        }
        <Title>
          { 
          isRename
          ? <InputRename 
              id={node.id}
              title={node.title}
              quitRename={() => setIsRename(false)}
              />
          : <div>{ node.title }</div>
          }
        </Title>
        <div>
          <MoreVert 
            size="16"
            onClick={() => setDropDownVisible(!dropDownVisible)}
            />
          { 
            dropDownVisible && 
            <DropDownContainer 
              node={node}
              handleClickRename={() => setIsRename(true)}
              closeDropDown={() => setDropDownVisible(false)} />
          }
        </div>
        
        { node.url && <Hostname>{ new URL(node.url as string).hostname }</Hostname> }
      </NodeContentContainer>
    </div>
  );
};

export default NodeListItemLink;

export const NodeContentContainer = styled.div`
  display: grid;
  grid-template-columns: 24px auto 32px;
  place-items: center center;
  column-gap: 0.5rem;
  row-gap: 5px;
  padding: 0.5rem 0;
  border-radius: 5px;
  font-size: 0.8rem;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background-color: royalblue;
    color: white;
  }
`;

const Title = styled.div`
  justify-self: start;
  max-width: 100%;
  height: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
`;

const Hostname = styled.div`
  grid-column: 2 / span 2;
  justify-self: start;
  color: lightgrey;
`;