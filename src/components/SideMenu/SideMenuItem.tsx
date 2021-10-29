import styled from "styled-components";
import { MenuItem } from './SideMenuContainer';

const SideMenuItem = ({ item }: { item: MenuItem }) => {
  const { icon, title, action } = item;
  
  return (
    <Wrapper title={title} onClick={action}>
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