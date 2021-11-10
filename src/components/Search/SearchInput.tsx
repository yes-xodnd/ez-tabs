import { ChangeEventHandler } from "react";
import styled, { DefaultTheme } from "styled-components";

interface Props {
  value: string;
  handleInputChange: ChangeEventHandler;
}

const SearchInput = ({ value, handleInputChange }: Props) => {

  return (
    <Wrapper>
      <Label htmlFor="search-input">검색어를 입력하세요</Label>
      <Input 
        type="text"
        id="search-input"
        value={value}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
        autoFocus
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

const Input = styled.input<{ theme: DefaultTheme }>`
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  background-color: ${props => props.theme.colors.hover };
  border-radius: 5px;
  border: 1px solid lightgrey;
  font-size: 0.8rem;
`;