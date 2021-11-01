import { WindowWrapper } from "src/style";

import WindowHeader from 'src/components/UI/WindowHeader';
import SearchToolbar from 'src/components/Search/SearchToolbar';

const SearchWindow = () => {
  return (
    <WindowWrapper>
      <WindowHeader title="검색" windowType="SEARCH" />
      <SearchToolbar />
      
    </WindowWrapper>
  );
};

export default SearchWindow;