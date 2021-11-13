import styled from "styled-components";
import { MenuItem } from "./MenuContainer";

interface Props {
  menuItems: MenuItem[];
}

const Menubar = ({ menuItems }: Props) => {

  const MenuItem = ({ item }: { item: MenuItem }) => {
    const { title, Icon, handleClick } = item;

    return (
      <ListItem 
        title={title} 
        onClick={handleClick} 
        >
        <Icon size="24" />
      </ListItem>
    );
  }

  return (
    <List>
      { menuItems.map(item => <MenuItem item={item} key={item.title} />) }
    </List>
  );
};

export default Menubar;

const List = styled.ul`
  margin: 0;
  padding: 0;

  list-style: none;
  background-image: linear-gradient(120deg, #1d242ed2, #212527);
  color: white;
`;

const ListItem = styled.li`
  padding: 8px 16px;

  &:hover {
    cursor: pointer;
    background-color: #00000086;
  }
`