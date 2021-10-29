import { FolderSpecial } from '@styled-icons/material-outlined';
import SideMenu from './SideMenu';
import { useTypedDispatch } from 'src/hooks/redux';
import { toggleActive } from 'src/store/modules/intefaceSlice';

export interface MenuItem {
  icon: JSX.Element;
  title: string;
  action: () => void;
}

const SideMenuContainer = () => {
  const dispatch = useTypedDispatch();

  const menuItems: MenuItem[] = [
    {
      title: '북마크',
      icon: <FolderSpecial size="24" />,
      action: () => { dispatch(toggleActive('BOOKMARKS')); }
    }
  ];

  return (
    <SideMenu menuItems={menuItems} />
  );
};

export default SideMenuContainer;