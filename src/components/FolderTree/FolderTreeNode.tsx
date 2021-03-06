import { useState } from 'react';
import styled from 'styled-components';
import { Folder, FolderOpen, ArrowDropDown, ArrowBack } from '@styled-icons/material-outlined';

import { BookmarkNode } from "src/constants/types";
import { useFolderOpen, useCurrentFolder, useTypedDispatch, useTypedSelector } from 'src/hooks';
import { moveChecked } from 'src/store/modules/bookmarksSlice';


interface Props {
  node: BookmarkNode;
  depth?: number;
}

const FolderListNode = ({ node, depth = 0 }: Props) => {
  const [ isHovered, setHovered ] = useState(false);
  const { isOpen, toggleOpen } = useFolderOpen(node.id);
  const { isCurrentFolder, setCurrentFolder } = useCurrentFolder(node.id);
  const isChecked = useTypedSelector(state => state.nodeList.checkedNodeIds.length);
  const isMoveButtonVisible = (!!isHovered && !!isChecked && !isCurrentFolder);

  const dispatch = useTypedDispatch();

  return (
    <div>
      <NodeContentContainer
        onDoubleClick={() => { toggleOpen(); setCurrentFolder(); }}
        onMouseEnter={() => { setHovered(true) }}
        onMouseLeave={() => { setHovered(false) }}
        depth={depth}
        isFocused={isCurrentFolder}>

        <Arrow 
          size="16"
          isOpen={isOpen}
          onClick={toggleOpen}
          title="하위 디렉토리 목록 보기"
          />
        {
          isCurrentFolder
          ? <FolderOpen size="16" />
          : <Folder size="16" />
        }
        <Title onClick={setCurrentFolder} title={node.title} >
          { node.title }
        </Title>

        {
          isMoveButtonVisible && 
          <MoveButton 
            onClick={() => { dispatch(moveChecked(node.id)) }}
            title={node.title + '로 이동'}
            size="16"
            />
        }
      </NodeContentContainer>

      <ChildrenContainer isOpen={isOpen}>
        { 
          node.children &&
          node.children
          .filter(node => node.children)
          .map(childNode => (
            <FolderListNode 
              node={childNode}
              key={childNode.id}
              depth={depth + 1}
              />
          ))
        }
      </ChildrenContainer>
    </div>  
  );  
}

export default FolderListNode;
  
const NodeContentContainer = styled.div<{ depth: number, isFocused: boolean }>`
  position: relative;

  display: grid;
  grid-template-columns: 20px 20px auto 20px;
  grid-template-rows: 32px;
  place-items: center center;
  column-gap: 5px;

  padding-left: ${({ depth }) => (depth * 12) + 'px' };
  border-radius: 5px;
  background-color: ${
    ({ isFocused, theme }) => isFocused 
      ? theme.colors.main
      : 'transparent'
  };
  color: ${({ isFocused }) => isFocused ? 'white' : 'unset'};
  overflow: hidden;
  font-size: 0.8rem;

  &:hover {
    cursor: pointer;
    ${props => props.isFocused
      ? '' 
      : `background-color: ${props.theme.colors.hover}`
    }
  }
`;

const Arrow = styled(ArrowDropDown)<{ isOpen: boolean }>`
  transform: rotate(${({ isOpen }) => isOpen ? '270deg' : '0' });
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  justify-self: start;
  width: 100%;
  /* max-width: 100%; */
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
`;

const ChildrenContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
`;

const MoveButton = styled(ArrowBack)`
  position: absolute;
  right: 5px;
  padding: 2px;
  border-radius: 100%;
  border: 1px solid #333333; 
  color: #333333;

  &:hover {
    cursor: pointer;
    border-color: ${props => props.theme.colors.main};
    background-color: ${props => props.theme.colors.main};
    color: white;
  }
`;