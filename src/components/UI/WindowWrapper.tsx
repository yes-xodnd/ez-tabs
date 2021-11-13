import styled from "styled-components";
import { WindowTypes } from "src/constants/types";
import { useTypedSelector } from "src/hooks";
import { selectIsVisibleWindow } from "src/store/modules/windowsSlice";
import { useHotkeys } from 'src/hooks/hotkeys';
import { useEffect, useRef } from "react";

interface Props {
  windowType: WindowTypes;
  keyHandlers?: { [key: string]: () => void }
}

const WindowWrapper = ({ windowType, children, keyHandlers = {} }: React.PropsWithChildren<Props>) => {
  const handleKeyDown = useHotkeys(keyHandlers);
  const isVisible = useTypedSelector(selectIsVisibleWindow(windowType));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { isVisible && ref.current?.focus(); }, [ isVisible ]);

  return (
    <>
    {
      isVisible &&   
      <Wrapper 
        ref={ref}
        onKeyDown={handleKeyDown} 
        tabIndex={-1}
        >
          { children }
      </Wrapper>
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
  height: 100%;

  border-radius: 5px;
  background-color: white;
  box-shadow: 2px 2px 10px lightgrey;
  overflow: hidden;

  &:focus {
    outline: 1px solid black;
  }
`;