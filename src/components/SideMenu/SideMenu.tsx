import styled from "styled-components";
import SideMenuItem from './SideMenuItem';
import { MenuItem } from "./SideMenuContainer";

const SideMenu = ({ menuItems }: { menuItems: MenuItem[] }) => {

  return (
    <aside>
      <List>
        { menuItems.map(item => <SideMenuItem item={item} key={item.title} />)}
      </List>
    </aside>
  );
};

export default SideMenu;

const List = styled.ul`
  margin: 0;
  padding: 0;
  height: 100%;
  list-style: none;
  background-image: linear-gradient(120deg, #1d242ed2, #212527);
  /* background-color: #070d13e6; */
  color: white;
`;