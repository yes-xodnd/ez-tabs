import { StyledIcon, WindowTypes } from "src/constants/types";
import { useTypedDispatch, useTypedSelector } from "src/hooks";
import { openWindow } from "src/store/modules/windowsSlice";
import styled from "styled-components";

interface MenubarItemProps {
  title: string;
  type: WindowTypes;
  Icon: StyledIcon;
}

const MenubarItem = ({ title, type, Icon }: MenubarItemProps) => {
  const dispatch = useTypedDispatch();
  const isActive = useTypedSelector(state => state.interfaces.visibleWindow === type);
  const onClick = () => dispatch(openWindow(type));

  return (
    <ListItem { ...{ title, isActive, onClick } }>
      <Icon size="16" />
      <Title>{ title }</Title>
    </ListItem>
  );
}

export default MenubarItem;

const ListItem = styled.li<{ isActive: boolean }>`
  padding: 8px 16px;

  ${props => props.isActive && `
    background-color: #00000086;
  `}

  &:hover {
    cursor: pointer;
    background-color: #00000086;
  }
`;

const Title = styled.span`
  margin-left: 5px;
`;