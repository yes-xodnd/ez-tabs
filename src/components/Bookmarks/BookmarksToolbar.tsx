import { ToolbarWrapper } from "src/style";
import SearchInput from 'src/components/Search/SearchInput';
import ButtonCheckAll from "./ButtonCheckAll";
import ButtonRemove from "./ButtonRemove";
import ButtonCreateFolder from "./ButtonCreateFolder";
import ButtonShowAll from "./ButtonShowAll";
import { useBookmarkSearch } from 'src/hooks';

const BookmarksToolbar = () => {
  const handleChange = useBookmarkSearch();

  return (
    <ToolbarWrapper>
      <SearchInput handleChange={handleChange} />
      <ButtonCreateFolder />
      <ButtonCheckAll />
      <ButtonRemove />
      <ButtonShowAll />
    </ToolbarWrapper>
  );
};

export default BookmarksToolbar;