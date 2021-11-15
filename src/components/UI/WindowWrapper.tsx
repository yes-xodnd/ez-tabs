import styled from "styled-components";
import { WindowTypes } from "src/constants/types";
import { useTypedSelector } from "src/hooks";
import { selectIsVisibleWindow } from "src/store/modules/windowsSlice";

interface Props {
  windowType: WindowTypes;
}

const WindowWrapper = ({ windowType, children }: React.PropsWithChildren<Props>) => {
  const isVisible = useTypedSelector(selectIsVisibleWindow(windowType));

  return (
    <>
    {
      isVisible &&   
      <Wrapper>{ children }</Wrapper>
    }
    </>
  );
};

export default WindowWrapper;

export const Wrapper = styled.div`
  flex-grow: 2;
  width: 600px;
  max-width: 600px;

  display: flex;
  flex-direction: column;
  height: 567px;

  background-color: white;
  box-shadow: 2px 2px 10px lightgrey;
  overflow: hidden;

  &:focus {
    outline: 1px solid black;
  }
`;