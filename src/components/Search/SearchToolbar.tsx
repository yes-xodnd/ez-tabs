import styled from "styled-components";
import { ToolbarWrapper } from "src/style"; 
import { ViewList } from '@styled-icons/material-outlined';
import ToolbarButton from "src/components/UI/ToolbarButton";
import ButtonRemove from 'src/components/Bookmarks/ButtonRemove';
import { useShowAllNodeList } from "src/hooks";

const SearchToolbar = ({ children }: React.PropsWithChildren<{}>) => {
  const showAllNodeList = useShowAllNodeList();

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