import styled from "styled-components";
import { WindowTypes } from "src/constants/types";
import { useTypedDispatch, useTypedSelector } from "src/hooks";
import { activateWindow, selectIsVisibleWindow } from "src/store/modules/intefaceSlice";
import { useHotkeys } from 'src/hooks/hotkeys';

interface Props {
  windowType: WindowTypes;
  children?: JSX.Element | JSX.Element[];
  keyHandlers?: { [key: string]: () => void }
}

const WindowWrapper = ({ windowType, children, keyHandlers = {} }: Props) => {
  const dispatch = useTypedDispatch();
  const handleKeyDown = useHotkeys(keyHandlers);
  const handleClick = () => { dispatch(activateWindow(windowType)); }
  const isVisible = useTypedSelector(state => selectIsVisibleWindow(state, windowType));

  return (
    <>
    {
      isVisible &&   
      <Wrapper onClick={handleClick} tabIndex={-1} onKeyDown={handleKeyDown} >
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
  height: 100%;

  border-radius: 5px;
  background-color: white;
  box-shadow: 2px 2px 10px lightgrey;
  overflow: hidden;

  &:focus {
    outline: 1px solid black;
  }
`;