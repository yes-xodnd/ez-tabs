import { activateFocusedTab, closeCheckedTabs, toggleCheck, toggleCheckAll,moveFocusIndex, closeFocusTab, toggleCheckFocused, clearCheck, setFocusIndexEnd } from "src/store/modules/tabsSlice";
import { useTypedDispatch } from ".";
import { closeTab } from "src/store/modules/tabsSlice";
import { throttle } from "src/util";
import { useMemo } from "react";
import { createFromTabs } from "src/store/modules/bookmarksSlice";
import { openWindow } from "src/store/modules/windowsSlice";

export const useToggleCheckTab = (id: number | undefined) => {
  const dispatch = useTypedDispatch();
  
  return () => { id && dispatch(toggleCheck(id)); };
};

export const useCloseTab = (id: number | undefined) => {
  const dispatch = useTypedDispatch();
  
  return throttle(() => { id && dispatch(closeTab(id)); }, 1000);
};

export const useCloseCheckedTabs = () => {
  const dispatch = useTypedDispatch();  

  return throttle(() => { dispatch(closeCheckedTabs()) }, 1000);
};

export const useSnapshotTabs = () => {
  const dispatch = useTypedDispatch();
  
  return () => {
    dispatch(createFromTabs());
    dispatch(clearCheck());
    dispatch(openWindow('BOOKMARKS'));
  };
};

export const useTabsKeyHandlers = () => {
  const dispatch = useTypedDispatch();
  const snapshotTabs = useSnapshotTabs();

  const keyHandlers = useMemo(() =>({
    'ArrowUp': () => dispatch(moveFocusIndex(-1)),
    'ArrowDown': () => dispatch(moveFocusIndex(1)),
    ' ': () => dispatch(toggleCheckFocused()),
    'Enter': () => dispatch(activateFocusedTab()),
    'Delete': () => dispatch(closeFocusTab()),
    'Ctrl+a': () => dispatch(toggleCheckAll()),
    'Ctrl+Delete': () => dispatch(closeCheckedTabs()),
    'Ctrl+Enter': snapshotTabs,
    'Home': () => dispatch(setFocusIndexEnd('START')),
    'End': () => dispatch(setFocusIndexEnd('END')),
  }), [ dispatch, snapshotTabs ]);

  return keyHandlers;
}
