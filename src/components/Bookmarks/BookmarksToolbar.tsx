import { ToolbarWrapper } from "src/style";
import SearchInput from 'src/components/Search/SearchInput';
import ButtonCheckAll from "./ButtonCheckAll";
import ButtonRemove from "./ButtonRemove";
import ButtonCreateFolder from "./ButtonCreateFolder";
import ButtonShowAll from "./ButtonShowAll";


const BookmarksToolbar = () => {
  return (
    <ToolbarWrapper>
      <SearchInput />
      <ButtonCreateFolder />
      <ButtonCheckAll />
      <ButtonRemove />
      <ButtonShowAll />
    </ToolbarWrapper>
  );
};

export default BookmarksToolbar;