import { ChangeEventHandler, useState } from "react";
import { ToolbarWrapper } from "src/style"; 
import styled from "styled-components";
import SearchInput from "./SearchInput";

const SearchToolbar = () => {
  const [ keyword, setKeyword ] = useState('');
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setKeyword(e.target.value);
  }

  const search = () => { console.log(keyword) };

  return (
    <ToolbarWrapper>
      <Label htmlFor="search-input">검색어를 입력하세요</Label>
      <Input 
        type="text"
        id="search-input"
        autoFocus
        onChange={handleInputChange}
        onKeyDown={e => { if (e.key === 'Enter') search() }}
        />
      <SearchInput handleClick={search} />
    </ToolbarWrapper>
  );
};

export default SearchToolbar;

const Label = styled.label`
  font-size: 0;
`;

const Input = styled.input`
  width: 300px;
`;