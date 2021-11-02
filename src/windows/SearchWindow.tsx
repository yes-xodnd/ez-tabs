import { ChangeEventHandler, useState, useEffect, useRef } from "react";
import { WindowWrapper } from "src/style";

import { BookmarkNode } from "src/constants/types";
import { useTypedSelector } from "src/hooks";
import { selectAllNodeList } from 'src/store/modules/bookmarksSlice';
import { debounce } from "src/util";
import api from "src/api";

import WindowHeader from 'src/components/UI/WindowHeader';
import SearchInput from 'src/components/Search/SearchInput';
import SearchToolbar from 'src/components/Search/SearchToolbar';
import SearchResult from 'src/components/Search/SearchResult';

const SearchWindow = () => {
  const allNodeList = useTypedSelector(selectAllNodeList)
  const [ keyword, setKeyword ] = useState('');
  const [ nodes, setNodes ] = useState<BookmarkNode[]>(allNodeList);

  const searchRef = useRef(debounce((keyword: string) => {
    api.bookmarks.search(keyword).then(setNodes);
  }, 300));

  useEffect(() => {
    keyword
    ? searchRef.current(keyword)
    : setNodes(allNodeList);
  }, [ keyword, allNodeList ]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <WindowWrapper>
      <WindowHeader title="검색" windowType="SEARCH" />
      <SearchToolbar showAllNodeList={() => setNodes(allNodeList)}>
        <SearchInput handleInputChange={handleInputChange}  />
      </SearchToolbar>
      <SearchResult nodes={nodes} />
      
    </WindowWrapper>
  );
};

export default SearchWindow;