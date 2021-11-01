import ToolbarButton from "src/components/UI/ToolbarButton";
import { Search } from '@styled-icons/material-outlined';

const SearchInput = ({ handleClick }: { handleClick: () => void}) => {
  return (
    <div>
      <ToolbarButton title="검색" Icon={Search} handleClick={handleClick} />
    </div>
  );
};

export default SearchInput;

