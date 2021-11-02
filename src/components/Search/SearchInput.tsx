import { ChangeEventHandler } from "react";
import styled from "styled-components";

interface Props {
  handleInputChange: ChangeEventHandler;
}

const SearchInput = ({ handleInputChange }: Props) => {

  return (
    <Wrapper>
      <Label htmlFor="search-input">검색어를 입력하세요</Label>
      <Input 
        type="text"
        id="search-input"
        autoFocus
        onChange={handleInputChange}
        />
    </Wrapper>
  );
};

export default SearchInput;

const Wrapper = styled.div`
  flex-grow: 2;
`;

const Label = styled.label`
  font-size: 0;
`;

const Input = styled.input`
  width: 100%;
`;