import { ToolbarWrapper } from "src/style";
import ButtonCheckAll from "./ButtonCheckAll";
import ButtonRemove from "./ButtonRemove";

const BookmarksToolbar = () => {
  return (
    <ToolbarWrapper>
      <ButtonCheckAll />
      <ButtonRemove />
    </ToolbarWrapper>
  );
};

export default BookmarksToolbar;