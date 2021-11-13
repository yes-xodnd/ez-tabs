import styled, { DefaultTheme } from "styled-components";
import { useSearch } from 'src/hooks';

const SearchInput = () => {
  const handleChange = useSearch();

  return (
    <Wrapper>
      <Label htmlFor="search-input">검색어를 입력하세요</Label>
      <Input 
        type="text"
        id="search-input"
        onChange={handleChange}
        placeholder="검색어를 입력하세요"
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