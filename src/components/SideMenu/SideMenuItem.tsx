import styled from "styled-components";
import { MenuItem } from './SideMenuContainer';

const SideMenuItem = ({ item }: { item: MenuItem }) => {
  const { icon, title, handleClick, handleDoubleClick} = item;
  
  return (
    <Wrapper title={title} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      { icon }
    </Wrapper>
  );
};

export default SideMenuItem;

const Wrapper = styled.li`
  padding: 8px 16px;

  &:hover {
    cursor: pointer;
    background-color: #00000086;
  }
`