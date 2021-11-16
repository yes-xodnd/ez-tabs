import { useMemo } from "react";
import { 
  activateFocusedTab,
  closeCheckedTabs,
  toggleCheck,
  toggleCheckAll,
  moveFocusIndex,
  closeTab,
  closeFocusTab,
  toggleCheckFocused,
  uncheckAll,
  setFocusIndexEnd
} from "src/store/modules/tabsSlice";
import { createFromTabs } from "src/store/modules/bookmarksSlice";
import { openWindow } from "src/store/modules/windowsSlice";
import { useTypedDispatch } from ".";
import { throttle } from "src/util";
import { tabsKeyMap as keyMap } from 'src/constants/keyMap';

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
    dispatch(uncheckAll());
    dispatch(openWindow('BOOKMARKS'));
  };
};

export const useTabsKeyHandlers = () => {
  const dispatch = useTypedDispatch();
  const snapshotTabs = useSnapshotTabs();

  const keyHandlers = useMemo(() =>({
    // List
    [keyMap.MOVE_UP]: () => dispatch(moveFocusIndex(-1)),
    [keyMap.MOVE_DOWN]: () => dispatch(moveFocusIndex(1)),
    [keyMap.MOVE_TOP]: () => dispatch(setFocusIndexEnd('START')),
    [keyMap.MOVE_BOTTOM]: () => dispatch(setFocusIndexEnd('END')),

    // ListItem
    [keyMap.CHECK]: () => dispatch(toggleCheckFocused()),
    [keyMap.OPEN_FOCUSED_TAB]: () => dispatch(activateFocusedTab()),
    [keyMap.CLOSE_FOCUSED_TAB]: () => dispatch(closeFocusTab()),

    // Toolbar
    [keyMap.CHECK_ALL]: () => dispatch(toggleCheckAll()),
    [keyMap.CLOSE_CHECKED_TABS]: () => dispatch(closeCheckedTabs()),
    [keyMap.SAVE_SNAPSHOT]: snapshotTabs,
  }), [ dispatch, snapshotTabs ]);

  return keyHandlers;
}
