import styled from 'styled-components';
import { Folder, FolderOpen, ArrowDropDown } from '@styled-icons/material-outlined';
import { BookmarkNode } from "src/constants/types";
import { useToggle, useTypedSelector } from "src/hooks";

interface Props {
  node: BookmarkNode;
  handleClickTitle: Function;
  depth?: number;
}

const DirectoryListItem = ({ node, handleClickTitle, depth = 0 }: Props) => {
  const { selectedDirId } = useTypedSelector(({ bookmarks }) => bookmarks);
  const [isOpen, toggleOpen] = useToggle(false);
  const isSelected = selectedDirId === node.id; 

  return (
    <div>
      <NodeContentContainer 
        depth={depth}
        isSelected={isSelected}>
        <Arrow 
          size="16"
          isOpen={isOpen}
          onClick={toggleOpen}
          title="하위 디렉토리 목록 보기"
          />
        {
          isSelected
          ? <FolderOpen size="16" />
          : <Folder size="16" />
        }
        <Title onClick={handleClickTitle(node.id)} title={node.title} >
          { node.title }
        </Title>
      </NodeContentContainer>

      <ChildrenContainer isOpen={isOpen}>
        { 
          node.children &&
          node.children
          .filter(node => node.children)
          .map(childNode => (
            <DirectoryListItem 
              node={childNode}
              key={childNode.id}
              depth={depth + 1}
              handleClickTitle={handleClickTitle}
              />
          ))
        }
      </ChildrenContainer>
    </div>  
  );  
}

export default DirectoryListItem;
  
const NodeContentContainer = styled.div<{ depth: number, isSelected: boolean }>`
  display: grid;
  grid-template-columns: 24px 24px auto;
  place-items: center center;
  column-gap: 0.5rem;
  padding: 0.5rem 0;
  padding-left: ${({ depth }) => (depth * 12) + 'px' };
  border-radius: 5px;
  background-color: ${({ isSelected }) => isSelected ? 'royalblue' : 'transparent'};
  color: ${({ isSelected }) => isSelected ? 'white' : 'unset'};
  overflow: hidden;
`;

const Arrow = styled(ArrowDropDown)<{ isOpen: boolean }>`
  transform: rotate(${({ isOpen }) => isOpen ? '270deg' : '0' });
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  justify-self: start;
  max-width: 100%;
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