import { useState } from 'react';
import { BookmarkNode } from 'src/constants/types';
import styled from 'styled-components';

import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { 
  selectIsChecked, 
  toggleCheck, 
  openFolderNode, 
  setCurrentFolderNodeId
 } from 'src/store/modules/bookmarksSlice';
import { Folder } from '@styled-icons/material-outlined';
import { getHostname } from 'src/util';

import Favicon from 'src/components/UI/Favicon';
import Checkbox from 'src/components/UI/Checkbox';
import InputRename from "./InputRename";
import NodeListItemDropdown from './NodeListItemDropdown';

const NodeListItem = ({ node }: { node: BookmarkNode }) => {
  const dispatch = useTypedDispatch();
  const isChecked = useTypedSelector(state => selectIsChecked(state, node.id));
  
  const [ isRename, setIsRename ] = useState(false);
  const isBaseNode = ['1', '2'].includes(node.id);

  const handleDoubleClick = () => {
    if (node.url) {
      window.open(node.url);
    } else {
      dispatch(openFolderNode(node.id));
      dispatch(setCurrentFolderNodeId(node.id));
    }
  };  

  return (
    <NodeContentContainer 
      onClick={() => { !isBaseNode && dispatch(toggleCheck(node.id)) }}
      onDoubleClick={handleDoubleClick}
      >
      <div>
        { !isBaseNode && <Checkbox isChecked={isChecked} /> }
      </div>
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
        {
          !isBaseNode &&
          <NodeListItemDropdown 
            node={node}
            handleClickRename={() => setIsRename(true)}
            />
        }
      </div>
      { 
        node.url && 
        <Hostname title={node.url}>{ getHostname(node.url) }</Hostname> 
      }
    </NodeContentContainer>
  );
};

export default NodeListItem;

export const NodeContentContainer = styled.div`
  display: grid;
  grid-template-columns: 24px 24px auto 32px;
  place-items: center center;
  column-gap: 0.5rem;
  row-gap: 5px;
  padding: 0.5rem 0;
  border-radius: 5px;
  font-size: 0.8rem;

  &:hover {
    cursor: pointer;
    background: ${props => props.theme.colors.hover};
  }
`;

const Title = styled.div`
  justify-self: start;
  width: 100%;
  max-width: 364px;
  height: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
`;

const Hostname = styled.div`
  grid-column: 3;
  justify-self: start;
  color: darkgrey;
`;