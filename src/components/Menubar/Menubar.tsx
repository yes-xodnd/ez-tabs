import styled from "styled-components";
import { MenuItem } from "./MenuContainer";

interface Props {
  menuItems: MenuItem[];
  isPopup: boolean;
}

const Menubar = ({ menuItems, isPopup }: Props) => {

  const MenuItem = ({ item }: { item: MenuItem }) => {
    const { title, Icon, handleClick, handleDoubleClick } = item;

    return (
      <ListItem 
        title={title} 
        onClick={handleClick} 
        onDoubleClick={handleDoubleClick} 
        >
        <Icon size="24" />
      </ListItem>
    );
  }

  return (
    <List isPopup={isPopup}>
      { menuItems.map((item, index) => <MenuItem item={item} key={index} />) }
    </List>
  );
};

export default Menubar;

const List = styled.ul<{ isPopup: boolean }>`
  ${props => props.isPopup ? 'display: flex' : 'height: 100%'};

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