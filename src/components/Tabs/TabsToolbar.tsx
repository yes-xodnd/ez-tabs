import { ToolbarWrapper } from "src/style";
import ButtonToggleView from "./ButtonToggleVIew";
import ButtonCheckAll from "./ButtonCheckAll";
import ButtonCloseCheckedTabs from "./ButtonCloseCheckedTabs";

interface Props {
  isListView: boolean;
  toggleView: () => void;
}

const Toolbar = ({ isListView, toggleView }: Props) => {

  return (
    <ToolbarWrapper>
      <ButtonCheckAll />
      <ButtonCloseCheckedTabs />
      <ButtonToggleView isListView={isListView} toggleView={toggleView} />
    </ToolbarWrapper>
  );
};

export default Toolbar;