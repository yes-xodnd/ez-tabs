import NodeListItem from 'src/components/NodeList/NodeListItem';
import { BookmarkNode } from 'src/constants/types';
import { useTypedDispatch, useTypedSelector } from 'src/hooks';
import { setFocusIndex } from 'src/store/modules/searchSlice';

interface Props {
  node: BookmarkNode;
  index: number;
}

const SearchResultItem = ({ node, index }: Props) => {
  const isFocused = useTypedSelector(state => state.search.focusIndex === index);
  const dispatch = useTypedDispatch();
  const handleClick = () => dispatch(setFocusIndex(index));

  return (
    <NodeListItem node={node} isFocused={isFocused} handleClick={handleClick} />
  );
};

export default SearchResultItem;