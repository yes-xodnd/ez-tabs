import { useTypedSelector } from 'src/hooks';
import { WindowTypes } from 'src/constants/types';

export const useIsActiveWindow = (windowType: WindowTypes) => {
  const { activeWindows } = useTypedSelector(state => state.interfaces);
  const isActive = activeWindows.includes(windowType);  

  return isActive;
};
