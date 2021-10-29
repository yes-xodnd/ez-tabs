import { ToolbarWrapper, ToolbarButton } from "src/style";
import { ArrowUpward } from '@styled-icons/material-outlined';

const BookmarksToolbar = () => {
  return (
    <ToolbarWrapper>
      <ToolbarButton>
        <ArrowUpward size="20" />
      </ToolbarButton>
    </ToolbarWrapper>
  );
};

export default BookmarksToolbar;