import styled from "styled-components";
import { Apps, Bookmark } from '@styled-icons/material-outlined';
import MenubarItem from './MenubarItem';

const Menubar = () => {

  return (
    <List title='toggle view (PageDown | PageUp)'>
        <MenubarItem name={'Tabs'} type={'TABS'} Icon={Apps} title={'view Tabs'} />
        <MenubarItem name={'Bookmarks'} type={'BOOKMARKS'} Icon={Bookmark} title='view bookmarks' />
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