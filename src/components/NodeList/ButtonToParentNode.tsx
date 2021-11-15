import { NodeContentContainer } from './NodeListItem';
import { ArrowUpward } from '@styled-icons/material-outlined';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { toParentNode } from 'src/store/modules/bookmarksSlice';

const ButtonToParentNode = () => {
  const isFocused = useTypedSelector(state => state.bookmarks.focusIndex === -1);
  const dispatch = useTypedDispatch();

  const handleClick = () => dispatch(toParentNode());

  return (
    <NodeContentContainer onClick={handleClick} isFocused={isFocused}>
      <ArrowUpward size="16" />
      <div></div>
      <div>상위 폴더</div>
    </NodeContentContainer>
  );
};

export default ButtonToParentNode;