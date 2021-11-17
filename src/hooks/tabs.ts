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
import { tabsKeyMap as keyMap } from 'src/constants/keyMap';

export const useToggleCheckTab = (id: number | undefined) => {
  const dispatch = useTypedDispatch();
  
  return () => { id && dispatch(toggleCheck(id)); };
};

export const useCloseTab = (id: number | undefined) => {
  const dispatch = useTypedDispatch();
  return () => id && dispatch(closeTab(id));
};

export const useCloseCheckedTabs = () => {
  const dispatch = useTypedDispatch();  
  return () => dispatch(closeCheckedTabs());
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
    [keyMap.FOCUS_SEARCHBAR]: () => {
      document.querySelector<HTMLInputElement>('#search-input')?.focus();
    }
  }), [ dispatch, snapshotTabs ]);

  return keyHandlers;
}
