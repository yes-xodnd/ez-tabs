import { ToolbarWrapper } from "src/style";
import ButtonCheckAll from "./ButtonCheckAll";
import ButtonCloseCheckedTabs from "./ButtonCloseCheckedTabs";
import ButtonSnapshot from './ButtonSnapshot';
import SearchInput from "src/components/Search/SearchInput";
import { useTabsSearch } from "src/hooks/search";

const Toolbar = () => {
  const handleChange = useTabsSearch();

  return (
    <ToolbarWrapper>
      <SearchInput handleChange={handleChange} />
      <ButtonCheckAll />
      <ButtonCloseCheckedTabs />
      <ButtonSnapshot />
    </ToolbarWrapper>
  );
};

export default Toolbar;