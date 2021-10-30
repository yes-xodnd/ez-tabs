import { toggleCheck } from "src/store/modules/tabsSlice";
import { useTypedDispatch } from ".";
import { closeTab } from "src/store/modules/tabsSlice";

export const useToggleCheckTab = (id: number | undefined) => {
  const dispatch = useTypedDispatch();
  
  return () => { id && dispatch(toggleCheck(id)); };
};

export const useCloseTab = (id: number | undefined) => {
  const dispatch = useTypedDispatch();
  
  return () => { id && dispatch(closeTab(id)); };
}