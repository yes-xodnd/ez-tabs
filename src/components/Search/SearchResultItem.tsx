import NodeListItem from 'src/components/NodeList/NodeListItem';
import { BookmarkNode } from 'src/constants/types';
import { useTypedSelector } from 'src/hooks';

interface Props {
  node: BookmarkNode;
  index: number;
}

const SearchResultItem = ({ node, index }: Props) => {
  const isFocused = useTypedSelector(state => state.search.focusIndex === index);

  return (
    <div>
      <NodeListItem node={node} isFocused={isFocused} />
    </div>
  );
};

export default SearchResultItem;