import { ToolbarWrapper } from "src/style";
import ButtonCheckAll from "./ButtonCheckAll";
import ButtonCloseCheckedTabs from "./ButtonCloseCheckedTabs";
import ButtonSnapshot from './ButtonSnapshot';

const Toolbar = () => {

  return (
    <ToolbarWrapper>
      <ButtonCheckAll />
      <ButtonCloseCheckedTabs />
      <ButtonSnapshot />
    </ToolbarWrapper>
  );
};

export default Toolbar;