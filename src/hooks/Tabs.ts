import { closeCheckedTabs, toggleCheck } from "src/store/modules/tabsSlice";
import { useTypedDispatch } from ".";
import { closeTab } from "src/store/modules/tabsSlice";
import { throttle } from "src/util";

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