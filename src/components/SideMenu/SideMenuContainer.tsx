import { Bookmarks, Apps } from '@styled-icons/material-outlined';
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
      icon: <Bookmarks size="24" />,
      action: () => { dispatch(toggleActive('BOOKMARKS')); }
    },
    {
      title: '탭 관리',
      icon: <Apps size="24" />,
      action: () => { dispatch(toggleActive('TABS')); }
    }
  ];

  return (
    <SideMenu menuItems={menuItems} />
  );
};

export default SideMenuContainer;