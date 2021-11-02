import styled from "styled-components";
import { ToolbarWrapper } from "src/style"; 
import { ViewList } from '@styled-icons/material-outlined';
import ToolbarButton from "src/components/UI/ToolbarButton";
import ButtonRemove from 'src/components/Bookmarks/ButtonRemove';

interface Props {
  showAllNodeList: () => void;
  children?: JSX.Element;
}

const SearchToolbar = ({ children, showAllNodeList }: Props) => {

  return (
    <Wrapper>
      { children }
      <ToolbarButton title="전체 목록" Icon={ViewList} handleClick={showAllNodeList} />
      <ButtonRemove />
    </Wrapper>
  );
};

export default SearchToolbar;

const Wrapper = styled(ToolbarWrapper)`
  justify-content: space-between;
`;