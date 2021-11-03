import { ToolbarWrapper } from "src/style";
import ButtonCheckAll from "./ButtonCheckAll";
import ButtonRemove from "./ButtonRemove";
import ButtonAddFolder from "./ButtonCreateFolder";

const BookmarksToolbar = () => {
  return (
    <ToolbarWrapper>
      <ButtonAddFolder />
      <ButtonCheckAll />
      <ButtonRemove />
    </ToolbarWrapper>
  );
};

export default BookmarksToolbar;