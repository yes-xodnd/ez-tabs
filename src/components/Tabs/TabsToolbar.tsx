import { useState } from "react";
import { ToolbarWrapper } from "src/style";

import ButtonToggleView from "./ButtonToggleVIew";
import ButtonCheckAll from "./ButtonCheckAll";
import ButtonRemoveCheckedTabs from "./ButtonRemoveCheckedTabs";

const Toolbar = () => {
  const [ isListView, setView ] = useState(true);
  const toggleView = () => setView(!isListView);

  return (
    <ToolbarWrapper>
      <ButtonCheckAll />
      <ButtonRemoveCheckedTabs />
      <ButtonToggleView isListView={isListView} toggleView={toggleView} />
    </ToolbarWrapper>
  );
};

export default Toolbar;