import { activateFocusedTab, closeCheckedTabs, toggleCheck } from "src/store/modules/tabsSlice";
import { useTypedDispatch } from ".";
import { closeTab } from "src/store/modules/tabsSlice";
import { throttle } from "src/util";
import { useMemo } from "react";
import { moveFocusIndex, closeTabHotkey, toggleCheckFocused } from 'src/store/modules/tabsSlice';

export const useToggleCheckTab = (id: number | undefined) => {
  const dispatch = useTypedDispatch();
  
  return () => { id && dispatch(toggleCheck(id)); };
};

export const useCloseTab = (id: number | undefined) => {
  const dispatch = useTypedDispatch();
  
  return throttle(() => { id && dispatch(closeTab(id)); }, 1000);
}

export const useCloseCheckedTabs = () => {
  const dispatch = useTypedDispatch();  

  return throttle(() => { dispatch(closeCheckedTabs()) }, 1000);
}

export const useTabsKeyHandlers = () => {
  const dispatch = useTypedDispatch();

  const keyHandlers = useMemo(() =>({
    ArrowUp: () => dispatch(moveFocusIndex(-1)),
    ArrowDown: () => dispatch(moveFocusIndex(1)),
    ' ': () => dispatch(toggleCheckFocused()),
    Enter: () => dispatch(activateFocusedTab()),
    Delete: () => dispatch(closeTabHotkey())
  }), [ dispatch ]);

  return keyHandlers;
}
