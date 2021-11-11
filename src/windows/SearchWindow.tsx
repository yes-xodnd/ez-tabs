import WindowWrapper from "src/components/UI/WindowWrapper";
import WindowHeader from 'src/components/UI/WindowHeader';
import SearchInput from 'src/components/Search/SearchInput';
import SearchToolbar from 'src/components/Search/SearchToolbar';
import SearchResult from 'src/components/Search/SearchResult';
import { useSearch, useSearchKeyHandlers } from "src/hooks/search";


const SearchWindow = () => {
  const { value, handleChange } = useSearch();
  const keyHandlers = useSearchKeyHandlers();

  return (
    <WindowWrapper windowType="SEARCH" keyHandlers={keyHandlers} >
      <WindowHeader title="검색" windowType="SEARCH" />
      <SearchToolbar>
        <SearchInput value={value} handleChange={handleChange}  />
      </SearchToolbar>
      <SearchResult/>
    </WindowWrapper>
  );
};

export default SearchWindow;