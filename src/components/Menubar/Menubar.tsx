import styled from "styled-components";
import { Apps, Bookmark } from '@styled-icons/material-outlined';
import MenubarItem from './MenubarItem';

const Menubar = () => {

  return (
    <List>
        <MenubarItem title={'탭'} type={'TABS'} Icon={Apps} />
        <MenubarItem title={'북마크'} type={'BOOKMARKS'} Icon={Bookmark} />
    </List>
  );
};

export default Menubar;

const List = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;

  list-style: none;
  background-image: linear-gradient(120deg, #1d242ed2, #212527);
  color: white;
  font-size: 13px;
`;