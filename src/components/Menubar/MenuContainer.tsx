import { StyledIcon, WindowTypes } from 'src/constants/types';
import { Bookmarks, Apps } from '@styled-icons/material-outlined';
import { useTypedDispatch } from 'src/hooks/redux';
import { openWindow } from 'src/store/modules/windowsSlice';
import Menubar from './Menubar';

export interface MenuItem {
  Icon: StyledIcon;
  title: string;
  handleClick: () => void;
}

const MenubarContainer = () => {
  const dispatch = useTypedDispatch();

  const createItem = (title: string, type: WindowTypes, Icon: StyledIcon): MenuItem => ({
    Icon,
    title,
    handleClick: () => dispatch(openWindow(type)),
  });

  const menuItems: MenuItem[] = [
    createItem('탭', 'TABS', Apps),
    createItem('북마크', 'BOOKMARKS', Bookmarks),
  ];

  return (
    <Menubar menuItems={menuItems} />
  );
};

export default MenubarContainer;