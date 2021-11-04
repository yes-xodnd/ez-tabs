import styled from "styled-components";
import { WindowTypes } from "src/constants/types";
import { useTypedDispatch, useTypedSelector } from "src/hooks";
import { activateWindow } from "src/store/modules/intefaceSlice";

interface Props {
  windowType: WindowTypes;
  children?: JSX.Element | JSX.Element[];
}

const WindowWrapper = ({ windowType, children }: Props) => {
  const { visibleWindows, activeWindow } = useTypedSelector(state => state.interfaces);
  const isVisible = visibleWindows.includes(windowType);
  const dispatch = useTypedDispatch();
  
  const handleClick = () => {
    if (activeWindow !== windowType) dispatch(activateWindow(windowType));
  }

  return (
    <>
    {
      isVisible &&
      <Wrapper onClick={handleClick}>
        { children }
      </Wrapper>
    }
    </>
  );
};

export default WindowWrapper;

export const Wrapper = styled.div`
  flex-grow: 2;
  min-width: 500px;
  max-width: 800px;

  display: flex;
  flex-direction: column;

  border-radius: 5px;
  background-color: white;
  box-shadow: 2px 2px 10px lightgrey;
  overflow: hidden;
`;