import styled from "styled-components";

interface menuItem {
  title: string;
  handleClick: () => void;
}

interface Props {
  menuItems: menuItem[];
}

const Dropdown = ({ menuItems }: Props) => {
  
  return (
    <Wrapper>
      { 
        menuItems.map(({ title, handleClick }) => 
          <Item onClick={handleClick} key={title}>{ title }</Item>
        )
      }
    </Wrapper>
  );
};

export default Dropdown;

const Wrapper = styled.ul`
  padding: 0;
  border-radius: 5px;
  list-style: none;
  background-color: white;
  box-shadow: 1px 1px 5px grey;
  color: black;
  overflow: hidden;
`;

const Item = styled.li`
  padding: 0.5rem;
  
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.hover};
  }
`