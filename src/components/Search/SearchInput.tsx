import styled, { DefaultTheme } from "styled-components";
import { useSearch } from 'src/hooks';

const SearchInput = () => {
  const handleChange = useSearch();
  const placeholder = 'Search (Shift + f)';

  return (
    <Wrapper>
      <Label htmlFor="search-input">{ placeholder }</Label>
      <Input 
        type="text"
        id="search-input"
        onChange={handleChange}
        placeholder={placeholder}
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