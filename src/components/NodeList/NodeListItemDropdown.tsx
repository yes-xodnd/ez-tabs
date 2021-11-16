import { useState } from "react";
import styled from "styled-components";
import { BookmarkNode } from "src/constants/types";
import { useTypedDispatch } from "src/hooks";
import { remove } from 'src/store/modules/bookmarksSlice';
import Dropdown from "src/components/UI/Dropdown";
import { MoreVert } from '@styled-icons/material-outlined';

interface Props {
  node: BookmarkNode;
  handleClickRename: () => void;
}
const NodeListItemDropdown = ({ node, handleClickRename }: Props) => {
  const [ isVisible, setVisible ] = useState(false);
  const dispatch = useTypedDispatch();

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const createItem = (title: string, handler: () => void) => {
    return { title, handleClick: () => { handler(); hide(); }};
  }
  
  const menuItems = [
    createItem('rename (F2)', handleClickRename),
    createItem('remove (Delete)', () => dispatch(remove(node))),
  ];

  return (
    <Outer onMouseEnter={show}>
      <MoreVert size="16" />
      {
        isVisible &&
        <Inner onMouseLeave={hide}>
          <Dropdown menuItems={menuItems} />
        </Inner>
      }
    </Outer>
  );
};

export default NodeListItemDropdown;

const Outer = styled.div`
  position: relative;
`

const Inner = styled.div`
  position: absolute;
  width: max-content;
  top: 0;
  right: 0;
  z-index: 2;
`;