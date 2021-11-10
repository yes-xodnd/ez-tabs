import { ChangeEventHandler, useState, useEffect, useRef } from "react";

import { useTypedSelector, useTypedDispatch } from "src/hooks";
import { selectAllNodeList } from 'src/store/modules/bookmarksSlice';
import { debounce } from "src/util";
import api from "src/api";

import WindowWrapper from "src/components/UI/WindowWrapper";
import WindowHeader from 'src/components/UI/WindowHeader';
import SearchInput from 'src/components/Search/SearchInput';
import SearchToolbar from 'src/components/Search/SearchToolbar';
import SearchResult from 'src/components/Search/SearchResult';
import { uncheckAll } from 'src/store/modules/bookmarksSlice';

const SearchWindow = () => {
  const allNodeList = useTypedSelector(selectAllNodeList);
  const dispatch = useTypedDispatch();

  const [ keyword, setKeyword ] = useState('');
  const [ nodes, setNodes ] = useState(allNodeList);

  const searchRef = useRef(debounce((keyword: string) => {
    api.bookmarks.search(keyword).then(setNodes);
  }, 500));

  useEffect(() => {
    if (keyword) searchRef.current(keyword);
    else setNodes(allNodeList);
    
    dispatch(uncheckAll());
  }, [ keyword, allNodeList, dispatch ]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <WindowWrapper windowType="SEARCH" >
      <WindowHeader title="검색" windowType="SEARCH" />
      <SearchToolbar showAllNodeList={() => setNodes(allNodeList)}>
        <SearchInput value={keyword} handleInputChange={handleInputChange}  />
      </SearchToolbar>
      <SearchResult nodes={nodes} />
    </WindowWrapper>
  );
};

export default SearchWindow;