import styled from "styled-components";
import { WindowTypes } from "src/constants/types";
import { useTypedSelector } from "src/hooks";
import { selectIsVisibleWindow } from "src/store/modules/windowsSlice";
import { useEffect, useRef } from "react";

interface Props {
  windowType: WindowTypes;
}

const WindowWrapper = ({ windowType, children }: React.PropsWithChildren<Props>) => {
  const isVisible = useTypedSelector(selectIsVisibleWindow(windowType));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { isVisible && ref.current?.focus(); }, [ isVisible ]);

  return (
    <>
    {
      isVisible &&   
      <Wrapper ref={ref}>
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

  background-color: white;
  box-shadow: 2px 2px 10px lightgrey;
  overflow: hidden;

  &:focus {
    outline: 1px solid black;
  }
`;