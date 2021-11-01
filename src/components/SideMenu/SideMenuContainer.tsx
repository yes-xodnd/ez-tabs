import { StyledIcon, WindowTypes } from 'src/constants/types';
import { Bookmarks, Apps, Search } from '@styled-icons/material-outlined';
import SideMenu from './SideMenu';
import { useTypedDispatch } from 'src/hooks/redux';
import { toggleActive, activateWindowAlone } from 'src/store/modules/intefaceSlice';

export interface MenuItem {
  icon: JSX.Element;
  title: string;
  handleClick: () => void;
  handleDoubleClick: () => void;
}

const SideMenuContainer = () => {
  const dispatch = useTypedDispatch();
  const createItem = (title: string, type: WindowTypes, Icon: StyledIcon) => {

    return {
      title,
      icon: <Icon size="24" />,
      handleClick: () => { dispatch(toggleActive(type)) },
      handleDoubleClick: () => { dispatch(activateWindowAlone(type)) }

    }
  }

  const menuItems: MenuItem[] = [
    createItem('북마크', 'BOOKMARKS', Bookmarks),
    createItem('탭', 'TABS', Apps),
    createItem('검색', 'SEARCH', Search)
  ];

  return (
    <SideMenu menuItems={menuItems} />
  );
};

export default SideMenuContainer;