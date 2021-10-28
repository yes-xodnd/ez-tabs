import styled from 'styled-components';
import { Folder, FolderOpen, ArrowDropDown } from '@styled-icons/material-outlined';
import { BookmarkNode } from "src/constants/types";
import { useFolderOpen, useFolderFocus } from 'src/hooks/FolderTree';

interface Props {
  node: BookmarkNode;
  depth?: number;
}

const FolderListNode = ({ node, depth = 0 }: Props) => {
  const { isFocused, setFocus } = useFolderFocus(node.id);
  const { isOpen, toggleOpen } = useFolderOpen(node.id);

  return (
    <div>
      <NodeContentContainer 
        onDoubleClick={() => { toggleOpen(); setFocus(); }}
        depth={depth}
        isFocused={isFocused}>
        <Arrow 
          size="16"
          isOpen={isOpen}
          onClick={toggleOpen}
          title="하위 디렉토리 목록 보기"
          />
        {
          isFocused
          ? <FolderOpen size="16" />
          : <Folder size="16" />
        }
        <Title onClick={setFocus} title={node.title} >
          { node.title }
        </Title>
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
  display: grid;
  grid-template-columns: 24px 24px auto;
  place-items: center center;
  column-gap: 0.5rem;
  padding: 0.5rem 0;
  padding-left: ${({ depth }) => (depth * 12) + 'px' };
  border-radius: 5px;
  background-color: ${({ isFocused }) => isFocused ? 'royalblue' : 'transparent'};
  color: ${({ isFocused }) => isFocused ? 'white' : 'unset'};
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